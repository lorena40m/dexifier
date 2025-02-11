import Image from 'next/image';
import { X } from 'lucide-react';
import { PropsWithChildren, useMemo, useState, useTransition } from 'react';
import { ConfirmRouteRequest, MultiRouteSimulationResult, Token, Transaction, TransactionType, WalletRequiredAssets, ConfirmRouteResponse } from 'rango-types/mainApi';
import CustomLoader from '../common/loader';
import { chainflipSDK, cn, rangoSDK, toastError } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ConnectedWallet, useWidget, useWallets, useWalletList } from '@rango-dev/widget-embedded';
import { Input } from '@/components/ui/input';
import { useManager } from "@rango-dev/queue-manager-react";
import { calculatePendingSwap } from "@rango-dev/queue-manager-rango-preset";
import { confirmHasError, getWalletsForNewSwap } from '@/app/utils/swap';
import { Wallet } from '@/app/types/rango';
import { Button } from '@/components/ui/button';
import { formatChainName } from '@/app/utils/chainflip';
import { DepositAddressRequestV2, Quote } from '@chainflip/sdk/swap';
import { DepositAddressResponseV2 } from '@/app/types/chainflip';
import { ethers } from 'ethers';
import { DEXIFIER_MODERATOR, DEXIFIER_STATE, useDexifier } from '@/app/providers/DexifireProvider';
import { RateResponse, TxRequest } from '@/app/types/exolix';
import { RadioGroup } from '@/components/ui/radio-group';
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import ButtonCopyIcon from '../common/coyp-button-icon';
import WalletConnectModal from '../swap/WalletConnectModal';
import TokenIcon from '../common/token-icon';
import { createTransaction } from '@/app/api/exolix';
import { getAbbrAddress } from "@/app/utils";

type SwapToken = {
  amount: number,
  symbol: string,
  blockchain?: string,
}

type SwapInfo = {
  from: SwapToken,
  to: SwapToken,
}

