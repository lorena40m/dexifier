import { useAppSelector } from "@/redux_slice/provider";
import ExchangeCard from "./ExchangeCard";
import { useAccount } from "wagmi";
import { FlexExchangeCardProps } from "@/app/types/interface";


const FlexExchangeCard: React.FC<FlexExchangeCardProps> = ({ isWalletConnected }) => {
  const { isSwapMade, isInProcess } = useAppSelector((state) => state.swap);
  const { isRoutesFetched, isRouteProcess } = useAppSelector((state) => state.routes);
  const { connectedWallets } = useAppSelector((state) => state.wallet);
  console.log("connectedWallets", connectedWallets);

  return (
    <div
      className={
        `${isSwapMade || isInProcess
          ? "w-full max-w-[480px]"
          : isRoutesFetched && !isRouteProcess
            ? "w-full max-w-[480px]"
            : "min-w-[650px]"} 
          `}
    >
      <ExchangeCard isWalletConnected={isWalletConnected} />
    </div>
  );
};
export default FlexExchangeCard;
