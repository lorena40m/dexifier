import { useAppSelector } from "@/redux_slice/provider";
import SwapDetailsCard from "./SwapDetailsCard";

const FlexSwapCard = () => {
  const { isSwapMade, isInProcess } = useAppSelector((state) => state.swap);
  return (
    (isSwapMade || isInProcess) && (
      <div className="w-1/3 md:w-min-[550px]">
        <SwapDetailsCard />
      </div>
    )
  );
};
export default FlexSwapCard