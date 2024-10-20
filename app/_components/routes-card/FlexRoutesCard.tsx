import { useAppSelector } from "@/redux_slice/provider";
import RoutesCard from "./routes-card";
import AddressesCard from "./addresses-card";
import { FlexRoutesCardProps, WALLET } from "@/app/types/interface";

const FlexRoutesCard: React.FC<FlexRoutesCardProps> = ({ isWalletConnected }) => {
  const { isSwapMade, isInProcess } = useAppSelector((state) => state.swap);
  const { isRoutesFetched } = useAppSelector((state) => state.routes);
  const { isRouteProcess } = useAppSelector((state) => state.routes);
  const { rateResult, isLoading } = useAppSelector((state) => state.rate);
  const { fromToken, toToken } = useAppSelector((state) => state.tokens);
  const { fromCurrency, toCurrency } = useAppSelector((state) => state.currency);
  const { wallet } = useAppSelector((state) => state.settings);

  console.log("fromToken", fromToken);
  console.log("fromCurrency", fromCurrency);

  return (
    wallet === WALLET.BROWSE ?
      (!isSwapMade &&
        !isInProcess &&
        isRoutesFetched &&
        !isRouteProcess &&
        fromToken.blockchain !== "" &&
        fromToken.symbol !== "" &&
        fromToken.value !== "" &&
        fromToken.value !== 0 &&
        toToken.blockchain !== "" &&
        toToken.symbol !== "" &&
        <div className={`${isSwapMade || isInProcess ? "w-1/3" : "w-full md:w-full md:max-w-[650px]"}`}>
          <RoutesCard isWalletConnected={isWalletConnected} />
        </div>
      ) :
      (wallet === WALLET.NONE &&
        (rateResult !== undefined &&
          !isLoading &&
          rateResult?.message === null &&
          fromCurrency.code !== "" &&
          toCurrency.code !== "" &&
          fromCurrency.value !== ""
        ) && <div className="w-full md:w-full md:max-w-[650px]"><AddressesCard /></div>)
  );
};
export default FlexRoutesCard;
