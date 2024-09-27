// components/QrCodeGenerator.tsx
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode';
import TooltipTemplate from './tooltip-template';

interface QrCodeGeneratorProps {
  text: string;
}

const QrCodeGenerator: React.FC<QrCodeGeneratorProps> = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false); // State to manage QR code visibility
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Toggle the visibility of the QR code
  const toggleQRCode = () => {
    setIsVisible((prev) => !prev);
  };

  // Generate the QR code when the visibility changes to true
  useEffect(() => {
    if (isVisible && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, text, (error) => {
        if (error) console.error(error);
      });
    }
  }, [isVisible, text]);

  // Hide QR code when clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (canvasRef.current && !canvasRef.current.contains(event.target as Node)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div className='relative h-[18px]'>
      <div className={`absolute bottom-[30px] right-[20px] ${isVisible ? "flex" : "hidden"}`}>
        <canvas ref={canvasRef} />
      </div>
      <TooltipTemplate content={"QR Code"}>
        <button onClick={toggleQRCode}>
          {isVisible ? <Image src={"/assets/icons/qr-green.png"} width={18} height={18} alt={"qr-green"} /> : <Image src={"/assets/icons/qr.png"} width={18} height={18} alt={"qr"} />}
        </button>
      </TooltipTemplate>

    </div>
  );
};

export default QrCodeGenerator;
