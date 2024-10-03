import { useAppSelector } from "@/redux_slice/provider";
import SwapDetailsCard from "./SwapDetailsCard";
import { FlexSwapCardProps, WALLET } from "@/app/types/interface";

const FlexSwapCard: React.FC<FlexSwapCardProps> = ({ isWalletConnected }) => {
  const { isSwapMade, isInProcess } = useAppSelector((state) => state.swap);
  const { wallet } = useAppSelector((state) => state.settings)
  return (
    ((isSwapMade || isInProcess) && isWalletConnected) && wallet === WALLET.BROWSE && (
      <div className="w-full md:max-w-[650px]">
        <SwapDetailsCard isWalletConnected={isWalletConnected} />
      </div>
    )
  );
};
export default FlexSwapCard