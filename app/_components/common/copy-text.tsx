// components/CopyText.tsx
import { useState, PropsWithChildren } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface CopyTextProps {
  text: string;
  className?: string;
}

const CopyText: React.FC<PropsWithChildren<CopyTextProps>> = (props) => {
  const CopyText = (text: string): void => {
    navigator.clipboard.writeText(text);
  };

  const [copied, setCopied] = useState<boolean>(false);

  // Generate the QR code when the data is changed
  const handleClick = () => {
    if (props.text) {
      CopyText(props.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild onClick={(event) => {
          event.preventDefault();
        }} className={props.className}>
          <div onClick={handleClick}>
            {props.children}
          </div>
        </TooltipTrigger>
        <TooltipContent
          onPointerDownOutside={(event) => {
            event.preventDefault();
          }}
          className={cn('mb-1 bg-black text-primary border-primary text-xs')}
        >
          {copied ? 'Copied!' : 'Click to copy'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyText;