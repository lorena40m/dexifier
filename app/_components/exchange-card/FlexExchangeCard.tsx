import { useAppSelector } from "@/redux_slice/provider";
import ExchangeCard from "./ExchangeCard";
import { FlexExchangeCardProps, WALLET } from "@/app/types/interface";


const FlexExchangeCard: React.FC<FlexExchangeCardProps> = ({ isWalletConnected }) => {
  const { isSwapMade, isInProcess } = useAppSelector((state) => state.swap);
  const { isRoutesFetched, isRouteProcess } = useAppSelector((state) => state.routes);
  const { wallet } = useAppSelector((state) => state.settings);

  return (
    <div
      className={
        `${(isSwapMade || isInProcess) && wallet === WALLET.BROWSE
          ? "w-full max-w-[480px]"
          : isRoutesFetched && !isRouteProcess && wallet === WALLET.BROWSE
            ? "w-full max-w-[480px]"
            : "min-w-[650px]"} 
           h-[570px]`}
    >
      <ExchangeCard isWalletConnected={isWalletConnected} />
    </div>
  );
};
export default FlexExchangeCard;
