import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">404</h2>
      <p className="mt-4 text-muted-foreground text-lg">
        ¡Ups! No hemos podido encontrar el producto o la página que buscas.
      </p>
      <Button asChild className="mt-8">
        <Link href="/products">Volver a la tienda</Link>
      </Button>
    </div>
  );
}
