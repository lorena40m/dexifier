import Image from 'next/image';
import { X } from 'lucide-react';
import { PropsWithChildren, useState, useTransition } from 'react';
import { confirmRoute } from '@/app/api/rango';
import { ConfirmRouteRequest, ConfirmRouteResponse, WalletRequiredAssets } from 'rango-types/mainApi';
import CustomLoader from '../../common/loader';
import { cn, toastError } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useSwap } from '@/app/providers/SwapProvider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { ConnectedWallet, useWidget } from '@rango-dev/widget-embedded';
import WalletSelect from './WalletSelect';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useManager } from "@rango-dev/queue-manager-react";
import DexifierButton from '../../common/button';
import { calculatePendingSwap } from "@rango-dev/queue-manager-rango-preset";
import { getWalletsForNewSwap } from '@/app/utils/swap';
import { Wallet } from '@/app/types/rango';

// ConfirmModal component for confirming a wallet before swapping assets
const ConfirmModal: React.FC<PropsWithChildren> = (props) => {
  const { meta } = useWidget();
  const { blockchains, tokens } = meta;
  const { manager } = useManager();
  const { selectedRoute, confirmData, setConfirmData, settings } = useSwap();

  // Extract the route details for the swap (from and to tokens)
  const swapFrom = selectedRoute?.swaps.at(0);
  const swapTo = selectedRoute?.swaps.at(-1);

  // State hooks for managing the modal, wallets, and custom address input
  const [open, setOpen] = useState<boolean>(false);
  const [useCustomAddr, setUseCustomAddr] = useState<boolean>(false);
  const [customAddr, setCustomAddr] = useState<string>('');
  const [walletFrom, setWalletFrom] = useState<ConnectedWallet>();
  const [walletTo, setWalletTo] = useState<ConnectedWallet>();
  const [isConfirming, confirm] = useTransition();

  // Function to handle wallet confirmation
  const confirmWallet = async () => {
    // Ensure custom address is valid if selected
    if (useCustomAddr && !customAddr) return;
    if (!(walletFrom && walletTo)) return;

    // Perform the confirmation when ready
    confirm(async () => {
      const selectedWallets = [walletFrom, walletTo]
        .filter((wallet): wallet is ConnectedWallet => wallet !== undefined)
        .reduce<{ [key: string]: string }>((acc, wallet) => {
          acc[wallet.chain] = wallet.address;
          return acc;
        }, {});

      // Prepare request for confirming the route
      if (!selectedRoute) return;
      const confirmRequest: ConfirmRouteRequest = {
        requestId: selectedRoute.requestId,
        selectedWallets: selectedWallets,
        destination: useCustomAddr ? customAddr : undefined,
      };

      // Attempt to confirm the route and handle errors
      try {
        setConfirmData(await confirmRoute(confirmRequest));
      } catch (error) {
        toastError(error as string);
      }
    });
  };

  // Function to check for validation errors in the confirmation response
  const confirmHasError = (confirmResponse: ConfirmRouteResponse) => {
    if (!confirmResponse.ok) {
      return {
        error: true,
        message: confirmResponse.error,
      };
    }

    const validationStatuses = confirmResponse.result?.validationStatus ?? [];
    const hasError = validationStatuses.some((status) =>
      status.wallets.some((wallet) =>
        wallet.requiredAssets.some((asset) => !asset.ok)
      )
    );

    // Helper function to format asset amounts
    const has = (asset: WalletRequiredAssets) => {
      return `${Number(asset.currentAmount.amount) / Number(10 ** asset.currentAmount.decimals)} ${asset.asset.symbol} [${asset.asset.blockchain}]`;
    };

    const need = (asset: WalletRequiredAssets) => {
      return `${Number(asset.requiredAmount.amount) / Number(10 ** asset.requiredAmount.decimals)} ${asset.asset.symbol} [${asset.asset.blockchain}]`;
    };

    const require = (asset: WalletRequiredAssets) => {
      const reason = asset.reason === "FEE" && "transaction fee" ||
        asset.reason === "INPUT_ASSET" && "swap amount" ||
        asset.reason === "FEE_AND_INPUT_ASSET" && "transaction fee and swap amount";
      return `${need(asset)} for ${reason}`;
    };

    // Construct the error message if there are validation issues
    const errorMessage = hasError ? 'Needed ≈' + validationStatuses[0].wallets[0].requiredAssets.map((asset) => {
      if (!asset.ok) return require(asset);
    }).join(' and ') + ' but You have ' + validationStatuses[0].wallets[0].requiredAssets.map((asset) => {
      if (!asset.ok) return has(asset);
    }).join(' and ') : '';

    return {
      error: hasError,
      message: errorMessage,
    };
  };

  // Function to confirm and execute the swap
  const confirmSwap = async () => {
    if (confirmData && manager) {
      const confirmSwapResult = confirmData.result;

      if (!(confirmSwapResult && (confirmSwapResult as any).result)) return;

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

      setOpen(false);  // Close the modal after confirming the swap
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      setConfirmData(undefined);  // Clear confirmation data when modal is closed
      setOpen(open);
    }}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="w-[30rem] bg-transparent max-h-[90vh] max-w-[90vw] p-6 bg-gradient-to-b from-black to-[#042214] border border-separator !rounded-3xl">
        <DialogHeader>
          <div className="flex flex-row justify-between p-2">
            <DialogTitle className="text-2xl">Confirm Wallet</DialogTitle>
            <DialogClose>
              <X className="w-7 h-7 p-1 bg-primary rounded-full font-bold text-black hover:bg-primary-dark transition-colors duration-300" />
            </DialogClose>
          </div>
          <Separator className="bg-separator" />
          <DialogDescription className='flex items-center justify-around'>
            {swapFrom && swapTo &&
              <div className="text-sm font-bold text-center py-2">Confirm Swap &nbsp;
                <span className="text-[#bbbbbb] text-lg">
                  {parseFloat(swapFrom.fromAmount).toFixed(2)} &nbsp;
                </span>
                {swapFrom.from.symbol} [{swapFrom.from.blockchain}] to &nbsp;
                <span className="text-[#bbbbbb] text-lg"> {parseFloat(swapTo.toAmount)?.toFixed(2)} &nbsp;</span>
                {swapTo.to.symbol} [{swapTo.to.blockchain}]
              </div>
            }
            <button className="w-[30px] px-1" onClick={confirmWallet}>
              <Image src={"/assets/icons/reset-icon.png"} width={20} height={20} alt="refresh" />
            </button>
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[40vh]'>
          <div className='space-y-4'>
            {swapFrom &&
              <WalletSelect
                chain={swapFrom.from.blockchain}
                index={1}
                wallet={walletFrom}
                setWallet={setWalletFrom}
              />
            }
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className='border-primary data-[state=checked]:text-primary'
                checked={useCustomAddr}
                onCheckedChange={(e: boolean) => {
                  setUseCustomAddr(e);
                  setConfirmData(undefined);
                }}
              />
              <Label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Use custom address
              </Label>
            </div>
            {useCustomAddr ?
              <Input
                type='text'
                placeholder='Enter recipient address'
                className="text-md placeholder:text-white/50 px-3 bg-transparent border-primary-dark focus-visible:ring-0 focus-visible:ring-offset-0"
                value={customAddr}
                onChange={(e) => setCustomAddr(e.target.value)}
              />
              :
              swapTo &&
              <WalletSelect
                chain={swapTo.to.blockchain}
                index={2}
                wallet={walletTo}
                setWallet={setWalletTo}
              />
            }
          </div>
        </ScrollArea>
        <div className="text-error font-bold text-xs text-center tracking-wide">{confirmData && confirmHasError(confirmData).message}</div>
        <DexifierButton disabled={!(useCustomAddr ? customAddr : walletFrom && walletTo) || isConfirming}
          onClick={confirmData ? confirmSwap : confirmWallet}
          className={cn(isConfirming && 'bg-transparent border border-primary', 'w-48')}>
          {isConfirming ?
            <CustomLoader />
            :
            confirmData ?
              confirmHasError(confirmData).error ?
                'Proceed Anyway'
                :
                'Swap'
              :
              'Confirm Wallet'
          }
        </DexifierButton>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmModal;