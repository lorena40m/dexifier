import Image from "next/image";
import Search from "../common/search";
import { PropsWithChildren, useMemo, useState } from "react";
import { useWallets } from "@rango-dev/wallets-react";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useWalletList, WalletInfoWithExtra } from "@rango-dev/widget-embedded"
import { WalletState } from "@rango-dev/ui";

enum BgColorSet {
  'not_installed' = "#97979763",
  'disconnected' = "#639cff6e",
  'connecting' = "#5ce3ff63",
  'connected' = "#639cff6e",
}
enum TextColorSet {
  'not_installed' = "#a6e6ffad",
  'disconnected' = "#c5c5c5ad",
  'connecting' = "",
  'connected' = "#58ff66d6",
}

interface WalletConnectModalProps {
  chain?: string
}

const WalletConnectModal: React.FC<PropsWithChildren<WalletConnectModalProps>> = (props) => {
  const [search, setSearch] = useState<string>("")
  const { list } = useWalletList({ chain: props.chain })
  const { connect, disconnect } = useWallets()

  // Memoize the filtered wallet list
  const filteredWalletList = useMemo(() => {
    return list.filter((walletData) =>
      walletData.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, list]);

  const handleWallet = (walletInfo: WalletInfoWithExtra) => {
    if (walletInfo.state === WalletState.NOT_INSTALLED) {
      window.open(walletInfo.link as string, "_blank");
    }
    if (walletInfo.state === WalletState.CONNECTED) {
      disconnect(walletInfo.type).catch(console.error);
    }
    if (walletInfo.state === WalletState.DISCONNECTED) {
      connect(walletInfo.type).catch(console.error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-transparent max-h-[90vh] max-w-[90vw] p-4 md:p-6 bg-gradient-to-b from-black to-[#042214] border border-separator !rounded-3xl">
        <DialogHeader className="flex flex-row justify-between">
          <DialogTitle className="text-2xl">Connect <span className="text-primary">{props.chain}</span> Wallets</DialogTitle>
          <DialogClose>
            <X className="w-7 h-7 p-1 bg-primary rounded-full font-bold text-black hover:bg-primary-dark transition-colors duration-300" />
          </DialogClose>
        </DialogHeader>
        <Separator className="bg-separator" />
        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="max-h-[60vh] flex flex-wrap justify-center overflow-auto gap-2 pr-1">
          {filteredWalletList?.map((wallet, index) => (
            <button key={index} className="flex flex-col min-w-[125px] items-center justify-center p-2 rounded-lg disabled:cursor-not-allowed hover:opacity-80"
              style={{ backgroundColor: BgColorSet[wallet.state] }}
              onClick={() => handleWallet(wallet)}
            >
              <Image src={wallet.image} alt={`@{index}'s wallet`} width={45}
                height={45} />
              <span className="text-sm">{wallet.title}</span>
              <span className="text-xs color-grey-500"
                style={{ color: TextColorSet[wallet.state] }}>{wallet.state}</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default WalletConnectModal;
