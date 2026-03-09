import { handleAsync } from "@/src/lib/error";
import { getProductUseCase } from "./_core/product.use-case";
import { DevDebug } from "@/src/components/debug/dev-debug";

type ProductPageProps = {
  params: Promise<{ productId: string }>;
};

export default async function ProductPage(props: ProductPageProps) {
  const params = await props.params;

    const [productResponse, productError] = await handleAsync(() => getProductUseCase(params.productId));

    const product = productResponse ?? {};

    const errors = [productError].filter(Boolean);

  return <main className="flex flex-col min-h-screen p-4 gap-6 ">{errors.length > 0 ? (
          <pre className="text-wrap text-red-500">
            {JSON.stringify(errors, null, 2)}
          </pre>
        ) : (
          <>
            <DevDebug data={product} />
          </>
        )}</main>;
}
