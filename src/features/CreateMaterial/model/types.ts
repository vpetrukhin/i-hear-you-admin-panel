import type { MaterialCategoryType, MaterialTopicType } from "@/entities/Materials";

export interface CreateFormStateType {
  file: File | File[] | null;
  name: string;
  fileLink: string;
  description: string;
  category: MaterialCategoryType | null;
  topic: MaterialTopicType | null;
  paths: number[];
}
