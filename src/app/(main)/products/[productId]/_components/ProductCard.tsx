"use client";

import { ProductT } from "@/src/app/_shared/product/_core/product.definitions";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { ArrowLeft, Package, Shield, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProductRating from "../../_components/ProductRating";
import { ReviewCard } from "./ReviewCard";

type ProductCardProps = {
  product: ProductT;
};

export default function ProductCard({ product }: ProductCardProps) {
  const {
    availabilityStatus,
    brand,
    category,
    description,
    id,
    dimensions,
    discountPercentage,
    images,
    price,
    rating,
    stock,
    title,
    meta,
    minimumOrderQuantity,
    returnPolicy,
    reviews,
    shippingInformation,
    sku,
    tags,
    thumbnail,
    warrantyInformation,
    weight,
  } = product;

  const discountedPrice = price - (price * discountPercentage) / 100;

  return (
    <>
      <div>
        <Link
          href={"/products"}
          className="text-sm gap-1 items-center text-muted-foreground transition-colors hover:text-foreground flex flex-row"
        >
          <ArrowLeft className="size-4" />
          <span>Volver a la tienda</span>
        </Link>
      </div>
      <div className="flex flex-row justify-between gap-4 w-full">
        <div className="flex flex-col gap-2 w-full">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <Image
              src={images[0]}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-row gap-2">Imagenes</div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium">{brand}</span>
            <span>•</span>
            <span>{category}</span>
            <span>•</span>
            <span>SKU: {sku}</span>
          </div>

          <h1 className="text-3xl font-bold text-balance leading-tight lg:text-4xl">
            {title}
          </h1>

          <div className="flex items-center gap-4">
            <ProductRating rating={rating} size="lg" />
            <span className="text-sm text-muted-foreground">
              ({reviews.length} {reviews.length === 1 ? "reseña" : "reseñas"})
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold">
              €{discountedPrice.toFixed(2)}
            </span>
            {discountPercentage > 0 && (
              <span className="text-xl text-muted-foreground line-through">
                €{price.toFixed(2)}
              </span>
            )}
          </div>

          <Badge variant={stock > 0 ? "secondary" : "destructive"}>
            {availabilityStatus}
          </Badge>

          <Separator />

          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Descripción</h2>
            <p className="leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>

          <Separator />

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <Button
            variant={"default"}
            className="w-full cursor-pointer"
            disabled={stock === 0}
          >
            {stock > 0 ? "Añadir al carrito" : "Sin stock"}
          </Button>

          <div className="flex flex-row w-full gap-2 justify-between">
            <Card className="w-full">
              <CardContent className="flex items-center gap-3 p-4">
                <Truck className="size-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Envío</p>
                  <p className="text-xs text-muted-foreground">
                    {shippingInformation}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardContent className="flex items-center gap-3 p-4">
                <Shield className="size-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Garantía</p>
                  <p className="text-xs text-muted-foreground">
                    {warrantyInformation}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardContent className="flex items-center gap-3 p-4">
                <Package className="size-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Devolución</p>
                  <p className="text-xs text-muted-foreground">
                    {returnPolicy}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Separator />
      {reviews.length > 0 && (
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-lg font-bold">Reseñas</h2>
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              rating={review.rating}
              comment={review.comment}
              reviewerName={review.reviewerName}
              date={review.date}
            />
          ))}
        </div>
      )}
    </>
  );
}
