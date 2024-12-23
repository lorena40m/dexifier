import { Input } from "@/components/ui/input";
import { Dispatch, InputHTMLAttributes, SetStateAction } from "react";
import { Separator } from "@/components/ui/separator";
import TokenModal from "./TokenModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { Token } from "rango-types/mainApi";

interface TokenInputProps extends InputHTMLAttributes<HTMLInputElement> {
  token: Token | undefined;
  setToken: Dispatch<SetStateAction<Token | undefined>>;
}

const TokenInput: React.FC<TokenInputProps> = ({ token, setToken, ...props }) => {
  return (
    <div className={`flex gap-1 border border-[#695F5F]/40 items-center justify-between bg-[#000]/30 backdrop-blur-lg rounded-lg py-2 shadow-md h-[3.3125rem]`}>
      <div className="flex flex-col flex-1">
        <Input {...props} />
        <span className="text-xs px-3 opacity-50">
          ~
          {props.value || 0}
          $
        </span>
      </div>
      <Separator orientation="vertical" className="bg-separator" />
      <TokenModal selectedToken={token} setToken={setToken}>
        <Button className="md:w-[9rem] w-[6rem] bg-transparent ring-0 border-none flex items-center justify-center gap-2 text-sm">
          {token ?
            <>
              <Avatar>
                <AvatarImage src={token.image} />
                <AvatarFallback>{token.name}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden">
                <span>{token.name}</span>
                <span className="text-xs opacity-80">
                  {token.blockchain}
                </span>
              </div>
            </>
            :
            "Select Token"
          }
        </Button>
      </TokenModal>
    </div>
  );
};

export default TokenInput;
