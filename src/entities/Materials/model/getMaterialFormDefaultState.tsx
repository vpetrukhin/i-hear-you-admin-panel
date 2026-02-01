import type { MaterialType } from "../types";
import type { MaterialFormFields } from "./material";

const defaultFormState: MaterialFormFields = {
  id: 0,
  file: null,
  fileLink: "",
  name: "",
  description: "",
  category: null,
  topic: null,
  paths: [],
  fileName: "",
  fileSize: "",
  isActive: false,
};

export const getMaterialFormDefaultState = (
  material?: MaterialType,
): MaterialFormFields => {
  if (!material) {
    return defaultFormState;
  }

  return {
    id: material.id,
    file: null,
    fileName: material.file?.split("/").pop() || "",
    fileSize: material.file_size_human,
    fileLink: material.external_url || "",
    name: material.name,
    description: material.description,
    category: material.categories,
    topic: material.topics,
    paths: material.paths,
    isActive: material.is_active,
  };
};
