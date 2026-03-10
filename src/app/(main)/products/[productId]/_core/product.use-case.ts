import { getProductById } from "./product.services";

export const getProductByIdUseCase = async (productId: string) => {
  const response = await getProductById(Number(productId));
  return response;
};
