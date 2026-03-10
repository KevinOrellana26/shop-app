"use client";

import { CategoryListT } from "@/src/app/_shared/product/_core/category.definitions";
import { ComboBox } from "@/src/components/ui/combobox";
import { Label } from "@/src/components/ui/label";
import { PARAMS } from "@/src/config/params.config";
import { parseAsString, useQueryState } from "nuqs";

type ProductFilterProps = {
  category: CategoryListT[];
};

export default function ProductFilter({ category }: ProductFilterProps) {
  const [selectedCategory, setSelectedCategory] = useQueryState(
    PARAMS.category,
    parseAsString.withDefault("").withOptions({ shallow: false }),
  );

  return (
    <>
      {/* FILTRAR POR RANGO DE PRECIOS 
      products.filter((product) => product.price >= minPrice && product.price <= maxPrice)
      UI Range Slider: https://ui.shadcn.com/docs/components/slider
    */}

      {/* FILTRAR POR CALIFICACIÓN DEL PRODUCTO (RATING) 
      products.filter((product) => product.rating >= 4)
      UI: Un grupo de estrellas o un listado de "4 estrellas o más", "3 estrellas o más".
    */}

      {/* FILTRAR POR DISPONIBILIDAD (STOCK) 
      products.filter(p => p.stock > 0) o products.filter(p => p.availabilityStatus === 'Low Stock')
      UI: Un checkbox de "Mostrar solo disponibles".
    */}

      {/* FILTRAR POR DESCUENTO
      products.filter(p => p.discountPercentage > 15)      
      UI: Un botón de "Grandes Ofertas".
    */}

      {/* FILTRAR POR MARCA
      Lógica: products.filter(p => p.brand === 'Apple').
      UI: Una lista de checkboxes con las marcas disponibles en el set de datos actual.
    */}

      {/* const filteredProducts = products.filter(product => {
      const matchesPrice = product.price <= userMaxPrice;
      const matchesRating = product.rating >= userMinRating;
      const matchesBrand = selectedBrand ? product.brand === selectedBrand : true;

      return matchesPrice && matchesRating && matchesBrand;
    }); */}

      <div className="flex flex-col gap-2">
        <Label htmlFor="category-combobox">Categoría</Label>
        <ComboBox
          label="Categoría"
          options={category.map((cat) => ({
            value: cat.value,
            label: cat.label,
          }))}
          selected={selectedCategory ?? ""}
          placeholder="Selecciona una categoría"
          onUserSelect={(value) => {
            // value puede ser string (single) o string[] (multiple)
            setSelectedCategory(value as string);
          }}
          showSearch={true}
        />
      </div>
    </>
  );
}
