"use client";

import { ProductT } from "@/src/app/_shared/product/_core/product.definitions";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import { ArrowLeft, Package, Shield, ShoppingCart, Truck } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import ProductRating from "../../_components/ProductRating";
import ProductImageCarousel from "./ProductImageCarousel";
import ProductServiceCard from "./ProductServiceCard";
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

  const router = useRouter();
  return (
    <>
      <Button
        onClick={() => router.push("/products")}
        className="text-sm gap-1 items-center text-muted-foreground transition-colors hover:text-foreground flex flex-row cursor-pointer hover:underline hover:underline-offset-2"
        variant={"secondary"}
      >
        <ArrowLeft className="size-4" />
        <span>Volver a la tienda</span>
      </Button>
      <div className="flex flex-col md:flex-row justify-between gap-5 w-full">
        <ProductImageCarousel images={images} title={title} />
        <div className="flex flex-col justify-between gap-2 w-full">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-start md:items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">{brand}</span>
              <span>•</span>
              <span>{category}</span>
              <span>•</span>
              <span>SKU: {sku}</span>
            </div>

            <div className="flex flex-row justify-between items-start md:items-center gap-4 w-full">
              <h1 className="text-3xl font-bold text-balance leading-tight lg:text-4xl">
                {title}
              </h1>
              <Badge
                variant={stock > 0 ? "secondary" : "destructive"}
                className="whitespace-nowrap shrink-0 mt-1"
              >
                {availabilityStatus}
              </Badge>
            </div>

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

            <div className="flex flex-col gap-2 border-y py-3">
              <h2 className="text-lg font-bold">Descripción</h2>
              <p className="leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-col w-full gap-6">
            <div className="flex flex-row w-full gap-2 justify-between">
              <ProductServiceCard
                icon={Truck}
                title="Envío"
                description={shippingInformation}
              />
              <ProductServiceCard
                icon={Shield}
                title="Garantía"
                description={warrantyInformation}
              />
              <ProductServiceCard
                icon={Package}
                title="Devolución"
                description={returnPolicy}
              />
            </div>

            <Button
              variant={"default"}
              className="w-full cursor-pointer"
              disabled={stock === 0}
            >
              {stock > 0 ? "Añadir al carrito" : "Sin stock"}
              <ShoppingCart className="size-4" />
            </Button>
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
