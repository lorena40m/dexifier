import { RiZzzFill } from "react-icons/ri"
import NoWalletInput from "../common/noWalletInput"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Blockchain } from "@/app/types/interface"
import { FC, ReactNode, useEffect, useState } from "react"
import { getCurrencies } from "@/app/api/noWallet-api"

interface NoWalletProps {
  blockchains: Blockchain[],
  isWalletConnected: boolean,
}

const NoWallet: FC<NoWalletProps> = ({ blockchains, isWalletConnected }) => {
  const [currencies, setCurrencies] = useState<CurrencyResponse>({ count: 0, data: [] })
  useEffect(() => {
    getCurrencies().then((result) => {
      setCurrencies(result)
      console.log("currencies", result);
    })
  }, [])

  const buttonTemplate = (
    content: string | ReactNode,
    loadingContent: string | ReactNode = "",
    disabled: boolean = false,
    onClick: Function
  ) => (
    <Button
      className={`${false
        ? "bg-transparent text-primary border border-seperator hover:bg-black/30"
        : "bg-primary hover:bg-primary-dark text-black"
        } ${false ? "w-full" : "w-full md:max-w-[75%] lg:max-w-[67%]"
        } font-semibold h-[3.125rem] mx-auto mt-5 text-xl disabled:cursor-not-allowed cursor-pointer transition-colors duration-300`}
      variant={"default"}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {false ? loadingContent : content}
    </Button>
  );


  return (
    <div className="flex flex-col justify-evenly p-4 my-6 gap-3 md:max-w-[85%] mx-auto ">

      <NoWalletInput
        currencies={currencies}
        label="You send"
        isFromCurrency={true}
        isWalletConnected={isWalletConnected} />

      <Button
        variant={"outline"}
        className="bg-transparent self-center cursor-default border-[#333] mt-6 rounded-full h-[54px] w-[54px] p-1 cursor-pointer"
        disabled={true}
        onClick={() => { }}
      >
        <Image
          src={"/assets/icons/swap.png"}
          alt="swap icon"
          height={28}
          width={28}
        />
      </Button>

      <NoWalletInput currencies={currencies} label="You get" />

      {buttonTemplate("Exchange Now", "", false, () => { })}
    </div>
  )
}
export default NoWallet