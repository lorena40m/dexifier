import { useState } from "react";
import Image from 'next/image';
import TooltipTemplate from "./tooltip-template";

const ButtonCopyIcon = ({
  text
}: {
  text: string
}) => {
  const CopyText = (text: string): void => {
    navigator.clipboard.writeText(text);
  };

  const [copied, setCopied] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (text && !copied) {
      CopyText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <TooltipTemplate content={copied ? "copied" : "copy"} className="px-2 py-1">
      <button onClick={handleClick}>
        <Image src={copied ? "/assets/icons/copy-green.png" : "/assets/icons/copy.png"} width={18} height={18} alt="link" className="md:block hidden" />
        <Image src={"/assets/icons/copy.svg"} width={18} height={18} alt="link" className="md:hidden" />
      </button>
    </TooltipTemplate>
  )
}
export default ButtonCopyIcon