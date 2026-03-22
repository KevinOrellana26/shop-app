import { z } from "zod";

export const AddToCartSchema = z.object({
  productId: z.number(),
  title: z.string(),
  price: z.number(),
  thumbnail: z.string(),
  stock: z.number(),
  quantity: z.number(),
});

// Tipado para el input de la acción
export type AddToCartT = z.infer<typeof AddToCartSchema>;
