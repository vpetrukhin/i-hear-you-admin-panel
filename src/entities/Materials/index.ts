import {
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
};

export const categoriesService = {
  getCategoriesList,
};

export const topicsService = {
  getTopicsList,
};

export { useCategoriesList } from "./lib/useCatgoriesListQuery";
export { useTopicsList } from "./lib/useTopicsList";
export { PATHS_LIST } from "./config/const";
