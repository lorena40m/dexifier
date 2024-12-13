import { useAppSelector } from "@/redux_slice/provider";
import ExchangeCard from "./ExchangeCard";
import { FlexExchangeCardProps, WALLET } from "@/app/types/interface";
import NoWallet from "../no-wallet/Nowallet";
import { useEffect } from "react";
import { getAllTokens } from "@/app/api/rango";
import { useTokenList } from "@/app/providers/TokenProvider";


const FlexExchangeCard: React.FC<FlexExchangeCardProps> = ({ isWalletConnected }) => {
  const { wallet } = useAppSelector((state) => state.settings);
  const { setTokenList } = useTokenList();
  useEffect(() => {
    getAllTokens().then(
      (data) => {
        console.log("all token list", data);
        setTokenList(data);
      }
    )
  }, [])

  return (
    <div
      className={
        `w-full md:w-full md:max-w-[650px]`}
    >
      {wallet === WALLET.BROWSE ? <ExchangeCard isWalletConnected={isWalletConnected} /> : <NoWallet isWalletConnected={isWalletConnected} />}
    </div>
  );
};
export default FlexExchangeCard;
