// import { AnimatePresence, motion } from "motion/react";
// import { useEffect, useState } from "react";

// const AlternatingText = ({
//   texts,
// }: //   duration = 4000, // in milliseconds
// {
//   texts: string[];
//   //   duration?: number;
// }) => {
//   const LETTER_DELAY = 0.025; // in seconds so 25ms

//   const MAIN_FADE_DURATION = 0.5; // in seconds

//   const [currentIndex, setCurrentIndex] = useState(0);
//   useEffect(() => {
//     const currentText = texts[currentIndex];
//     const animationTime = currentText.length * LETTER_DELAY * 1000 + 2000; // Add 2s buffer

//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex: number) => (prevIndex + 1) % texts.length);
//     }, animationTime);

//     return () => clearInterval(interval);
//   }, [currentIndex, texts]);

//   return (
//     <AnimatePresence mode="wait">
//       <motion.span
//         initial={{
//           opacity: 0,
//         }}
//         animate={{
//           opacity: 1,
//         }}
//         exit={{
//           opacity: 0,
//         }}
//         transition={{
//           delay: 1,
//           duration: MAIN_FADE_DURATION,
//           ease: "easeInOut",
//         }}
//       >
//         {texts[currentIndex]}
//       </motion.span>
//     </AnimatePresence>
//   );

//   return (
//     <p>
//       {texts[currentIndex].split("").map((letter, i) => {
//         return (
//           <motion.span
//             key={i}
//             initial={{
//               opacity: 1,
//             }}
//             animate={{
//               opacity: 0,
//             }}
//             transition={{
//               delay: 5,
//               duration: MAIN_FADE_DURATION,
//               ease: "easeInOut",
//             }}
//             className="relative"
//           >
//             <motion.span
//               key={i}
//               initial={{
//                 opacity: 0,
//               }}
//               animate={{
//                 opacity: 1,
//               }}
//               transition={{
//                 delay: i * LETTER_DELAY,
//                 duration: 0.1,
//               }}
//             >
//               {letter}
//             </motion.span>
//           </motion.span>
//         );
//       })}
//     </p>
//   );
// };

// export default AlternatingText;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

// export const Example = () => {
//   return (
//     <div className="flex items-center justify-center px-8 py-24">
//       <BlockInTextCard
//         examples={[
//           "Does your product work for SMBs?",
//           "Can I pause my membership without losing my data?",
//           "How does seat based pricing work?",
//           "What's the meaning of life?",
//         ]}
//       />
//     </div>
//   );
// };

export const AlternatingTexts = ({
  examples,
  fadeDelay = 5,
  className,
  isNextOnClick,
}: {
  examples: string[];
  fadeDelay?: number;
  className?: string;
  isNextOnClick?: boolean;
}) => {
  const LETTER_DELAY = 0.025;
  // const BOX_FADE_DURATION = 0.125;

  const MAIN_FADE_DURATION = 0.25;

  const SWAP_DELAY_IN_MS = fadeDelay * 1000 + 500;
  const [exampleIndex, setExampleIndex] = useState(0);

  const nextOnClick = () => {
    setExampleIndex((pv) => (pv + 1) % examples.length);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setExampleIndex((pv) => (pv + 1) % examples.length);
    }, SWAP_DELAY_IN_MS);

    return () => clearInterval(intervalId);
  });

  return (
    <span
      onClick={nextOnClick}
      className={twMerge(
        className,
        isNextOnClick &&
          "cursor-pointer hover:text-pink-400 transition-all duration-200"
      )}
    >
      {examples[exampleIndex].split("").map((l, i) => (
        <motion.span
          initial={{
            opacity: 1,
          }}
          animate={{
            opacity: 0,
          }}
          transition={{
            delay: fadeDelay,
            duration: MAIN_FADE_DURATION,
            ease: "easeInOut",
          }}
          key={`${exampleIndex}-${i}`}
          className=""
        >
          <motion.span
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: i * LETTER_DELAY,
              duration: 0,
            }}
          >
            {l}
          </motion.span>
        </motion.span>
      ))}
    </span>
  );
};
