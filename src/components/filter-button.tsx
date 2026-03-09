"use client";

import { Filter } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

type FilterButtonProps = {
  title: string;
  children: React.ReactNode;
  description?: string;
};

export function FilterButton({
  title,
  description = "descripción",
  children,
}: FilterButtonProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size={"icon"} title={title}>
          <Filter />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" specialOverlay>
        <SheetHeader className="p-0 pt-2 px-4">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
