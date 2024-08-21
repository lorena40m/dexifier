import { useAppSelector } from "@/redux_slice/provider";
import { useAccount } from "wagmi";
import RoutesCard from "./routes-card";
import { FlexRoutesCardProps } from "@/app/types/interface";

const FlexRoutesCard: React.FC<FlexRoutesCardProps> = ({ isWalletConnected }) => {
  const account = useAccount();
  const { isSwapMade, isInProcess } = useAppSelector((state) => state.swap);
  const { isRoutesFetched } = useAppSelector((state) => state.routes);
  const { isRouteProcess } = useAppSelector((state) => state.routes);
  return (
    !isSwapMade &&
    !isInProcess &&
    isRoutesFetched &&
    !isRouteProcess &&
    isWalletConnected &&
    account.isConnected && (
      <div className={`${isSwapMade || isInProcess ? "w-1/3" : "w-full max-w-[550px]"}`}>
        <RoutesCard />
      </div>
    )
  );
};
export default FlexRoutesCard;
