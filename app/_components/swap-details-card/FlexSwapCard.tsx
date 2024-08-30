import { useAppSelector } from "@/redux_slice/provider";
import SwapDetailsCard from "./SwapDetailsCard";
import { FlexSwapCardProps } from "@/app/types/interface";

const FlexSwapCard: React.FC<FlexSwapCardProps> = ({ isWalletConnected }) => {
  const { isSwapMade, isInProcess } = useAppSelector((state) => state.swap);
  return (
    ((isSwapMade || isInProcess) && isWalletConnected) && (
      <div className="w-full max-w-[550px]">
        <SwapDetailsCard />
      </div>
    )
  );
};
export default FlexSwapCard