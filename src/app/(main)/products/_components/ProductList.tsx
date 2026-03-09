import {
  getProductsByCategoryUseCase,
  getProductsUseCase,
  searchProductUseCase,
} from "@/src/app/_shared/product/_core/product.use-cases";
import { CardGrid } from "@/src/components/card-grid";
import ErrorLabel from "@/src/components/error-label";
import { handleAsync } from "@/src/lib/error";
import ProductCard, { ProductCardSkeleton } from "./ProductCard";
import ProductPagination from "./ProductPagination";

type ProductListProps = {
  query?: string;
  category?: string;
  page: number;
  limit: number;
};

export default async function ProductList({
  query,
  category,
  page,
  limit,
}: ProductListProps) {
  const [productsResponse, productsError] = await handleAsync(async () => {
    // Prioridad: 1. query (búsqueda), 2. category (filtro), 3. todos
    if (query) {
      return await searchProductUseCase(query, page, limit);
    } else if (category) {
      return await getProductsByCategoryUseCase(category, page, limit);
    } else {
      return await getProductsUseCase(page, limit);
    }
  });

  const products = productsResponse?.products ?? [];
  const total = productsResponse?.total ?? 0;
  const errors = [productsError].filter(Boolean);

  // 1. Si hay errores, mostramos el error
  if (errors.length > 0) {
    return (
      <pre className="text-wrap text-red-500 bg-red-50 p-4 rounded">
        {JSON.stringify(errors, null, 2)}
      </pre>
    );
  }

  // 2. Si no hay productos, mostramos el aviso
  if (products.length === 0) {
    return <ErrorLabel>No hay productos</ErrorLabel>;
  }

  // 3. Renderizamos la lista normal
  return (
    <>
      <CardGrid cols={4}>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </CardGrid>
      <ProductPagination currentPage={page} totalItems={total} limit={limit} />
    </>
  );
}

export function ProductListSkeleton() {
  return (
    <CardGrid cols={4}>
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </CardGrid>
  );
}
