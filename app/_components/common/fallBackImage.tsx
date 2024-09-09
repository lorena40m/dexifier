import Image from "next/image";
import { useEffect, useState } from "react";
const FallBackImage = ({
  src, className, alt, width, height, fallbackSrc, loading
}: {
  src: string,
  className?: string,
  alt: string,
  width: number,
  height: number,
  fallbackSrc: string
  loading?: "eager" | "lazy" | undefined
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => {
    setImgSrc(src);
  }, [src])
  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <Image
      className={className}
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      onError={handleError}
      loading={loading}
    />
  );
};

export default FallBackImage