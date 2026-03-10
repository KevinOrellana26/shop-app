import { ProductT } from "@/src/app/_shared/product/_core/product.definitions";
import {
  addProductToCartBd,
  getProductById,
  getProductByIdBd,
} from "./product.services";

export const getProductByIdUseCase = async (productId: string) => {
  const response = await getProductById(Number(productId));
  return response;
};

export const addProductToCartBdUseCase = async (product: ProductT) => {
  const existingProduct = await getProductByIdBd(product.id);

  if (existingProduct) {
    // O actualizar la cantidad si ya existe en el carrito
    throw new Error("El producto ya está en el carrito");
  }

  return await addProductToCartBd(product);
};
