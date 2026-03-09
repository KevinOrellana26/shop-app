import { DevDebug } from "@/src/components/debug/dev-debug";
import { handleAsync } from "@/src/lib/error";
import { notFound } from "next/navigation";
import ProductCard from "./_components/ProductCard";
import { getProductUseCase } from "./_core/product.use-case";

type ProductPageProps = {
  params: Promise<{ productId: string }>;
};

export default async function ProductPage(props: ProductPageProps) {
  const params = await props.params;
  const { productId } = params;

  if (!productId) {
    notFound();
  }

  const [productResponse, productError] = await handleAsync(() =>
    getProductUseCase(productId),
  );

  const product = productResponse;

  // const errors = [productError].filter(Boolean);

  if (productError || !product) {
    notFound();
  }

  return (
    <main className="flex flex-col min-h-screen p-4 gap-6 ">
      {/* {errors.length > 0 ? (
        <pre className="text-wrap text-red-500">
          {JSON.stringify(errors, null, 2)}
        </pre> */}
      {/* ) : ( */}
      <>
        <DevDebug data={product} />
        <ProductCard product={product} />
      </>
      {/* )} */}
    </main>
  );
}
