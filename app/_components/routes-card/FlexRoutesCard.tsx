import { useAppSelector } from "@/redux_slice/provider";
import { useAccount } from "wagmi";
import RoutesCard from "./routes-card";

const FlexRoutesCard = () => {
  const account = useAccount();
  const { isSwapMade, isInProcess } = useAppSelector((state) => state.swap);
  const { isRoutesFetched } = useAppSelector((state) => state.routes);
  const { isRouteProcess } = useAppSelector((state) => state.routes);
  return (
    !isSwapMade &&
    !isInProcess &&
    isRoutesFetched &&
    !isRouteProcess &&
    account.isConnected && (
      <div className={`${isSwapMade || isInProcess ? "w-1/3" : "w-5/12"}`}>
        <RoutesCard />
      </div>
    )
  );
};
export default FlexRoutesCard;
