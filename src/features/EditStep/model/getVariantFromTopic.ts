import type { MaterialTopicType } from "@/entities/Materials/types";
import type { VariantDTO } from "./getVariant";

export const getVariantFromTopic = (topic: MaterialTopicType): VariantDTO => ({
  id: String(topic.id),
  name: topic.name
})
