// import { useEffect } from "react";
import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";
export default function Coolest({
  x,
  y,
  className,
}: {
  x: number;
  y: number;
  className?: string;
}) {
  return (
    <motion.div
      animate={{ x: -x, y: -y }}
      className={twMerge("absolute w-[50vw] top-[50vh] left-[50vw]", className)}
    ></motion.div>
  );
}
