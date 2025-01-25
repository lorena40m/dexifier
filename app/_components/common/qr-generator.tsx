// components/QrCodeGenerator.tsx
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode';
import TooltipTemplate from './tooltip-template';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RiQrScan2Line } from "react-icons/ri";

interface QrCodeGeneratorProps {
  text: string;
}

const QrCodeGenerator: React.FC<QrCodeGeneratorProps> = ({ text }) => {
  const [open, setOpen] = useState(false); // State to manage QR code visibility
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate the QR code when the data is changed
  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, text, (error) => {
        if (error) console.error(error);
      });
    }
  }, [text, canvasRef.current]);

  return (
    <Popover open={open} onOpenChange={(value) => setOpen(value)}>
      <TooltipTemplate content={"QR Code"}>
        <PopoverTrigger asChild>
          <button>
            <RiQrScan2Line size={20} className={open ? 'text-primary' : 'white'} />
          </button>
        </PopoverTrigger>
      </TooltipTemplate>
      <PopoverContent className="size-40 flex items-center justify-center">
        <div className='relative'>
          <div className='absolute top-[calc(50%-19px)] left-[calc(50%-19px)] rounded-full bg-black p-1'>
            <Image src={"/assets/icons/logo-qr.png"} width={30} height={30} alt='logo-qr' />
          </div>
          <canvas ref={canvasRef} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default QrCodeGenerator;