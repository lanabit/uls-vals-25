import { motion } from "motion/react";
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  const style = {
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "400px",
    borderRadius: "50% 22% 40% 80%",
    filter: " blur(20px)",
    backgroundColor: "rgb(255, 67, 75)",
    background: "linear-gradient(#43d9ad, #4d5bce)",
    opacity: 0.4,
    zIndex: 2,
  };

  const variants = {
    default: {
      x: mousePosition.x - 200,
      y: mousePosition.y - 200,
      scale: [1, 2, 2, 1, 1],
      rotate: [0, 0, 270, 270, 0],
      borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    },
  };

  // const animate = {
  //   scale: [1, 2, 2, 1, 1],
  //   rotate: [0, 0, 270, 270, 0],
  //   borderRadius: ['20%', '20%', '50%', '50%', '20%'],
  // };

  return (
    <motion.div
      className={`fixed top-0 left-0`}
      style={style}
      variants={variants}
      // animate={animate}
      animate="default"
      transition={{
        x: {
          duration: 0.3,
          ease: "linear",
          repeat: 0,
          type: "spring",
          stiffness: 80,
        },
        y: {
          duration: 0.3,
          ease: "linear",
          repeat: 0,
          type: "spring",
          stiffness: 80,
        },
        default: {
          duration: 2.5,
          repeat: Infinity,
        },
      }}
    ></motion.div>
  );
};

export default CustomCursor;
