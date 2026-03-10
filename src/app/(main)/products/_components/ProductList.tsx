import { getProductsUseCase } from "@/src/app/_shared/product/_core/product.use-cases";
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
  const [productsResponse, productsError] = await handleAsync(() =>
    getProductsUseCase(page, limit, category, query),
  );

  const products = productsResponse?.products ?? [];
  const total = productsResponse?.total ?? 0;

  if (productsError) {
    return <ErrorLabel>Error al cargar productos</ErrorLabel>;
  }

  if (products.length === 0) {
    return (
      <ErrorLabel>No se encontraron productos para tu búsqueda.</ErrorLabel>
    );
  }

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
