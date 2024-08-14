import { useAppSelector } from "@/redux_slice/provider";
import SwapDetailsCard from "./SwapDetailsCard";

const FlexSwapCard = () => {
  const { isSwapMade, isInProcess } = useAppSelector((state) => state.swap);
  return (
    (isSwapMade || isInProcess) && (
      <div className="w-5/12">
        <SwapDetailsCard />
      </div>
    )
  );
};
export default FlexSwapCard