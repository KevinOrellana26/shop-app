import { ProductT } from "@/src/app/_shared/product/_core/product.definitions";
import { callApi } from "@/src/lib/call-api";
import { prisma } from "@/src/lib/prisma";

export const getProductById = async (productId: number) => {
  const apiUrl = `https://dummyjson.com/products/${productId}`;
  const response = await callApi<ProductT>(apiUrl, "GET");

  return response;
};

export const addProductToCartBd = async (product: ProductT) => {
  return await prisma.product.create({
    data: {
      ...product,
      brand: product.brand ?? "",
      // Convertimos objetos y arrays a strings para SQLite
      tags: JSON.stringify(product.tags),
      dimensions: JSON.stringify(product.dimensions),
      meta: JSON.stringify(product.meta),
      reviews: JSON.stringify(product.reviews),
      images: JSON.stringify(product.images),
    },
  });
};

export const getProductByIdBd = async (id: number) => {
  return await prisma.product.findUnique({ where: { id } });
};
