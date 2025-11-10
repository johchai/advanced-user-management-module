import { cn } from "@/utils";

interface SpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const Spinner = ({ className, size = "xl" }: SpinnerProps) => {
  const sizeClass = {
    sm: "size-3 border-2",
    md: "size-6 border-[3px]",
    lg: "size-8 border-4",
    xl: "size-14 border-6"
  }[size];

  return (
    <div
      className={cn(
        "inline-block animate-spin rounded-full border-solid border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
        sizeClass,
        className
      )}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
