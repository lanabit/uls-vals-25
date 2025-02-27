/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import confetti from "canvas-confetti";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Section from "./components/Section";
import { AlternatingTexts } from "./components/AlternatingTexts";
import Draggable from "./components/Draggable";
import { motion, useInView } from "motion/react";
import { pantunCollection } from "./texts/pantun";
import { twMerge } from "tailwind-merge";
export default function Home() {
  const [message, setMessage] = useState("");
  const [activePantun, setActivePantun] = useState<{
    color: string;
    pantun: string;
    rotation?: number;
    name: string;
  } | null>(null);
  const [negative, setNegative] = useState(1);

  useEffect(() => {
    const interBubble = document.querySelector<HTMLDivElement>(".interactive");
    const moving = document.querySelectorAll<HTMLDivElement>(".moving");

    if (!interBubble || !moving.length) return;

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;
    let animationFrameId: number;
    let xForce = 1;
    let yForce = 1;
    const easing = 0.01;
    const speed = 0.08;

    const lerp = (start: number, target: number, amount: number) => {
      const res = start * (1 - amount) + target * amount;
      return res;
    };

    function move() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;

      xForce = lerp(xForce, 1, easing);
      yForce = lerp(yForce, 2, easing);
      interBubble!.style.transform = `translate(${Math.round(
        curX
      )}px, ${Math.round(curY)}px)`;
      moving.forEach(
        (element) =>
          (element.style.transform = `translate(${-xForce}px, ${-yForce}px)`)
      );
      animationFrameId = requestAnimationFrame(move);
    }

    const handleMouseMove = (event: MouseEvent) => {
      tgX = event.clientX;
      tgY = event.clientY;

      const { movementX, movementY } = event;
      xForce += movementX * speed;
      yForce += movementY * speed;
    };

    window.addEventListener("mousemove", handleMouseMove);
    move();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const item = ["friend", "coworker", "mentor", "brother", "dad", "sister"];
  const good = [
    "you helped me figure out life with your warm wisdom",
    "you teach me things I otherwise wouldn't know",
    "you helped me clean up my messy git branch without making me feel dumb",
    "you believe in me when I don't believe in myself",
    "you are patient with me when I'm being difficult",
    "you make me laugh until my stomach hurts",
    "you make me lose sleep in the nicest way possible",
  ];

  const handleSubmit = () => {
    setNegative(negative * -1);
    const uppercaseMessage = message.toUpperCase();
    if (uppercaseMessage in pantunCollection) {
      setActivePantun(
        pantunCollection[uppercaseMessage as keyof typeof pantunCollection]
      );
    }
  };

  const openerRef = useRef<HTMLDivElement>(null);
  const isOpenerInView = useInView(openerRef, { margin: "-500px" });

  const opener = "Hey, you.";
  return (
    <div className="w-screen overflow-hidden" ref={containerRef}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1, ease: "easeInOut" }}
        className="absolute w-[50vw] h-[40vh] bg-red-500 top-[20vh] z-[80] left-[20vw] moving"
      >
        <img
          src="/images/flowers.jpg"
          className="w-[50%] h-[100%] object-cover"
        />
        <div className="absolute text-lg whitespace-pre-line top-0 left-[50%] m-8">
          {`dua tiga hello kitty \n ayo wasup shawty`}
        </div>
        <div className="absolute text-lg whitespace-pre-line bottom-0 right-0 m-8">
          {`karawang indramayu \n i got sumn for yu`}
        </div>
      </motion.div>
      <Section ref={openerRef} className="h-screen text-8xl relative">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: isOpenerInView ? 1 : 0,
            y: isOpenerInView ? 0 : 100,
          }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
          className="absolute top-[70vh] left-[50vw]"
        >
          {opener}
        </motion.div>
      </Section>
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 100, x: -100, rotate: -10 }}
          whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
          viewport={{ once: false, amount: 0.5, margin: "-100px" }}
          transition={{ ease: "easeInOut" }}
          className="absolute w-[50vw] h-[40vh] top-[20%] z-[80] left-[18%] moving"
        >
          <img
            src="/images/candy.jpg"
            className="w-[50%] h-[100%] object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="ml-[35%] w-[35vw]"
        >
          i just want to take a moment to say thank you for being a great{" "}
          <AlternatingTexts
            className="text-pink-400"
            examples={item}
            fadeDelay={1}
          />
        </motion.div>
      </Section>
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-[30vw] text-right ml-[-30%] mt-[10%]"
        >
          <AlternatingTexts
            isNextOnClick={true}
            fadeDelay={3.5}
            examples={good}
          />
        </motion.div>
        <div>
          <motion.div
            initial={{ opacity: 0, y: 200, rotate: 20 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: false, amount: 0.5, margin: "0px" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute w-[45vw] h-[50vh] top-32 z-[80] left-[60%] moving"
          >
            <img
              src="/images/zen.jpg"
              className="w-[50%] h-[100%] object-cover"
            />
          </motion.div>
        </div>
      </Section>
      <Section className="mt-[25vh]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5, margin: "0px" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          you have brighten my day in more ways than one
        </motion.div>
      </Section>
      <div className="gradient-bg">
        <div className="justify-center items-center flex flex-col w-screen h-[100vh] absolute top-0 left-0 z-[100]">
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.8, margin: "-20px" }}
            // transition={{ damping: 10, stiffness: 100, ease: "easeInOut" }}
            className="text-10xl md:text-4xl"
          >
            YOU ARE THE COOLEST
          </motion.div>

          <motion.div
            initial={{ x: 300, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.8, margin: "-20px" }}
            transition={{ delay: 0.3, ease: "easeInOut" }}
            className="text-2xl"
          >
            (and that's on god ☝️☝️☝️)
          </motion.div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className="gradients-container">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
          <div className="interactive"></div>
        </div>
      </div>
      {activePantun && (
        <Draggable
          containerRef={containerRef}
          top={"3000px"}
          left={"45%"}
          rotate={(activePantun.rotation || 2) * negative}
          className={twMerge(
            "bg-gradient-to-b w-auto shadow-[0_0_20px_rgba(236,72,153,0.5)] p-8 rounded-xl",
            activePantun.color
          )}
        >
          <div className="flex flex-col gap-4">
            <div className="whitespace-pre-line">{`from: wulan \nto: ${activePantun.name}`}</div>
            <div className="text-center whitespace-pre-line">
              {activePantun.pantun}
            </div>
          </div>
        </Draggable>
      )}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: "some" }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="flex justify-center gap-4 h-[50vh] items-center"
      >
        <div className="flex gap-16 items-center">
          <Image
            src="/images/eminem.jpg"
            alt="candy"
            width={0}
            height={0}
            sizes="100vw"
            className="object-contain w-[35vw] lg:w-[20vw] sm:w-[35vw]"
          ></Image>
          <div className="flex flex-col gap-4">
            <div className="text-3xl font-bold">
              Channeling my inner eminem 4 U
            </div>
            <div className="flex gap-2 items-center gap-5">
              <div className="text-2xl">ENTER YOUR CODE</div>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
                className="rounded-full focus:outline-none text-center px-5 p-2 bg-transparent border-2 transition-all duration-300 focus:border-pink-400 border-white"
              />
              <button
                onClick={handleSubmit}
                className="transition-all duration-200 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] bg-pink-500 rounded-full text-white px-8 py-2 hover:cursor-pointer"
              >
                SEND
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.6, margin: "100px" }}
        transition={{ ease: "easeInOut" }}
        onViewportEnter={() =>
          confetti({
            particleCount: 200,
            spread: 150,
            origin: { y: 0.6 },
          })
        }
        className="flex flex-col h-[100vh] mt-32 gap-8 w-[100vw] justify-center items-center"
      >
        <div className="relative w-[100vw] h-[55vh]">
          <motion.div
            initial={{ size: 0, rotate: 360, opacity: 0 }}
            whileInView={{ size: 350, rotate: 0, opacity: 1 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
            viewport={{ once: false, amount: 0.6, margin: "100px" }}
            className="absolute w-[25vw] h-[45vh] top-[15%] z-[80] left-[38%] moving"
          >
            <img
              src="/images/saranghae.jpg"
              className="w-[100%] h-[100%] object-cover"
            />
          </motion.div>
        </div>
        <div className="text-pink-300">(Xtra Late Edition)</div>
        <motion.div className="text-6xl">Happy Valentine's Day</motion.div>
        <div className="text-pink-300">Have a great rest of your life!</div>
      </motion.div>
    </div>
  );
}
