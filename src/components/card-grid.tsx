import { cn } from "@/src/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

const gridColsMap: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
};

type CardGridProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
  cols?: number;
};

const CardGrid = ({
  children,
  className,
  asChild = false,
  cols = 2,
  ...props
}: CardGridProps) => {
  const Comp = asChild ? Slot : "section";
  return (
    <Comp
      className={cn(
        `grid w-full grid-cols-1 justify-items-center gap-4`,
        gridColsMap[cols],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

export { CardGrid };
