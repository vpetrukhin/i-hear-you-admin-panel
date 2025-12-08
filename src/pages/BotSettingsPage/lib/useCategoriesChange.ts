import { categoriesService, entityModel, type CreateCategoryDTO } from "@/entities/Materials"
import type { MaterialCategoryType } from "@/entities/Materials/types"
import type { StepDataType } from "@/features/EditStep"
import { useMutation } from "@tanstack/react-query"

interface Props {
  categories?: MaterialCategoryType[]
  refetch: () => Promise<unknown>
}

export const useCategoriesChange = ({ categories, refetch }: Props) => {
  const deleteCategoryMutation = useMutation({
    mutationFn: categoriesService.deleteCategory
  })

  const createCategoryMutation = useMutation({
    mutationFn: categoriesService.createCategory
  })

  const updateCategoryMutation = useMutation({
    mutationFn: (variables: { categoryId: string, dto: CreateCategoryDTO }) => categoriesService.updateCategory(variables.categoryId, variables.dto)
  })

  const handleCategoriesSave = async (stepData: StepDataType) => {
    const newVariants = stepData.variants

    const categoriesIds = entityModel.getEntityIds(categories)

    const deleted = categories
      ?.map(cat => String(cat.id))
      .filter((categoryId) => !newVariants.some(v => v.id === categoryId))

    const created = newVariants.filter((variant) => !categoriesIds.includes(variant.id))

    const changed = newVariants
      ?.filter((variant) => categories?.some((category) => variant.id === String(category.id) && variant.value !== category.name))

    if (changed?.length) {
      await Promise.all(changed.map(variant => updateCategoryMutation.mutateAsync({
        categoryId: variant.id,
        dto: {
          name: variant.value
        }
      })))
    }

    if (created?.length) {
      await Promise.all(created.map(variant => createCategoryMutation.mutateAsync({
        name: variant.value,
      })))
    }

    if (deleted?.length) {
      await Promise.all(deleted.map((id) => deleteCategoryMutation.mutateAsync(id)))
    }

    await refetch()
  }

  const isPending = deleteCategoryMutation.isPending || createCategoryMutation.isPending || updateCategoryMutation.isPending

  return {
    isPending,
    handleCategoriesSave,
  }
}
