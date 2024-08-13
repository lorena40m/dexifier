import { useAppSelector } from "@/redux_slice/provider";
import ExchangeCard from "./ExchangeCard";
import { useAccount } from "wagmi";

const FlexExchangeCard = () => {
  const account = useAccount();
  const { isSwapMade, isInProcess } = useAppSelector((state) => state.swap);
  const { isRoutesFetched } = useAppSelector((state) => state.routes);
  const { isRouteProcess } = useAppSelector((state) => state.routes);
  return (
    <div
      className={`${
        isSwapMade || isInProcess
          ? "w-5/12"
          : isRoutesFetched && !isRouteProcess
          ? "w-5/12"
          : "min-w-[55.9375rem]"
      }`}
    >
      <ExchangeCard />
    </div>
  );
};
export default FlexExchangeCard;
