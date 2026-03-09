import z from "zod";

export const DimensionsSchema = z.object({
  width: z.number(),
  height: z.number(),
  depth: z.number(),
});
export type DimensionsT = z.infer<typeof DimensionsSchema>;

export const ReviewSchema = z.object({
  rating: z.number(),
  comment: z.string(),
  date: z.date(),
  reviewerName: z.string(),
  reviewerEmail: z.email(),
});
export type ReviewT = z.infer<typeof ReviewSchema>;

export const MetaSchema = z.object({
  createdAt: z.string(),
  updateAt: z.string(),
  barcode: z.string(),
  qrCode: z.string(),
});
export type MetaT = z.infer<typeof MetaSchema>;

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  tags: z.array(z.string()),
  brand: z.string(),
  sku: z.string(),
  weight: z.number(),
  dimensions: DimensionsSchema,
  warrantyInformation: z.string(),
  shippingInformation: z.string(),
  availabilityStatus: z.string(),
  reviews: z.array(ReviewSchema),
  returnPolicy: z.string(),
  minimumOrderQuantity: z.number(),
  meta: MetaSchema,
  thumbnail: z.string(),
  images: z.array(z.string()),
});
export type ProductT = z.infer<typeof ProductSchema>;

export const ProductsSchema = z.object({
  products: ProductSchema.array(),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});
export type ProductsT = z.infer<typeof ProductsSchema>;