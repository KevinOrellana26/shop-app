"use server";

import { revalidatePath } from "next/cache";
import { createServerAction } from "zsa";
import { AddToCartSchema } from "./_core/product.definitions";
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

export const addToCartDbAction = createServerAction()
  .input(AddToCartSchema)
  .handler(async ({ input }) => {
    console.log("Input recibido en la acción:", input);
    await addProductToCartBdUseCase(input);

    revalidatePath("/cart");
    revalidatePath("/products/[productId]", "layout");
    return "¡Producto añadido correctamente al carrito!";
  });
