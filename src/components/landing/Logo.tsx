import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "hero";
  className?: string;
}

export function Logo({ size = "md", className }: LogoProps) {
  const sizeClasses = {
    sm: "text-xl leading-[0.9]",
    md: "text-2xl leading-[0.9]",
    lg: "text-4xl leading-[0.9]",
    hero: "text-[clamp(4rem,7vw,6rem)] leading-[0.9]",
  };

  return (
    <div
      className={cn(
        "font-logo font-bold tracking-[-0.02em]", // <- changed from font-display to font-logo
        sizeClasses[size],
        className
      )}
      data-testid="logo"
    >
      <span className="block">Two</span>
      <span className="block">
        Table
        <span
          className="inline-block w-[0.20em] h-[0.20em] ml-[0.23rem] rounded-full bg-[#B80B0B]"
          aria-hidden="true"
        />
      </span>
    </div>
  );
}

export function RedDot() {
  return <span className="text-[#B80B0B]">.</span>;
}

export function RedQuestion() {
  return <span className="text-[#B80B0B]">?</span>;
}
