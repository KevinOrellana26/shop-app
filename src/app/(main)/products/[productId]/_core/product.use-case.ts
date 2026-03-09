import { getProduct } from "./product.services";

export const getProductUseCase = async (productId: string) => {
  const response = await getProduct(Number(productId));
  return response;
};
