import { FilterButton } from "@/src/components/filter-button";
import Navbar from "@/src/components/navbar";
import { handleAsync } from "@/src/lib/error";
import { SearchParams } from "nuqs";
import { Suspense } from "react";
import { productSearchParmsCache } from "../../_shared/product/_core/product.search-params";
import { getCategoryListUseCase } from "../../_shared/product/_core/product.use-cases";
import ProductFilter from "./_components/ProductFilter";
import ProductList, { ProductListSkeleton } from "./_components/ProductList";

type ProductPageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function ProductPage(props: ProductPageProps) {
  const searchParams = await props.searchParams;
  const { query, category, page, limit } = productSearchParmsCache.parse(searchParams);

  const [categoryResponse, categoryError] = await handleAsync(() =>
    getCategoryListUseCase(),
  );

  const categories = categoryResponse ?? [];

  const errors = [categoryError].filter(Boolean);

  return (
    <main className="flex flex-col min-h-screen p-4 gap-6 ">
      <Navbar>
        <FilterButton
          title="Filtros"
          description="Personaliza tu búsqueda para encontrar los productos ideales."
        >
          <ProductFilter category={categories} />
        </FilterButton>
      </Navbar>
      <Suspense key={`${query}-${category}-${page}`} fallback={<ProductListSkeleton />}>
        <ProductList query={query} category={category} page={page} limit={limit}/>
      </Suspense>
    </main>
  );
}
