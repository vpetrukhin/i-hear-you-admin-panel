import { entityModel } from "@/entities/Materials"
import type { StepDataType } from "@/features/EditStep"
import { useMutation } from "@tanstack/react-query"
import { createPath, deletePath, updatePath, type CreatePathDTO, type PathType } from "../api/path"
import { getSlug } from "@/shared/lib/getSlug"

interface Props {
  paths?: PathType[]
  refetch: () => Promise<unknown>
}

export const usePathsChange = ({ paths, refetch }: Props) => {
  const deletePathMutation = useMutation({
    mutationFn: deletePath
  })

  const createPathMutation = useMutation({
    mutationFn: createPath
  })

  const updatePathMutation = useMutation({
    mutationFn: (variables: { pathId: string, dto: CreatePathDTO }) => updatePath(variables.pathId, variables.dto)
  })

  const handlePathsSave = async (stepData: StepDataType) => {
    const newVariants = stepData.variants

    const pathsIds = entityModel.getEntityIds(paths)

    const deleted = paths
      ?.map(cat => String(cat.id))
      .filter((pathId) => !newVariants.some(v => v.id === pathId))

    const created = newVariants.filter((variant) => !pathsIds.includes(variant.id))

    const changed = newVariants
      ?.filter((variant) => paths?.some((path) => variant.id === String(path.id) && variant.value !== path.name))

    if (changed?.length) {
      await Promise.all(changed.map(variant => updatePathMutation.mutateAsync({
        pathId: variant.id,
        dto: {
          name: variant.value,
          slug: getSlug(variant.value),
        }
      })))
    }

    if (created?.length) {
      await Promise.all(created.map(variant => createPathMutation.mutateAsync({
        name: variant.value,
        slug: getSlug(variant.value),
      })))
    }

    if (deleted?.length) {
      await Promise.all(deleted.map((id) => deletePathMutation.mutateAsync(id)))
    }

    await refetch()
  }

  const isPending = deletePathMutation.isPending || createPathMutation.isPending || updatePathMutation.isPending

  return {
    isPending,
    handlePathsSave,
  }
}
