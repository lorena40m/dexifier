// This component allows the user to select a wallet for a specific blockchain from a list of connected wallets.
// It supports wallet selection, displaying wallet details, and providing an option to connect more wallets.
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { ConnectedWallet, useWalletList, useWidget, WalletType } from "@rango-dev/widget-embedded";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import ButtonCopyIcon from "../../common/coyp-button-icon";
import WalletConnectModal from "../WalletConnectModal";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { getAbbrAddress } from "@/app/utils";

// Props for the WalletSelect component
interface SingleConfirmWalletProps {
  chain: string; // The blockchain chain the wallet is connected to
  index: number; // The index of the wallet in the list
  wallet: ConnectedWallet | undefined; // The currently selected wallet
  setWallet: Dispatch<SetStateAction<ConnectedWallet | undefined>>; // Function to set the selected wallet
}

// WalletSelect component
const WalletSelect: React.FC<SingleConfirmWalletProps> = ({ index, chain, wallet, setWallet }) => {
  const { wallets } = useWidget();
  const { details: connectedWallets } = wallets; // Extract connected wallet details
  const { list } = useWalletList({}); // Fetch the list of supported wallets

  // Filter connected wallets by the selected blockchain
  const requiredWallets = connectedWallets.filter((wallet) => {
    return (wallet.chain === chain);
  });

  // Function to get the wallet icon based on the wallet type
  const getWalletIcon = (type: WalletType) => {
    return list.find(detail => detail.type === type)?.image;
  };

  return (
    <>
      {/* Label for the wallet section */}
      <Label htmlFor={chain} className='flex items-center gap-2'>
        <div className="rounded-full size-6 bg-primary font-bold grid place-content-center text-black">
          <div>{index}</div>
        </div>
        <span className='text-base'>Your {chain} wallet</span>
      </Label>
      {/* RadioGroup for selecting the wallet */}
      <RadioGroup id={chain} className='flex flex-wrap justify-center gap-2'
        defaultValue={wallet?.walletType}
        onValueChange={(value) => {
          setWallet(requiredWallets.find(wallet => wallet.walletType === value)); // Update the selected wallet when a new wallet type is chosen
        }}
      >
        {/* Map over the connected wallets and display each wallet */}
        {requiredWallets.map((wallet: ConnectedWallet, index: number) => (
          <RadioGroupPrimitive.Item value={wallet.walletType} id={wallet.walletType} key={index}
            className='w-24 h-28 rounded-lg border data-[state=checked]:bg-primary/30'
          >
            <div className='flex justify-center'>
              <Avatar className="size-12">
                <AvatarImage src={getWalletIcon(wallet.walletType)} /> {/* Display wallet icon */}
                <AvatarFallback>{wallet.walletType}</AvatarFallback>
              </Avatar>
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
  );
};

export default WalletSelect;