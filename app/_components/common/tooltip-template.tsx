import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

const TooltipTemplate = ({
  content,
  className,
  children,
}: {
  content: string | ReactNode;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>

        <TooltipContent
          className={`${className} -mb-1 bg-black text-primary border-primary text-xs opacity-70`}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipTemplate;
