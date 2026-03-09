import { ComponentProps } from "react";
import { cn } from "../lib/utils";

type ErrorLabelProps = ComponentProps<"p"> & {};

export default function ErrorLabel({
  className,
  children,
  ...props
}: ErrorLabelProps) {
  return (
    <p
      className={cn(
        "flex w-full flex-wrap justify-center gap-2 overflow-clip wrap-break-words rounded-lg border border-red-500 bg-red-700/25 p-2",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
