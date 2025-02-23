import { motion } from "motion/react";
import { useState } from "react";

import { RefObject } from "react";
import { twMerge } from "tailwind-merge";

const Card = ({
  containerRef,
  src,
  alt,
  top = 0,
  left = 0,
  rotate = 0,
  className,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
  src?: string;
  alt?: string;
  top?: number;
  left?: number;
  rotate?: number;
  className?: string;
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

    setZIndex(maxZIndex + 1);
  };

  return (
    <motion.img
      onMouseDown={updateZIndex}
      style={{
        top,
        left,
        rotate,
        zIndex,
      }}
      className={twMerge(
        "drag-elements absolute w-48 bg-neutral-200 p-1 pb-4",
        className
      )}
      src={src}
      alt={alt}
      drag
      dragConstraints={containerRef}
      // Uncomment below and remove dragElastic to remove movement after release
      //   dragMomentum={false}
      dragElastic={0.65}
    />
  );
};

export default Card;
