import { callApi } from "@/src/lib/call-api";
import { ApiCategoryListT, categoryAdapter } from "./category.definitions";
import { ProductsT } from "./product.definitions";

export const getCategoryList = async () => {
  const apiUrl = `https://dummyjson.com/products/category-list`;
  const response = await callApi<ApiCategoryListT>(apiUrl, "GET");

  const categoryData = categoryAdapter(response);
  return categoryData;
};

export const getProducts = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 50000)); // Simula un retraso de 1 segundo
  const apiUrl = `https://dummyjson.com/products`;
  const response = await callApi<ProductsT>(apiUrl, "GET");

  return response;
};

export const searchProduct = async (query?: string) => {
  const params = new URLSearchParams();
  if (query) {
    params.append("q", query);
  }
  const apiUrl = `https://dummyjson.com/products/search?${params.toString()}`;
  const response = await callApi<ProductsT>(apiUrl, "GET");

  // log para debug
  console.log("Search API response:", response);

  return response;
};

export const getProductsByCategory = async (category?: string) => {
  const apiUrl = `https://dummyjson.com/products/category/${category}`;
  const response = await callApi<ProductsT>(apiUrl, "GET");
  return response;
};
