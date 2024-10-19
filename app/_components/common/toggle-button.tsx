import { useAppSelector } from '@/redux_slice/provider';
import { updateFixedState } from '@/redux_slice/slice/noWalletSlice/currencySlice';
import { useDispatch } from 'react-redux';

const ToggleButton = () => {
  const dispatch = useDispatch();
  const { isFixed } = useAppSelector((state) => state.currency)

  const handleToggle = () => {
    dispatch(updateFixedState({ isFixed: !isFixed }))
  };

  return (
    <div className="flex items-center space-x-4">
      <div
        className={`flex items-center justify-between w-14 h-7 p-1 rounded-full cursor-pointer ${isFixed ? 'bg-primary' : 'bg-gray-400'
          }`}
        onClick={handleToggle}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isFixed ? 'translate-x-0' : 'translate-x-7'
            }`}
        />
      </div>
      <div className="flex items-center space-x-2">
        <span className={`text-md md:text-lg font-semibold ${isFixed ? 'text-white' : 'text-gray-400'}`}>
          Fixed Rate
        </span>
        <span className="text-gray-400">or</span>
        <span className={`text-md md:text-lg font-semibold ${!isFixed ? 'text-white' : 'text-gray-400'}`}>
          Floating Rate
        </span>
      </div>
    </div>
  );
};

export default ToggleButton;
