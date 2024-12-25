import { Input } from "@/components/ui/input";
import { Dispatch, InputHTMLAttributes, SetStateAction, useMemo } from "react";
import { Separator } from "@/components/ui/separator";
import TokenModal from "./TokenModal";
import { Button } from "@/components/ui/button";
import { BlockchainMeta, Token } from "rango-types/mainApi";
import { useWidget } from "@rango-dev/widget-embedded";
import TokenIcon from "../common/token-icon";

// Defining the interface for TokenInput props
interface TokenInputProps extends InputHTMLAttributes<HTMLInputElement> {
  token: Token | undefined; // Token selected by the user
  setToken: Dispatch<SetStateAction<Token | undefined>>; // Setter function for updating the token state
}

const TokenInput: React.FC<TokenInputProps> = ({ token, setToken, ...props }) => {
  const { meta } = useWidget();
  const { blockchains } = meta; // Get the list of available blockchains
  // Find the selected blockchain's metadata
  const selectedBlochchain = useMemo<BlockchainMeta | undefined>(() => {
    if(token) return blockchains.find((blockchain: BlockchainMeta) => blockchain.name === token.blockchain)
  }, [blockchains, token]);

  return (
    <div className={`flex gap-1 border border-[#695F5F]/40 items-center justify-between bg-[#000]/30 backdrop-blur-lg rounded-lg py-2 shadow-md h-[3.3125rem]`}>
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
      <Separator orientation="vertical" className="bg-separator" />
      {/* Token selection button */}
      <TokenModal selectedToken={token} setToken={setToken}>
        <Button className="md:w-[9rem] w-[6rem] bg-transparent ring-0 border-none flex items-center justify-center gap-2 text-sm">
          {/* Display selected token info or default "Select Token" */}
          {token ?
            <>
              <TokenIcon
                token={{
                  image: token.image!,
                  alt: token.name!,
                }}
                blockchain={{
                  image: selectedBlochchain?.logo,
                  alt: selectedBlochchain?.name,
                  className: "size-6",
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