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
import { ConnectedWallet, useWalletList, useWidget } from '@rango-dev/widget-embedded';
import WalletSelect from './WalletSelect';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useManager } from "@rango-dev/queue-manager-react";
import DexifierButton from '../../common/button';
import { calculatePendingSwap } from "@rango-dev/queue-manager-rango-preset";
import { getWalletsForNewSwap } from '@/app/utils/swap';
import { Wallet } from '@/app/types/rango';

const ConfirmModal: React.FC<PropsWithChildren> = (props) => {
  const { list } = useWalletList({})
  const { meta, wallets } = useWidget();
  const { blockchains, tokens } = meta;
  const { manager } = useManager();
  const { selectedRoute, confirmData, setConfirmData, settings } = useSwap();
  const swapFrom = selectedRoute?.swaps.at(0);
  const swapTo = selectedRoute?.swaps.at(-1);

  const [open, setOpen] = useState<boolean>(false);
  const [useCustomAddr, setUseCustomAddr] = useState<boolean>(false);
  const [customAddr, setCustomAddr] = useState<string>('');
  const [walletFrom, setWalletFrom] = useState<ConnectedWallet>();
  const [walletTo, setWalletTo] = useState<ConnectedWallet>();
  const [isConfirming, confirm] = useTransition();

  const confirmWallet = async () => {
    if (useCustomAddr) {
      if (!customAddr) return
    } else if (!(walletFrom && walletTo)) return

    confirm(async () => {
      const selectedWallets = [walletFrom, walletTo]
        .filter((wallet): wallet is ConnectedWallet => wallet !== undefined)
        .reduce<{ [key: string]: string }>((acc, wallet) => {
          acc[wallet.chain] = wallet.address;
          return acc;
        }, {});

      if (!selectedRoute) return
      const confirmRequest: ConfirmRouteRequest = {
        requestId: selectedRoute.requestId,
        selectedWallets: selectedWallets,
        destination: useCustomAddr ? customAddr : undefined,
      };

      try {
        setConfirmData(await confirmRoute(confirmRequest))
      } catch (error) {
        toastError(error as string)
      }
    });
  };

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

    const has = (asset: WalletRequiredAssets) => {
      return `${Number(asset.currentAmount.amount) / Number(10 ** asset.currentAmount.decimals)} ${asset.asset.symbol} [${asset.asset.blockchain}]`
    }

    const need = (asset: WalletRequiredAssets) => {
      return `${Number(asset.requiredAmount.amount) / Number(10 ** asset.requiredAmount.decimals)} ${asset.asset.symbol} [${asset.asset.blockchain}]`
    }

    const require = (asset: WalletRequiredAssets) => {
      const reason = asset.reason === "FEE" && "transaction fee" ||
        asset.reason === "INPUT_ASSET" && "swap amount" ||
        asset.reason === "FEE_AND_INPUT_ASSET" && "transaction fee and swap amount";
      return `${need(asset)} for ${reason}`
    }

    const errorMessage = hasError ? 'Needed ≈' + validationStatuses[0].wallets[0].requiredAssets.map((asset) => {
      if (!asset.ok) return require(asset)
    }).join(' and ') + ' but You have ' + validationStatuses[0].wallets[0].requiredAssets.map((asset) => {
      if (!asset.ok) return has(asset)
    }).join(' and ') : ''

    return {
      error: hasError,
      message: errorMessage,
    };
  }

  const confirmSwap = async () => {
    if (confirmData && manager) {
      const confirmSwapResult = confirmData?.result;

      const selectedWallets = [walletFrom, walletTo]
        .filter((wallet): wallet is ConnectedWallet => wallet !== undefined)
        .map((wallet) => {
          const _wallet: Wallet = wallet as Wallet;
          return _wallet;
        })

      const swap = calculatePendingSwap(
        confirmSwapResult?.requestAmount || '0',
        confirmSwapResult,
        getWalletsForNewSwap(selectedWallets),
        settings,
        confirmHasError(confirmData).error,
        { blockchains, tokens },
      );

      await manager.create(
        "swap",
        { swapDetails: swap },
        { id: swap.requestId }
      );

      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(open) => {
      setConfirmData(undefined)
      setOpen(open)
    }}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-transparent max-h-[90vh] max-w-[90vw] p-4 md:p-6 bg-gradient-to-b from-black to-[#042214] border border-separator !rounded-3xl">
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
            <button className="w-[30px] px-1"
              onClick={confirmWallet}
            >
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
                  setUseCustomAddr(e)
                  setConfirmData(undefined)
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
          className={cn(isConfirming && 'bg-transparent border border-primary', 'w-48')}
        >
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

export default ConfirmModal