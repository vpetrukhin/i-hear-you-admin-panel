import type { PathType } from "@/shared/api/pathApi";
import type { MaterialCategoryType, MaterialTopicType } from "../types";

export interface MaterialFormFields {
  file: File | File[] | null;
  fileName: string;
  fileSize: string;
  name: string;
  fileLink: string;
  description: string;
  category: MaterialCategoryType[] | null;
  topic: MaterialTopicType[] | null;
  paths: PathType[];
}
