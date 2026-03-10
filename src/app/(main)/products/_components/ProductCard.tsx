"use client";

import { ProductT } from "@/src/app/_shared/product/_core/product.definitions";
import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import ProductRating from "./ProductRating";

type ProductCardProps = {
  product: ProductT;
};

export default function ProductCard({ product }: ProductCardProps) {
  const {
    discountPercentage,
    title,
    brand,
    category,
    rating,
    price,
    stock,
    availabilityStatus,
    images,
  } = product;
  const discountedPrice = price - (price * discountPercentage) / 100;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    // setIsLoading(true);
    router.push(`/products/${product.id}`);
  };

  return (
    <Card
      className="transition-all duration-300 hover:scale-102 hover:shadow-lg py-0 gap-6 w-full max-h-full"
      onClick={handleClick}
    >
      <CardHeader className="relative p-0">
        <div className="relative aspect-square overflow-hidden">
          <Image
            fill
            src={images[0]}
            alt={title}
            priority={true}
            // -> En móvil ocupa todo el ancho, en tablet la mitad, y en PC una cuarta parte
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        {discountPercentage > 0 && (
          <Badge className="absolute right-2 top-2 bg-black hover:bg-zinc-800 text-white border-none">
            -{Math.round(discountPercentage)}%
          </Badge>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-2 px-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {brand && <span className="font-medium">{brand} • </span>}
          <span>{category}</span>
        </div>
        <h3 className="line-clamp-2 text-balance font-semibold leading-tight">
          {title}
        </h3>
        <ProductRating rating={rating} size="sm" />
      </CardContent>
      <CardFooter className="justify-between px-4 pb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold">
            €{discountedPrice.toFixed(2)}
          </span>
          {discountPercentage > 0 && (
            <span className="text-sm text-muted-foreground line-through">
              €{price.toFixed(2)}
            </span>
          )}
        </div>
        <Badge variant={stock > 0 ? "secondary" : "destructive"}>
          {availabilityStatus}
        </Badge>
      </CardFooter>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="py-0 gap-4 overflow-hidden w-full">
      {/* HEADER: La imagen y el Badge */}
      <CardHeader className="relative p-0">
        <div className="relative aspect-square">
          <Skeleton className="h-full w-full rounded-none" />
          {/* Esqueleto del Badge de descuento */}
          <div className="absolute right-2 top-2">
            <Skeleton className="h-4 w-12 rounded-full" />
          </div>
        </div>
      </CardHeader>

      {/* CONTENT: Categoría, Título y Rating */}
      <CardContent className="flex flex-col gap-2 px-4 ">
        {/* Brand • Category */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24" />
        </div>
        {/* Título (2 líneas simuladas) */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/3" />
        </div>
        {/* Estrellas de Rating */}
        <div className="flex gap-1 mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 rounded-full text-muted-foreground/25"
            />
          ))}
        </div>
      </CardContent>

      {/* FOOTER: Precios y Stock Status */}
      <CardFooter className="justify-between px-4 pb-4">
        <div className="flex items-baseline gap-2">
          {/* Precio con descuento */}
          <Skeleton className="h-7 w-16" />
          {/* Precio tachado */}
          <Skeleton className="h-4 w-12" />
        </div>
        {/* Badge de disponibilidad */}
        <Skeleton className="h-6 w-20 rounded-full" />
      </CardFooter>
    </Card>
  );
}
