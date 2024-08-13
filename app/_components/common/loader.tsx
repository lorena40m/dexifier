import React from "react";

const CustomLoader = ({ className }: { className?: string }) => {
  return (
    <div className="flex justify-center items-center">
      <div className={`loader ${className}`}></div>
    </div>
  );
};

export default CustomLoader;
