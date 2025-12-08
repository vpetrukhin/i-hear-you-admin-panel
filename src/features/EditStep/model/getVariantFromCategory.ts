import type { MaterialCategoryType } from "@/entities/Materials";
import type { VariantDTO } from "./getVariant";

export const getVariantFromCategory = (category: MaterialCategoryType): VariantDTO => ({
  id: String(category.id),
  name: category.name
})
