import { useAppSelector } from "@/redux_slice/provider";
import ExchangeCard from "./ExchangeCard";
import { FlexExchangeCardProps, WALLET } from "@/app/types/interface";
import NoWallet from "../no-wallet/Nowallet";


const FlexExchangeCard: React.FC<FlexExchangeCardProps> = ({ isWalletConnected }) => {
  const { isSwapMade, isInProcess } = useAppSelector((state) => state.swap);
  const { isRoutesFetched, isRouteProcess } = useAppSelector((state) => state.routes);
  const { wallet } = useAppSelector((state) => state.settings);

  return (
    <div
      className={
        // `${(isSwapMade || isInProcess)
        //   ? "w-full max-w-[480px]"
        //   : isRoutesFetched && !isRouteProcess
        //     ? "w-full max-w-[480px]"
        //     : "min-w-[650px]"} 
        `max-w-[600px] min-w-[375px] md:min-w-[600px]`}
    >
      {wallet === WALLET.BROWSE ? <ExchangeCard isWalletConnected={isWalletConnected} /> : <NoWallet isWalletConnected={isWalletConnected} />}
    </div>
  );
};
export default FlexExchangeCard;
