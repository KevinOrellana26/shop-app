"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/src/components/ui/carousel";
import { cn } from "@/src/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type ProductImageCarouselProps = {
  images: string[];
  title: string;
};
export default function ProductImageCarousel({
  images,
  title,
}: ProductImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleThumbClick = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  return (
    <div className="flex flex-col gap-2 w-full max-w-xl">
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                <Image
                  src={image}
                  alt={`${title} - imagen ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Miniaturas */}
      <div className="flex flex-row gap-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbClick(index)}
            className={cn(
              "relative aspect-square w-24 h-24 rounded-lg overflow-hidden transition-opacity border-2",
              current === index
                ? "opacity-100 border-primary/20"
                : "opacity-50 border-transparent hover:opacity-75",
            )}
          >
            <Image
              src={image}
              alt={`Miniatura ${index + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
