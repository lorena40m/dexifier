import Image from "next/image";
import Search from "../common/search";
import { PropsWithChildren, useMemo, useState } from "react";
import { useWallets } from "@rango-dev/wallets-react";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useWalletList, WalletInfoWithExtra } from "@rango-dev/widget-embedded";
import { WalletState } from "@rango-dev/ui";

// Enum to define background colors for different wallet states
enum BgColorSet {
  'not_installed' = "#97979763", // Color for wallets not installed
  'disconnected' = "#639cff6e", // Color for disconnected wallets
  'connecting' = "#5ce3ff63", // Color for wallets in the connecting state
  'connected' = "#639cff6e", // Color for connected wallets
}

// Enum to define text colors for different wallet states
enum TextColorSet {
  'not_installed' = "#a6e6ffad", // Text color for wallets not installed
  'disconnected' = "#c5c5c5ad", // Text color for disconnected wallets
  'connecting' = "", // No specific text color for connecting state
  'connected' = "#58ff66d6", // Text color for connected wallets
}

// WalletConnectModalProps interface defines optional chain prop for filtering wallets by chain
interface WalletConnectModalProps {
  chain?: string;
}

const WalletConnectModal: React.FC<PropsWithChildren<WalletConnectModalProps>> = (props) => {
  const [search, setSearch] = useState<string>(""); // State for search input
  const { list } = useWalletList({ chain: props.chain }); // Fetch wallet list filtered by chain (if provided)
  const { connect, disconnect } = useWallets(); // Functions for connecting and disconnecting wallets

  // Memoize the filtered wallet list based on the search input
  const filteredWalletList = useMemo(() => {
    return list.filter((walletData) =>
      walletData.title.toLowerCase().includes(search.toLowerCase()) // Filter wallets by title based on search input
    );
  }, [search, list]); // Recalculate when search input or wallet list changes

  // Handle wallet interaction: open wallet install link, connect or disconnect wallet
  const handleWallet = (walletInfo: WalletInfoWithExtra) => {
    if (walletInfo.state === WalletState.NOT_INSTALLED) {
      // If wallet is not installed, open its installation link
      window.open(walletInfo.link as string, "_blank");
    }
    if (walletInfo.state === WalletState.CONNECTED) {
      // If wallet is connected, disconnect it
      disconnect(walletInfo.type).catch(console.error);
    }
    if (walletInfo.state === WalletState.DISCONNECTED) {
      // If wallet is disconnected, connect it
      connect(walletInfo.type).catch(console.error);
    }
  }

  return (
    <Dialog>
      {/* Trigger dialog via children */}
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-transparent max-h-[90vh] max-w-[90vw] p-4 md:p-6 bg-gradient-to-b from-black to-[#042214] border border-separator !rounded-3xl">
        {/* Dialog header with title and close button */}
        <DialogHeader className="flex flex-row justify-between">
          <DialogTitle className="text-2xl">Connect <span className="text-primary">{props.chain}</span> Wallets</DialogTitle>
          <DialogClose>
            <X className="w-7 h-7 p-1 bg-primary rounded-full font-bold text-black hover:bg-primary-dark transition-colors duration-300" />
          </DialogClose>
        </DialogHeader>
        <Separator className="bg-separator" /> {/* Separator between header and content */}
        {/* Search component for filtering wallets */}
        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="max-h-[60vh] flex flex-wrap justify-center overflow-auto gap-2 pr-1">
          {/* Render filtered wallets */}
          {filteredWalletList?.map((wallet, index) => (
            <button key={index} className="flex flex-col min-w-[125px] items-center justify-center p-2 rounded-lg disabled:cursor-not-allowed hover:opacity-80"
              style={{ backgroundColor: BgColorSet[wallet.state] }} // Set background color based on wallet state
              onClick={() => handleWallet(wallet)} // Handle wallet click to connect, disconnect, or open installation link
            >
              <Image src={wallet.image} alt={wallet.type} width={45} height={45} /> {/* Wallet image */}
              <span className="text-sm">{wallet.title}</span> {/* Wallet title */}
              <span className="text-xs color-grey-500" style={{ color: TextColorSet[wallet.state] }}>
                {/* Wallet state text with color based on wallet state */}
                {wallet.state}
              </span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default WalletConnectModal;