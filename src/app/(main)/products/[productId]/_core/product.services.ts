import { ProductT } from "@/src/app/_shared/product/_core/product.definitions";
import { callApi } from "@/src/lib/call-api";

export const getProductById = async (productId: number) => {
  const apiUrl = `https://dummyjson.com/products/${productId}`;
  const response = await callApi<ProductT>(apiUrl, "GET");

  return response;
};
