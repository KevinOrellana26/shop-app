"use server";

import { ProductSchema } from "@/src/app/_shared/product/_core/product.definitions";
import { revalidatePath } from "next/cache";
import { createServerAction } from "zsa";
import { addProductToCartBdUseCase } from "./_core/product.use-case";

// export const addProductToCartAction = async (product: ProductT) => {
//   try {
//     await addProductToCartBdUseCase(product);

//     // Revalidamos la ruta para que el carrito se actualice visualmente
//     revalidatePath("/cart");

//     return { success: true, message: "Producto añadido correctamente" };
//   } catch (error) {
//     return {
//       success: false,
//       message: error instanceof Error ? error.message : "Error desconocido",
//     };
//   }
// };

const AddToCartSchema = ProductSchema;

export const addToCartDbAction = createServerAction()
  .input(AddToCartSchema)
  .handler(async ({ input }) => {
    const result = await addProductToCartBdUseCase(input);

    // Lo que retornes aquí será el "data" en el frontend
    revalidatePath("/cart");
    revalidatePath("/products/[productId]");
    return "Producto añadido correctamente";
  });
