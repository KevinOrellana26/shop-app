"use client";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";

type DevDebugProps<T> = {
  data: T;
};

export function DevDebug<T>({ data }: DevDebugProps<T>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-2xl border-red-500 text-red-900 bg-red-300/90 hover:cursor-pointer"
        >
          DevDebug
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-5xl sm:max-h-[80dvh] flex flex-col">
        <DialogHeader>
          <DialogTitle>DevDebug</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto grid gap-4">
          <pre className="whitespace-pre-wrap wrap-break-words">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cerrar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
