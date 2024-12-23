import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { ConnectedWallet, useWalletList, useWidget, WalletType } from "@rango-dev/widget-embedded";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import ButtonCopyIcon from "../../common/coyp-button-icon";
import WalletConnectModal from "../WalletConnectModal";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { getAbbrAddress } from "@/app/utils";

interface SingleConfirmWalletProps {
  chain: string;
  index: number;
  wallet: ConnectedWallet | undefined;
  setWallet: Dispatch<SetStateAction<ConnectedWallet | undefined>>;
}

const WalletSelect: React.FC<SingleConfirmWalletProps> = ({ index, chain, wallet, setWallet }) => {
  const { wallets } = useWidget();
  const { details: connectedWallets } = wallets;
  const { list } = useWalletList({});

  const requiredWallets = connectedWallets.filter((wallet) => {
    return (wallet.chain === chain)
  })

  const getWalletIcon = (type: WalletType) => {
    return list.find(detail => detail.type === type)?.image;
  }

  return (
    <>
      <Label htmlFor={chain} className='flex items-center gap-2'>
        <div className="rounded-full size-6 bg-primary font-bold grid place-content-center text-black">
          <div>{index}</div>
        </div>
        <span className='text-base'>Your {chain} wallet</span>
      </Label>
      <RadioGroup id={chain} className='flex flex-wrap justify-center gap-2'
        defaultValue={wallet?.walletType}
        onValueChange={(value) => {
          setWallet(requiredWallets.find(wallet => wallet.walletType === value))
        }}
      >
        {requiredWallets.map((wallet: ConnectedWallet, index: number) => (
          <RadioGroupPrimitive.Item value={wallet.walletType} id={wallet.walletType} key={index}
            className='w-24 h-28 rounded-lg border data-[state=checked]:bg-primary/30'
          >
            <div className='flex justify-center'>
              <Avatar className="size-12">
                <AvatarImage src={getWalletIcon(wallet.walletType)} />
                <AvatarFallback>{wallet.walletType}</AvatarFallback>
              </Avatar>
            </div>
            <span className='capitalize'>{wallet.walletType}</span>
            <span className="flex items-center justify-center text-xs">
              <span>{getAbbrAddress(wallet.address)}</span>
              <div className='size-4 place-items-center'>
                <ButtonCopyIcon text={wallet.address} />
              </div>
            </span>
          </RadioGroupPrimitive.Item>
        ))}
        <WalletConnectModal chain={chain}>
          <div className='w-24 h-28 rounded-lg border flex text-center items-center hover:border-gray-500 cursor-pointer'>
            More
            wallet...
          </div>
        </WalletConnectModal>
      </RadioGroup>
    </>

  )
}

export default WalletSelect