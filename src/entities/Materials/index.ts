import {
  createFile,
  deleteFile,
  fileRequest,
  getCategoriesList,
  getTopicsList,
  listRequest,
} from "./api/services";
export { type MaterialType } from "./types";
export { MATERIALS_FRONT_URL_MAP } from "./api/urls";

export const materialService = {
  listRequest,
  deleteFile,
  fileRequest,
  createFile,
};

export const categoriesService = {
  getCategoriesList,
};

export const topicsService = {
  getTopicsList,
};

export { useCategoriesList } from "./lib/useCatgoriesListQuery";
export { useTopicsList } from "./lib/useTopicsList";
export { useCreateMaterialMutation } from "./lib/useCreateMaterialMutation";
export { PATHS_LIST } from "./config/const";
