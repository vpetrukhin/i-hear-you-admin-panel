import type { MaterialType } from "../types";
import type { MaterialFormFields } from "./material";

const defaultFormState: MaterialFormFields = {
  file: null,
  fileLink: "",
  name: "",
  description: "",
  category: null,
  topic: null,
  paths: [],
  fileName: "",
  fileSize: "",
};

export const getMaterialFormDefaultState = (
  material?: MaterialType,
): MaterialFormFields => {
  if (!material) {
    return defaultFormState;
  }

  return {
    file: null,
    fileName: material.file?.split("/").pop() || "",
    fileSize: material.file_size_human,
    fileLink: material.external_url || "",
    name: material.name,
    description: material.description,
    category: material.categories,
    topic: material.topics,
    paths: material.paths,
  };
};
