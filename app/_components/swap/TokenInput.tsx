import { Input } from "@/components/ui/input";
import { Dispatch, InputHTMLAttributes, SetStateAction, useMemo } from "react";
import { Separator } from "@/components/ui/separator";
import TokenModal from "./TokenModal";
import { Button } from "@/components/ui/button";
import { BlockchainMeta, Token } from "rango-types/mainApi";
import { useWidget } from "@rango-dev/widget-embedded";
import TokenIcon from "../common/token-icon";
import { useDexifier } from "@/app/providers/DexifireProvider";
import { cn } from "@/lib/utils";

// Defining the interface for TokenInput props
interface TokenInputProps extends InputHTMLAttributes<HTMLInputElement> {
  token: Token | undefined; // Token selected by the user
  setToken: Dispatch<SetStateAction<Token | undefined>>; // Setter function for updating the token state
}

const TokenInput: React.FC<TokenInputProps> = ({ token, setToken, ...props }) => {
  const { meta } = useWidget();
  const { blockchains } = meta; // Get the list of available blockchains
  const { isMobile } = useDexifier();
  // Find the selected blockchain's metadata
  const selectedBlochchain = useMemo<BlockchainMeta | undefined>(() => {
    if(token) return blockchains.find((blockchain: BlockchainMeta) => blockchain.name === token.blockchain)
  }, [blockchains, token]);


  return (
    <div className={cn(`flex border-[#695F5F]/40 items-center justify-between backdrop-blur-lg rounded-lg p-2 shadow-md`, isMobile ? "bg-primary/30 h-12" : "border h-[53px] bg-[#000]/30")}>
      {/* Input field for token amount */}
      <div className="flex flex-col flex-1">
        <Input {...props} /> {/* Custom input for entering token amount */}
        <span className="text-xs px-3 opacity-50">
          {/* Display estimated USD value of the token */}
          ~
          {token?.usdPrice && props.value ? Number(props.value) * token.usdPrice : 0}
          $
        </span>
      </div>
      {/* Separator between input field and token selection button */}
      <Separator orientation="vertical" className={isMobile ? "bg-white" : "bg-separator"} />
      {/* Token selection button */}
      <TokenModal selectedToken={token} setToken={setToken}>
        <Button className={cn("md:w-[150px] w-[6rem] bg-transparent ring-0 border-none flex items-center justify-center gap-2", isMobile ? "p-1 text-xs" : "text-sm")}>
          {/* Display selected token info or default "Select Token" */}
          {token ?
            <>
              <TokenIcon
                token={{
                  image: token.image!,
                  alt: token.name!,
                  className: isMobile ? "size-8" : undefined,
                }}
                blockchain={{
                  image: selectedBlochchain?.logo,
                  alt: selectedBlochchain?.name,
                  className: isMobile ? "size-4" : "size-6",
                }}
              />
              <div className="flex flex-col overflow-hidden">
                <span>{token.name}</span>
                <span className="text-xs opacity-80">
                  {/* Display blockchain name */}
                  {token.blockchain}
                </span>
              </div>
            </>
            :
            "Select Token" // Placeholder text if no token is selected
          }
        </Button>
      </TokenModal>
    </div>
  );
};

export default TokenInput;