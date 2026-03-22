import { ProductT } from "@/src/app/_shared/product/_core/product.definitions";
import { callApi } from "@/src/lib/call-api";
import { prisma } from "@/src/lib/prisma";
import { AddToCartT } from "./product.definitions";

export const getProductById = async (productId: number) => {
  const apiUrl = `https://dummyjson.com/products/${productId}`;
  const response = await callApi<ProductT>(apiUrl, "GET");

  return response;
};

// Buscamos por 'productId' para ver si ya está en el carrito
export const getProductByIdBd = async (productId: number) => {
  const product = await prisma.product.findFirst({
    where: { productId: productId },
  });
  console.log("Producto encontrado en BD:", product);
  return product;
};

export const addProductToCartBd = async (product: AddToCartT) => {
  try {
    return await prisma.product.create({
      data: {
        productId: product.productId,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        stock: product.stock,
        quantity: 1,
      },
    });
  } catch (error) {
    console.error("Error real de Prisma:", error);
    throw error;
  }
};
