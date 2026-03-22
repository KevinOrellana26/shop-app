import { prisma } from "@/src/lib/prisma";
import { AddToCartT } from "./product.definitions";
import {
  addProductToCartBd,
  getProductById,
  getProductByIdBd,
} from "./product.services";

export const getProductByIdUseCase = async (productId: string) => {
  const response = await getProductById(Number(productId));
  return response;
};

export const addProductToCartBdUseCase = async (product: AddToCartT) => {
  console.log("Intentando añadir al carrito:", product);

  const existingProductInCart = await getProductByIdBd(product.productId);

  console.log("existe producto en el carrito?", existingProductInCart);

  if (existingProductInCart) {
    // throw new Error("El producto ya está en el carrito");

    console.log("Producto ya en el carrito, actualizando cantidad...");

    return await prisma.product.update({
      where: { id: existingProductInCart.id },
      data: {
        quantity: existingProductInCart.quantity + 1,
      },
    });
  }

  return await addProductToCartBd(product);
};
