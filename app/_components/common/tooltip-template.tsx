import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const TooltipTemplate = ({
  content,
  className,
  children,
  duration = 300,
  disabled = false,
}: {
  content: string | ReactNode;
  className?: string;
  children: ReactNode;
  duration?: number;
  disabled?: boolean;
}) => {
  return (
    <TooltipProvider delayDuration={duration}>
      <Tooltip>
        <TooltipTrigger disabled={disabled} asChild={!disabled}>{children}</TooltipTrigger>
        <TooltipContent
          className={cn('-mb-1 bg-black text-primary border-primary text-xs', className)}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipTemplate;
