import { AnimatePresence, motion } from "framer-motion";
import React, { MouseEvent, PropsWithChildren, useRef, useState } from "react";

function getRelativeCoordinates(
  event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  referenceElement: HTMLDivElement | null
) {
  if (!referenceElement) return;
  const position = {
    x: event.pageX,
    y: event.pageY,
  };

  const offset = referenceElement.getBoundingClientRect();

  return {
    x: position.x - offset.x,
    y: position.y - offset.y,
  };
}

interface FloatingTooltipProps {
  description: string;
}

const FloatingTooltip: React.FC<PropsWithChildren<FloatingTooltipProps>> = (
  props
) => {
  const [mousePosition, setMousePosition] =
    useState<ReturnType<typeof getRelativeCoordinates>>();
  const boxRef = useRef<HTMLDivElement | null>(null);
  const handleMouseMove = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    setMousePosition(getRelativeCoordinates(e, boxRef.current));
  };
  return (
    <motion.div
      ref={boxRef}
      style={{
        position: "relative",
        perspective: 600,
      }}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseEnter={(e) => handleMouseMove(e)}
      onMouseLeave={() => {
        setMousePosition(undefined);
      }}
    >
      {props.children}
      <AnimatePresence>
        {mousePosition && (
          <motion.div
            className="text-primary bg-black border border-primary text-sm rounded px-2 py-1"
            style={{
              position: "absolute",
              left: mousePosition.x + 16,
              top: mousePosition.y + 16,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            ⓘ&nbsp;&nbsp;&nbsp;{props.description}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FloatingTooltip;
