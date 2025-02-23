import { twMerge } from "tailwind-merge";
export default function Section({
  children,
  className,
  ref,
}: {
  children: React.ReactNode;
  className?: string;
  ref?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={ref}
      className={twMerge(
        "relative text-2xl md:px-0 justify-center flex items-centerpx-8 justify-center flex items-center gap-4 h-[50vh] w-screen",
        className
      )}
    >
      {children}
    </div>
  );
}
