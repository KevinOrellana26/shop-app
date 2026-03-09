"use client";

import { CategoryListT } from "@/src/app/_shared/product/_core/category.definitions";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/src/components/ui/combobox";
import { useQueryState } from "nuqs";

type ProductFilterProps = {
  category: CategoryListT[];
};

export default function ProductFilter({ category }: ProductFilterProps) {
  const [selectedCategory, setSelectedCategory] = useQueryState("category");

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Combobox 
    //   value={selectedCategory ?? ""} 
    //   onValueChange={handleCategory}
      >
        <ComboboxInput placeholder="Selecciona una categoría..." />
        <ComboboxContent>
          <ComboboxEmpty>No se ha encontrado ninguna categoría</ComboboxEmpty>
          <ComboboxList className="max-h-50 overflow-y-auto">
            {category.map((item) => (
              <ComboboxItem
                key={item.value}
                value={item.value}
                onSelect={() => {
                  setSelectedCategory(item.value);
                }}
              >
                {item.label}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </>
  );
}
