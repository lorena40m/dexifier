import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

const DexifierButton: React.FC<PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>> = ({className, ...props}) => {
  return (
    <Button
      className={cn(
        'bg-primary hover:bg-primary-dark text-black font-semibold h-[3.125rem] mx-auto text-xl disabled:cursor-not-allowed cursor-pointer transition-colors duration-300 rounded-xl',
        className
      )}
      variant={"default"}
      {...props}
    />
  );
};

export default DexifierButton;
