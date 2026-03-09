import {
  getCategoryList,
  getProducts, getProductsByCategory, searchProduct
} from './product.services';

export const getCategoryListUseCase = async () => {
  const response = await getCategoryList();
  return response;
};

export const getProductsByCategoryUseCase = async (category?: string) => {
  const response = await getProductsByCategory(category);
  return response;
}

export const getProductsUseCase = async () => {
  //! TODO: implementar get cacheados despúes
  const response = await getProducts();
  return response;
};

export const getProductUseCase = async () => {};

export const searchProductUseCase = async (query?: string) => {
  const response = await searchProduct(query);
  return response;
};
