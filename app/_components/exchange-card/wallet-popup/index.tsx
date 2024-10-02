import { Button } from "@/components/ui/button";
import PopupTemplate from "../../common/popup-template"
import TooltipTemplate from "../../common/tooltip-template";
import Image from "next/image";
import { useWalletList } from "@/app/wallet/useWalletList";
import { WalletInfoWithNamespaces, WalletState } from "@/app/wallet/types";
import Search from "../../common/search";
import { useSearchParams } from "next/navigation";
import { forwardRef, useActionState, useEffect, useMemo, useState } from "react";
import { useWallets } from "@rango-dev/wallets-react";
import { toastError } from "@/lib/utils";
import { TokenAmountType } from "@/app/types/interface"
import { useDispatch } from "react-redux";
import { updateTokenValue } from "@/redux_slice/slice/browserSlice/tokenSlice";
import { useAppSelector } from "@/redux_slice/provider";
import ShadowDecoration from "../../common/shadowDecoration";

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
  const { requiredChain } = useAppSelector((state) => state.wallet)
  const { list, handleClick, error, disconnectConnectingWallets } = useWalletList({ chain: requiredChain })
  const { filterLoading } = useAppSelector((state) => state.filter);
  const { state } = useWallets();
  const dispatch = useDispatch();
  const fromTokneValue = useAppSelector((state) => state.tokens.fromToken.value);

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

  const walletClick = async (walletData: WalletInfoWithNamespaces) => {
    if (walletData.state === "not_installed") {
      window.open(walletData.link as string, "_blank");
      return
    }
    if (walletData.state === "connecting") {
      disconnectConnectingWallets();
    } else {
      await handleClick(walletData.type);
    }
    if (fromTokneValue !== undefined) {
      dispatch(updateTokenValue({ isFromToken: true, value: fromTokneValue.toString() }));
    }
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
      className="px-2 bg-transparent hover:bg-transparent"
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
      <button key={`wallet-${index}`} className="flex flex-col min-w-[125px] items-center justify-center p-2 rounded-lg disabled:cursor-not-allowed hover:opacity-80"
        style={{ backgroundColor: BgColorSet[walletData.state] }}
        onClick={() => walletClick(walletData).catch(console.log)}
        disabled={filterLoading}>
        <Image src={walletData.image} alt={`@{index}'s wallet`} width={45}
          height={45} />
        <span className="text-sm">{walletData.title}</span>
        <span className="text-xs color-grey-500"
          style={{ color: TextColorSet[walletData.state] }}>{walletData.state}</span>
      </button>)
  }

  return (
    <PopupTemplate title={<span>Connect <span className="text-primary">{requiredChain}</span> Wallets</span>} triggerButton={triggerButton}>
      <Search search={search} setSearch={setSearch} />
      <div className="relative w-full">
        <ShadowDecoration />
        <div className="max-h-[60vh] flex flex-wrap justify-center overflow-auto gap-2 pr-1">
          {filteredData && filteredData.map((walletData, index) => (
            singleWalletButton(walletData, index)))}
        </div>
      </div>
    </PopupTemplate>
  )
});
WalletSourcePopup.displayName = 'WalletSourcePopup';

export default WalletSourcePopup;