// ConfirmModal component for confirming a wallet before swapping assets
const ConfirmModal: React.FC<PropsWithChildren> = (props) => {
  const { meta } = useWidget();
  const { blockchains, tokens } = meta;
  const { getSigners } = useWallets();
  const { manager } = useManager();
  const { wallets } = useWidget();
  const { details: connectedWallets } = wallets; // Extract connected wallet details
  const { list } = useWalletList(); // Fetch the list of supported wallets
  const { selectedRoute, tokenFrom, tokenTo, amountFrom, walletFrom, setWalletFrom, walletTo, setWalletTo, setSwapData, settings, setState, isMobile } = useDexifier();
  const [isInitializingSwap, initializeSwap] = useTransition();

  // State hooks for managing the modal, wallets, and withdrawal address input
  const [open, setOpen] = useState<boolean>(false);

  const [withdrawalAddress, setWithdrawalAddress] = useState<string>();

  const swapInfo: SwapInfo | undefined = useMemo(() => {
    switch (selectedRoute?.moderator) {
      case DEXIFIER_MODERATOR.Rango:
        const routeRango = selectedRoute as MultiRouteSimulationResult
        const tokenFromRango = routeRango.swaps.at(0);
        const tokenToRango = routeRango.swaps.at(-1);
        if (!tokenFromRango || !tokenToRango) return
        return {
          from: {
            amount: Number(tokenFromRango.fromAmount),
            symbol: tokenFromRango.from.symbol,
            blockchain: tokenFromRango.from.blockchain,
          },
          to: {
            amount: Number(tokenToRango.toAmount),
            symbol: tokenToRango.to.symbol,
            blockchain: tokenToRango.to.blockchain,
          },
        }
      case DEXIFIER_MODERATOR.Chainflip:
        const routeChainflip = selectedRoute as Quote
        const tokenFromChainflip: Token = tokens.find((token: Token) => formatChainName(token.blockchain) === routeChainflip.srcAsset.chain && token.symbol === routeChainflip.srcAsset.asset)
        const tokenToChainflip: Token = tokens.find((token: Token) => formatChainName(token.blockchain) === routeChainflip.destAsset.chain && token.symbol === routeChainflip.destAsset.asset)
        if (!tokenFromChainflip || !tokenToChainflip) return
        return {
          from: {
            amount: parseFloat(routeChainflip.depositAmount) / (10 ** tokenFromChainflip.decimals),
            symbol: routeChainflip.srcAsset.asset as string,
            blockchain: formatChainName(routeChainflip.srcAsset.chain),
          },
          to: {
            amount: parseFloat(routeChainflip.egressAmount) / (10 ** tokenToChainflip.decimals),
            symbol: routeChainflip.destAsset.asset as string,
            blockchain: formatChainName(routeChainflip.destAsset.chain),
          },
        }
      case DEXIFIER_MODERATOR.Exolix:
        const routeExolix = selectedRoute as RateResponse
        if (!tokenFrom || !tokenTo) return
        return {
          from: {
            amount: routeExolix.fromAmount,
            symbol: tokenFrom.symbol,
            blockchain: tokenFrom.blockchain,
          },
          to: {
            amount: routeExolix.toAmount,
            symbol: tokenTo.symbol,
            blockchain: tokenTo.blockchain,
          },
        }
      default:
        break;
    }
  }, [selectedRoute, tokenFrom, tokenTo])

  async function pasteWithdrawalAddressFromClipboard() {
    try {
      if (navigator.clipboard) {
        const clipboardText = await navigator.clipboard.readText();
        setWithdrawalAddress(clipboardText);
      } else {
        console.error('Clipboard API not supported.');
      }
    } catch (error) {
      console.error('Failed to read from clipboard:', error);
    }
  }

  const confirmSwap = async () => {
    if (!walletFrom || !walletTo || !tokenFrom || !tokenTo || !amountFrom || (walletTo === 'custom' && !withdrawalAddress)) return
    initializeSwap(async () => {
      if (selectedRoute?.moderator === DEXIFIER_MODERATOR.Rango) {
        // Perform the confirmation when ready
        const selectedWallets = [walletFrom, walletTo]
          .filter((wallet): wallet is ConnectedWallet => wallet !== undefined)
          .reduce<{ [key: string]: string }>((acc, wallet) => {
            acc[wallet.chain] = wallet.address;
            return acc;
          }, {});

        // Prepare request for confirming the route
        const confirmRequest: ConfirmRouteRequest = {
          requestId: (selectedRoute as MultiRouteSimulationResult).requestId,
          selectedWallets: selectedWallets,
          destination: typeof walletTo === 'string' ? walletTo : (walletTo as ConnectedWallet).address,
        };

        // Attempt to confirm the route and handle errors
        try {
          const confirmData: ConfirmRouteResponse = await rangoSDK.confirmRoute(confirmRequest);
          if (confirmData && manager) {
            setSwapData(confirmData);
            const confirmSwapResult = confirmData.result;

            if (!(confirmSwapResult && confirmSwapResult.result)) {
              throw Error(confirmData.error || '')
            }

            const selectedWallets = [walletFrom, walletTo]
              .filter((wallet): wallet is ConnectedWallet => wallet !== undefined)
              .map((wallet) => {
                const _wallet: Wallet = wallet as Wallet;
                return _wallet;
              });

            // Calculate the pending swap
            const swap = calculatePendingSwap(
              confirmSwapResult.requestAmount,
              confirmSwapResult,
              getWalletsForNewSwap(selectedWallets),
              settings,
              confirmHasError(confirmData).error,
              { blockchains, tokens },
            );

            // Create the swap request via the manager
            await manager.create(
              "swap",
              { swapDetails: swap },
              { id: swap.requestId }
            );
          }
        } catch (error) {
          toastError(error as string);
        }
      }
      setOpen(false);  // Close the modal after confirming the swap
      setState(DEXIFIER_STATE.PROCESSING)
    })
  }

  return (
    <Dialog open={open} onOpenChange={(open) => {
      // setConfirmData(undefined);  // Clear confirmation data when modal is closed
      setOpen(open);
    }}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="w-[30rem] bg-transparent max-h-[90vh] max-w-[90vw] p-6 bg-gradient-to-b from-black to-[#042214] border border-separator !rounded-3xl">
        <DialogHeader>
          <div className="flex flex-row justify-between p-2">
            <DialogTitle className="text-2xl">Confirm</DialogTitle>
            <DialogClose>
              <X className="w-7 h-7 p-1 bg-primary rounded-full font-bold text-black hover:bg-primary-dark transition-colors duration-300" />
            </DialogClose>
          </div>
          <Separator className="bg-separator" />
          <DialogDescription className='flex items-center justify-around'>
            {swapInfo &&
              <div className="text-sm font-bold text-center py-2">Confirm Swap &nbsp;
                <span className="text-[#bbbbbb] text-lg">
                  {swapInfo.from.amount.toFixed(2)} &nbsp;
                </span>
                {swapInfo.from.symbol} [{swapInfo.from.blockchain}] to &nbsp;
                <span className="text-[#bbbbbb] text-lg"> {swapInfo.to.amount.toFixed(2)} &nbsp;</span>
                {swapInfo.to.symbol} [{swapInfo.to.blockchain}]
              </div>
            }
            {/* <button className="w-[30px] px-1" onClick={confirmWallet}>
              <Image src={"/assets/icons/reset-icon.png"} width={20} height={20} alt="refresh" />
            </button> */}
          </DialogDescription>
        </DialogHeader>
        <div className='h-[40vh] overflow-y-auto pe-1'>
          <div className='space-y-4'>
            {[swapInfo?.from.blockchain, swapInfo?.to.blockchain].map((chain, index) => (
              <>
                {/* Label for the wallet section */}
                <Label htmlFor={chain} className='flex items-center gap-2'>
                  <div className="rounded-full size-6 bg-primary font-bold grid place-content-center text-black">
                    <div>{index + 1}</div>
                  </div>
                  <span className='text-base'>Your {chain} wallet</span>
                </Label>
                {/* RadioGroup for selecting the wallet */}
                <RadioGroup id={chain} className='flex flex-wrap justify-center gap-2'
                  value={index ? typeof walletTo === 'string' ? walletTo : walletTo?.walletType
                    : typeof walletFrom === 'string' ? walletFrom : walletFrom?.walletType}
                  onValueChange={(value) => {
                    if (index) {
                      const walletT = connectedWallets.find(wallet => wallet.walletType === value && wallet.chain === chain)
                      walletT ? setWalletTo(walletT) : setWalletTo(withdrawalAddress);
                    } else {
                      const walletF = connectedWallets.find(wallet => wallet.walletType === value && wallet.chain === chain)
                      walletF ? setWalletFrom(walletF) : setWalletFrom(value);
                    }
                  }} // Update the selected wallet when a new wallet type is chosen
                >
                  {/* Map over }the connected wallets and display each wallet */}
                  {connectedWallets.filter((wallet) => wallet.chain === chain).map((wallet: ConnectedWallet, index: number) => (
                    <RadioGroupPrimitive.Item value={wallet.walletType} id={wallet.walletType} key={index}
                      className='w-24 h-28 rounded-lg border data-[state=checked]:bg-primary/30 hover:border-gray-500'
                    >
                      <div className='flex justify-center'>
                        <TokenIcon
                          token={{
                            image: list.find(detail => detail.type === wallet.walletType)?.image,
                            alt: wallet.walletType,
                            className: "size-12",
                          }}
                        />
                      </div>
                      <span className='capitalize'>{wallet.walletType}</span> {/* Display wallet type */}
                      <span className="flex items-center justify-center text-xs">
                        <span>{getAbbrAddress(wallet.address)}</span> {/* Display abbreviated wallet address */}
                        <div className='size-4 place-items-center'>
                          <ButtonCopyIcon text={wallet.address} /> {/* Copy button for wallet address */}
                        </div>
                      </span>
                    </RadioGroupPrimitive.Item>
                  ))}
                  {/* Modal to connect more wallets */}
                  <WalletConnectModal chain={chain}>
                    <div className='w-24 h-28 rounded-lg border flex text-center items-center hover:border-gray-500 cursor-pointer'>
                      More wallet...
                    </div>
                  </WalletConnectModal>
                </RadioGroup>
              </>
            ))}
          </div>
        </div>
        {/* <div className="text-error font-bold text-xs text-center tracking-wide">{confirmHasError(confirmData).message}</div> */}
        <Button variant={isInitializingSwap ? "outline" : "primary"}
          onClick={confirmSwap}
          className="mx-auto h-12 w-48"
          disabled={isInitializingSwap || !walletFrom || !walletTo || (walletTo === 'custom' && !withdrawalAddress)}
        >
          {isInitializingSwap ?
            <CustomLoader className='!size-8' />
            :
            'Confirm'
          }
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmModal;