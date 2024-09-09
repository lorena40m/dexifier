import { useAppSelector } from "@/redux_slice/provider";
import RoutesCard from "./routes-card";
import { FlexRoutesCardProps, WALLET } from "@/app/types/interface";

const FlexRoutesCard: React.FC<FlexRoutesCardProps> = ({ isWalletConnected }) => {
  const { isSwapMade, isInProcess } = useAppSelector((state) => state.swap);
  const { isRoutesFetched } = useAppSelector((state) => state.routes);
  const { isRouteProcess } = useAppSelector((state) => state.routes);
  const { wallet } = useAppSelector((state) => state.settings)
  return (
    !isSwapMade &&
    !isInProcess &&
    isRoutesFetched &&
    !isRouteProcess &&
    isWalletConnected &&
    wallet === WALLET.BROWSE && (
      <div className={`${isSwapMade || isInProcess ? "w-1/3" : "w-full max-w-[550px]"}`}>
        <RoutesCard isWalletConnected={isWalletConnected} />
      </div>
    )
  );
};
export default FlexRoutesCard;
