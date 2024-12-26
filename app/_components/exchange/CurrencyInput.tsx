import { Input } from "@/components/ui/input";
import { Dispatch, InputHTMLAttributes, SetStateAction } from "react";
import { Separator } from "@/components/ui/separator";
import CurrencyModal from "./CurrencyModal";
import { Currency } from "@/app/types/exolix";
import { Button } from "@/components/ui/button";
import TokenIcon from "../common/token-icon";

interface CurrencyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  currency: Currency | undefined;
  excludedCurrency: Currency | undefined;
  setCurrency: Dispatch<SetStateAction<Currency | undefined>>;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ currency, excludedCurrency, setCurrency, ...props }) => {
  return (
    <div className={`flex border border-[#695F5F]/40 items-center justify-between md:bg-[#000]/30 bg-primary/30 backdrop-blur-lg rounded-lg py-2 shadow-md md:h-[3.3125rem] h-12`}>
      <Input {...props} />
      <Separator orientation="vertical" className="md:bg-separator bg-slate-300" />
      <CurrencyModal selectedCurrency={currency} excludedCurrency={excludedCurrency} setCurrency={setCurrency}>
        <Button className="md:w-[150px] w-[6rem] bg-transparent ring-0 border-none flex items-center justify-center gap-2 text-sm">
          {currency ?
            <>
              <TokenIcon
                token={{
                  image: currency.icon,
                  alt: currency.code,
                  className: "md:size-10 size-8"
                }}
              />
              <div className="flex flex-col">
                <span>{currency.code}</span>
                <span className="text-xs opacity-80">
                  {currency.network?.network}
                </span>
              </div>
            </>
            :
            "Select Token"
          }
        </Button>
      </CurrencyModal>
    </div>
  );
};

export default CurrencyInput;
