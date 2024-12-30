import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type IconType = {
  image?: string,
  alt?: string,
  className?: string,
}

interface TokenIconProps {
  token: IconType,
  blockchain?: IconType,
  className?: string,
}

const TokenIcon: React.FC<TokenIconProps> = ({ className, token, blockchain }) => {
  return (
    <div className={cn('relative', className)}>
      <Avatar className={token.className}>
        {/* Display token image */}
        <AvatarImage src={token.image} />
        <AvatarFallback>{token.alt}</AvatarFallback>
      </Avatar>
      {/* Display blockchain logo in a small avatar */}
      {blockchain &&
        <div className="absolute -bottom-1 -right-1">
          <Avatar className={blockchain.className}>
            <AvatarImage src={blockchain.image} />
            <AvatarFallback>{blockchain.alt}</AvatarFallback>
          </Avatar>
        </div>
      }
    </div>
  );
};

export default TokenIcon;