import z from "zod";

export const ApiCategoryListSchema =  z.array(z.string())
export type ApiCategoryListT = z.infer<typeof ApiCategoryListSchema>;

export const CategoryListSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export type CategoryListT = z.infer<typeof CategoryListSchema>;

export const categoryAdapter = (api: ApiCategoryListT): CategoryListT[] => {
  return api.map((category) => ({
    value: category,
    label: category,
  }));
};
