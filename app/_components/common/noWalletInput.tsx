import SwapSourcePopup from "../exchange-card/no-wallet-swap-source-popup";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux_slice/provider";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

import useDebounce from "@/app/utils/debounce";

import { updateCurrencyValue } from "@/redux_slice/slice/noWalletSlice/currencySlice";
import { getRate } from "@/app/api/noWallet-api";
import { updateLoadingState, updateRateResult } from "@/redux_slice/slice/noWalletSlice/rateSlice";
import { toastError } from "@/lib/utils";
import { updateAddressError, updateTransactionData } from "@/redux_slice/slice/noWalletSlice/transactionSlice";
import { CurrencyResponse } from "@/app/types/noWalletInterface";

interface Props {
  label: string;
  currencies: CurrencyResponse;
  isFromCurrency?: boolean;
  isFixed?: boolean;
}

const NoWalletInput: React.FC<Props> = ({
  label,
  currencies,
  isFromCurrency = false,
  isFixed = true
}) => {

  // redux hook
  const dispatch = useAppDispatch();

  const selectedCurrencyData = useAppSelector((state) => state?.currency);
  const selectedCurrency = useAppSelector((state) =>
    isFromCurrency
      ? state?.currency?.fromCurrency
      : state?.currency?.toCurrency
  );
  const { rateResult, isLoading } = useAppSelector((state) => state.rate);
  const { isExchangeButtonClicked } = useAppSelector((state) => state.routes);

  const [rateFetchError, setRateFetchError] = useState<boolean>(false);

  //use Memo
  const selectedCurrencyDataMemo = useMemo(
    () => ({ selectedCurrencyData }),
    [selectedCurrencyData]
  );

  //fetch route funtion
  const getRateData = () => {

    const rateData = {
      coinFrom: selectedCurrencyData.fromCurrency.code,
      networkFrom: selectedCurrencyData.fromCurrency.network?.network || "",
      coinTo: selectedCurrencyData.toCurrency.code,
      networkTo: selectedCurrencyData.toCurrency.network?.network || "",
      amount: selectedCurrency.value,
      rateType: isFixed ? "fixed" : "floating"

    }
    if (rateData.coinFrom === "" || rateData.coinTo === "" || rateData.amount === "0" || rateData.amount === "" || !isFromCurrency || isExchangeButtonClicked) {
      console.log("rate fetch fail with request data error");
      return
    }
    console.log("rateData==>", rateData);



    dispatch(updateLoadingState({ isLoading: true }));
    getRate(rateData).then((result) => {
      setRateFetchError(false);
      dispatch(updateRateResult({ rateResult: result }))
      console.log(result);
    }).catch((error) => {
      if (error.response && error.response.status === 422) {
        setRateFetchError(true);
        const result = error.response.data
        dispatch(updateRateResult({ rateResult: result }))
      } else {
        toastError("errors while fetching rate data")
      }
    }).finally(() => {
      dispatch(updateTransactionData({ transactionData: undefined }));
      dispatch(updateAddressError({ recipientAddressError: { isError: false, error: "" } }));
      dispatch(updateLoadingState({ isLoading: false }));

    })

  };

  const debouncedRefetchRoutes = useDebounce(getRateData, 1000);

  //useEffect

  useEffect(() => {
    debouncedRefetchRoutes();
  }, [selectedCurrencyDataMemo]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (rateResult?.maxAmount === undefined && rateResult?.minAmount === undefined) {
        return;
      } else if (rateResult?.maxAmount === undefined && rateResult?.minAmount !== undefined) {
        dispatch(updateCurrencyValue({ isFromCurrency: isFromCurrency, value: rateResult.minAmount.toString() }));
        setRateFetchError(false);
      } else if (rateResult?.minAmount === undefined && rateResult?.maxAmount !== undefined) {
        dispatch(updateCurrencyValue({ isFromCurrency: isFromCurrency, value: rateResult.maxAmount.toString() }));
        setRateFetchError(false);
      } else if (rateResult?.minAmount !== undefined && rateResult?.maxAmount !== undefined) {
        return;
      }
    }, 800); // 1000 milliseconds = 1 second

    // Cleanup function to clear the timeout if the component unmounts or dependencies change
    return () => clearTimeout(timer);
  }, [rateResult, dispatch]);


  //Event Function

  const fromInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

    dispatch(updateCurrencyValue({ isFromCurrency, value: e.target.value }));
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <label className="text-lg mb-1">{label}</label>

        <div>
          {isFromCurrency && rateResult &&
            (rateResult.minAmount !== undefined && rateResult.maxAmount !== undefined ?
              <span className="text-sm"> Min:{rateResult.minAmount}&nbsp; Max:{rateResult.maxAmount}</span> : rateResult.minAmount !== undefined ?
                <span className="text-sm text-error">The minimum amount is ${rateResult.minAmount}</span> : <span className="text-sm text-error">The maximum amount is {rateResult.maxAmount}</span>)
          }
        </div>
      </div>
      <div className={`${rateResult !== undefined && rateResult?.message !== null ? "border-error" : "border-[#695F5F]"} flex items-center justify-between bg-[#000]/30  backdrop-filter backdrop-blur-lg border  border-opacity-40 rounded-lg p-2 shadow-md max-h-[3.3125rem]`}>
        <div className="flex items-center w-full">
          {!isFromCurrency && <span>{isFixed ? "" : "~"}</span>}
          <Input
            type="number"
            value={
              isFromCurrency
                ? selectedCurrencyData.fromCurrency.value
                : rateResult !== undefined ? rateResult.toAmount : "0"
            }
            min={1}
            max={42000000}
            onChange={(e) => fromInputChangeHandler(e)}
            placeholder={isFromCurrency ? "Please enter 1-42000000" : "0"}
            className="flex-1 border-none bg-transparent focus-visible:ring-0 disabled:cursor-not-allowed focus-visible:outline-0 focus-visible:ring-offset-0"
            style={{ outline: "none" }}
            disabled={!isFromCurrency}
          />
          <div className="px-2">
            {!isFromCurrency && (isFixed ? <Image src={"/assets/icons/lock-green.png"} width={25} height={25} alt="lock-green" /> : <Image src={"/assets/icons/lock-grey.png"} width={25} height={25} alt="lock-grey" />)}
          </div>
        </div>

        <div className="border-l-2 border-[#ffffff33]">
          <SwapSourcePopup
            currencies={currencies}
            isFromCurrency={isFromCurrency}
          />
        </div>
      </div>
    </div>
  );
};

export default NoWalletInput;
