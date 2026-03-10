import { getCategoryList, getProducts } from "./product.services";

export const getCategoryListUseCase = async () => {
  return await getCategoryList();
};

export const getProductsUseCase = async (
  page: number = 1,
  limit: number = 10,
  category?: string,
  query?: string,
) => {
  const skip = (page - 1) * limit;
  // Unificado en un solo servicio para evitar redundancia
  return await getProducts(limit, skip, category, query);
};
