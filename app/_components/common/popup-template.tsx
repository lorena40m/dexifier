import { ReactNode } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PopupTemplate = ({
  children,
  title,
  topButton = (
    <DialogClose className="flex items-center justify-center">
      <X className="w-7 h-7 p-0.5 bg-primary rounded-full font-bold text-black hover:bg-primary-dark transition-colors duration-300" />
    </DialogClose>
  ),
  triggerButton,
}: {
  children: ReactNode;
  title: string;
  topButton?: ReactNode;
  triggerButton: ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>

      <DialogContent className="max-h-[99vh] max-w-[95vw] px-4 py-4 md:p-6 sm:max-w-[28.1875rem] bg-gradient-to-b from-black to-[#042214] border border-seperator !rounded-3xl gap-0">
        <DialogHeader className="border-b border-seperator mb-4 pb-4 px-[0.5625rem] flex flex-row justify-between items-center">
          <DialogTitle className="capitalize text-2xl font-normal">
            {title}
          </DialogTitle>

          {topButton}
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default PopupTemplate;
