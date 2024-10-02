import { useAppSelector } from "@/redux_slice/provider";
import RoutesCard from "./routes-card";
import AddressesCard from "./addresses-card";
import { FlexRoutesCardProps, WALLET } from "@/app/types/interface";

const FlexRoutesCard: React.FC<FlexRoutesCardProps> = ({ isWalletConnected }) => {
  const { isSwapMade, isInProcess } = useAppSelector((state) => state.swap);
  const { isRoutesFetched } = useAppSelector((state) => state.routes);
  const { isRouteProcess } = useAppSelector((state) => state.routes);
  const { rateResult, isLoading } = useAppSelector((state) => state.rate);
  const { wallet } = useAppSelector((state) => state.settings)
  return (
    wallet === WALLET.BROWSE ?
      (!isSwapMade &&
        !isInProcess &&
        isRoutesFetched &&
        !isRouteProcess &&
        <div className={`${isSwapMade || isInProcess ? "w-1/3" : "max-w-[550px] md:w-full md:max-w-[650px]"}`}>
          <RoutesCard isWalletConnected={isWalletConnected} />
        </div>
      ) :
      (wallet === WALLET.NONE && (rateResult !== undefined && !isLoading && rateResult?.message === null) && <div className="min-w-[375px] md:w-full md:max-w-[600px]"><AddressesCard /></div>)
  );
};
export default FlexRoutesCard;
