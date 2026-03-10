import { callApi } from "@/src/lib/call-api";
import { ApiCategoryListT, categoryAdapter } from "./category.definitions";
import { ProductsT } from "./product.definitions";

export const getCategoryList = async () => {
  const apiUrl = `https://dummyjson.com/products/category-list`;
  const response = await callApi<ApiCategoryListT>(apiUrl, "GET");

  const categoryData = categoryAdapter(response);
  return categoryData;
};

// limit: número de items por página.
// skip: cuantos items saltar (ej: si estás en página 2 con limit 10, skip = 10).
// total: total de productos disponibles (para calcular total de páginas).
// skip = (pagina_actual - 1) * limit
export const getProducts = async (
  limit: number = 10,
  skip: number = 0,
  category?: string,
  query?: string,
) => {
  // await new Promise((resolve) => setTimeout(resolve, 50000)); // Simula un retraso de 1 segundo
  const params = new URLSearchParams();
  params.append("limit", limit.toString());
  params.append("skip", skip.toString());

  // Si hay búsqueda por query param
  if (query) {
    params.append("q", query);
    const apiUrl = `https://dummyjson.com/products/search?${params.toString()}`;
    return await callApi<ProductsT>(apiUrl, "GET");
  }

  if (category) {
    return await callApi<ProductsT>(
      `https://dummyjson.com/products/category/${category}?${params.toString()}`,
      "GET",
    );
  }

  // Lista general de productos (sin filtro ni búsqueda)
  return await callApi<ProductsT>(
    `https://dummyjson.com/products?${params.toString()}`,
    "GET",
  );
};

// export const searchProduct = async (
//   query?: string,
//   limit?: number,
//   skip?: number,
// ) => {
//   const params = new URLSearchParams();
//   query && params.append("q", query);
//   limit && params.append("limit", limit.toString());
//   skip && params.append("skip", skip.toString());

//   const apiUrl = `https://dummyjson.com/products/search?${params.toString()}`;
//   const response = await callApi<ProductsT>(apiUrl, "GET");

//   console.log("Search API response:", response);

//   return response;
// };

// export const getProductsByCategory = async (
//   category?: string,
//   skip?: number,
//   limit?: number,
// ) => {
//   const params = new URLSearchParams();
//   skip && params.append("skip", skip.toString());
//   limit && params.append("limit", limit.toString());
//   const apiUrl = `https://dummyjson.com/products/category/${category}?${params.toString()}`;
//   const response = await callApi<ProductsT>(apiUrl, "GET");
//   return response;
// };
