import { motion } from "motion/react";
import { useState } from "react";

import { RefObject } from "react";
import { twMerge } from "tailwind-merge";

const Draggable = ({
  containerRef,
  top = 0,
  left = 0,
  rotate = 0,
  className,
  children,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
  top?: number | string;
  left?: number | string;
  rotate?: number | string;
  className?: string;
  children?: React.ReactNode;
}) => {
  const [zIndex, setZIndex] = useState(0);

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-elements");

    let maxZIndex = -Infinity;

    els.forEach((el) => {
      const zIndex = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index")
      );

      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });

    setZIndex(maxZIndex + 100);
  };

  return (
    <motion.div
      onMouseDown={updateZIndex}
      style={{
        top,
        left,
        rotate,
        zIndex,
      }}
      className={twMerge(
        "drag-elements absolute w-48 bg-neutral-200 p-1 pb-4 cursor-grab active:cursor-grabbing",
        className
      )}
      drag
      dragConstraints={containerRef}
      // Uncomment below and remove dragElastic to remove movement after release
      //   dragMomentum={false}
      dragElastic={0.65}
    >
      {children}
    </motion.div>
  );
};

export default Draggable;
