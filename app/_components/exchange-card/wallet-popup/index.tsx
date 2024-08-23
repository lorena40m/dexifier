import { Button } from "@/components/ui/button";
import PopupTemplate from "../../common/popup-template"
import TooltipTemplate from "../../common/tooltip-template";
import Image from "next/image";
import { useWalletList } from "@/app/wallet/useWalletList";
import { WalletInfoWithNamespaces, WalletState } from "@/app/wallet/types";
import Search from "../../common/search";
import { useSearchParams } from "next/navigation";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { useWallets } from "@rango-dev/wallets-react";
import { toastError } from "@/lib/utils";


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

const WalletSourcePopup = forwardRef<HTMLButtonElement>((props, ref) => {
  const [search, setSearch] = useState<string>("")
  const [filteredData, setFilteredData] = useState<WalletInfoWithNamespaces[]>();
  const { list, handleClick, error, disconnectConnectingWallets } = useWalletList({})
  const { state } = useWallets();

  // Memoize the filtered list
  const filteredWalletList = useMemo(() => {
    return list.filter((walletData) =>
      walletData.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, list]);

  useEffect(() => {
    // Only update state if the filtered data is different
    if (JSON.stringify(filteredData) !== JSON.stringify(filteredWalletList)) {
      setFilteredData(filteredWalletList);
    }
  }, [filteredWalletList, filteredData]);

  const connectedWallets = list.filter(
    (wallet) => wallet.state === "connected",
  );

  const walletClick = (walletData: WalletInfoWithNamespaces) => {
    if (walletData.state === "not_installed") {
      window.open(walletData.link as string, "_blank");
      return
    }
    handleClick(walletData.type);
    // error && toastError(error)
    console.log("error from wailet", error);

  }

  const isWalletConnected = connectedWallets.length === 0 ? false : true;

  const content = !isWalletConnected ? (
    "Connect Wallet"
  ) : (
    <div className="flex">
      {connectedWallets.map((wallet) => (
        <div key={wallet.title}>
          <Image src={wallet.image} width={14} height={14} alt={`$sub-{wallet.title}-image`} />
        </div>
      ))}
    </div>
  );

  const triggerButton = (
    <Button
      className="p-2 bg-transparent hover:bg-transparent"
      // disabled={!isWalletConnected}
      ref={ref}
    >
      <TooltipTemplate content={content} className="rounded-xl !mb-1">
        <div className="relative">
          <Image
            src={"/assets/icons/wallet.png"}
            alt="button-icon"
            width={18}
            height={18}
          />
          {isWalletConnected && <div className="absolute top-0 -right-[2px] rounded-full bg-[#58ff66d6] w-[8px] h-[8px]" />}
        </div>
      </TooltipTemplate>
    </Button >
  );

  const singleWalletButton = (walletData: WalletInfoWithNamespaces, index: number) => {
    return (
      <button key={`wallet-${index}`} className="flex flex-col min-w-[125px] items-center justify-center p-2 rounded-lg hover:opacity-80"
        style={{ backgroundColor: BgColorSet[walletData.state] }}
        onClick={() => walletClick(walletData)}>
        <Image src={walletData.image} alt={`@{index}'s wallet`} width={45}
          height={45} />
        <span className="text-sm">{walletData.title}</span>
        <span className="text-xs color-grey-500"
          style={{ color: TextColorSet[walletData.state] }}>{walletData.state}</span>
      </button>)
  }

  return (
    <PopupTemplate title={"Connect Wallets"} triggerButton={triggerButton}>
      <Search search={search} setSearch={setSearch} />
      <div className="max-h-[60vh] flex flex-wrap justify-center overflow-auto gap-2 pr-1">
        {filteredData && filteredData.map((walletData, index) => (
          singleWalletButton(walletData, index)))}
      </div>
    </PopupTemplate>
  )
});
WalletSourcePopup.displayName = 'WalletSourcePopup';

export default WalletSourcePopup;

