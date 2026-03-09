import {
  getCategoryList,
  getProducts,
  getProductsByCategory,
  searchProduct,
} from "./product.services";

//! TODO: implementar get cacheados despúes
export const getCategoryListUseCase = async () => {
  const response = await getCategoryList();
  return response;
};

export const getProductsByCategoryUseCase = async (
  category?: string,
  page: number = 1,
  limit: number = 10,
) => {
  const skip = (page - 1) * limit;
  const response = await getProductsByCategory(category, limit, skip);
  return response;
};

export const getProductsUseCase = async (
  page: number = 1,
  limit: number = 10,
) => {
  const skip = (page - 1) * limit;
  const response = await getProducts(limit, skip);
  return response;
};

export const getProductUseCase = async () => {};

export const searchProductUseCase = async (
  query?: string,
  page: number = 1,
  limit: number = 10,
) => {
  const skip = (page - 1) * limit;
  const response = await searchProduct(query, limit, skip);
  return response;
};
