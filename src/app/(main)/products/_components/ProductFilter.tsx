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
    {/* ORDENAR POR PRICE, ESTRELLAS, EN ORDEN ASC Y DESC */}
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
