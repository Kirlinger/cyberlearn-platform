"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function SectionReveal({ children, className, delay }: SectionRevealProps) {
  const [ref, visible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700",
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className
      )}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
