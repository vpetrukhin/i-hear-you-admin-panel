import {
  createFile,
  deleteFile,
  fileRequest,
  fileActive,
  getCategoriesList,
  getTopicsList,
  listRequest,
  deleteCategory,
  createCategory,
  updateCategory,
  deleteTopic,
  createTopic,
  updateTopic,
} from "./api/services";
import { getEntityIds } from "./model/category.ts";

export { type MaterialType, type CreateCategoryDTO, type MaterialCategoryType, type MaterialTopicType, type CreateTopicDTO } from "./types";
export { MATERIALS_FRONT_URL_MAP } from "./api/urls";

export const materialService = {
  listRequest,
  deleteFile,
  fileRequest,
  fileActive,
  createFile,
};

export const categoriesService = {
  getCategoriesList,
  deleteCategory,
  createCategory,
  updateCategory,
};

export const entityModel = {
  getEntityIds,
}

export const topicsService = {
  getTopicsList,
  deleteTopic,
  createTopic,
  updateTopic,
};

export { useCategoriesList } from "./lib/useCatgoriesListQuery";
export { useTopicsList } from "./lib/useTopicsList";
export { useCreateMaterialMutation } from "./lib/useCreateMaterialMutation";
export { PATHS_LIST } from "./config/const";
export { getMaterialHandlers } from './api/mocks/materialsHandlers'
export { getCategoriesHandlers } from './api/mocks/categoriesHandlers'
export { getTopicHandlers } from './api/mocks/topicsHandlers'
