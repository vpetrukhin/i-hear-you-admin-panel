import { entityModel, topicsService, type CreateTopicDTO } from "@/entities/Materials"
import type { MaterialTopicType } from "@/entities/Materials"
import type { StepDataType } from "@/features/EditStep"
import { getSlug } from "@/shared/lib/getSlug"
import { useMutation } from "@tanstack/react-query"

interface Props {
  topics?: MaterialTopicType[]
  refetch: () => Promise<unknown>
}

export const useTopicChange = ({ topics, refetch }: Props) => {
  const deleteTopicMutation = useMutation({
    mutationFn: topicsService.deleteTopic
  })

  const createTopicMutation = useMutation({
    mutationFn: topicsService.createTopic
  })

  const updateTopicMutation = useMutation({
    mutationFn: (variables: { topicId: string, dto: CreateTopicDTO }) => topicsService.updateTopic(variables.topicId, variables.dto)
  })

  const handleTopicsSave = async (stepData: StepDataType) => {
    const newVariants = stepData.variants

    const topicsIds = entityModel.getEntityIds(topics)

    const deleted = topics
      ?.map(cat => String(cat.id))
      .filter((topicId) => !newVariants.some(v => v.id === topicId))

    const created = newVariants.filter((variant) => !topicsIds.includes(variant.id))

    const changed = newVariants
      ?.filter((variant) => topics?.some((topic) => variant.id === String(topic.id) && variant.value !== topic.name))

    if (changed?.length) {
      await Promise.all(changed.map(variant => updateTopicMutation.mutateAsync({
        topicId: variant.id,
        dto: {
          name: variant.value,
          slug: getSlug(variant.value),
        }
      })))
    }

    if (created?.length) {
      await Promise.all(created.map(variant => createTopicMutation.mutateAsync({
        name: variant.value,
        slug: getSlug(variant.value),
      })))
    }

    if (deleted?.length) {
      await Promise.all(deleted.map((id) => deleteTopicMutation.mutateAsync(id)))
    }

    await refetch()
  }

  const isPending = deleteTopicMutation.isPending || createTopicMutation.isPending || updateTopicMutation.isPending

  return {
    isPending,
    handleTopicsSave,
  }
}
