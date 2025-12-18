/* eslint-disable @typescript-eslint/no-explicit-any */
import { request } from "@/shared/api/axios";
import type {
  CreateCategoryDTO,
  CreateTopicDTO,
  MaterialCategoryType,
  MaterialTopicType,
  MaterialType,
} from "../types";
import {
  CATEGORIES_API_URL_MAP,
  MATERIALS_API_URL_MAP,
  TOPICS_API_URL_MAP,
} from "./urls";
import type { AxiosResponse } from "axios";

export const listRequest = async (): Promise<MaterialType[]> => {
  const res = await request.get<MaterialType[]>(MATERIALS_API_URL_MAP.list);
  return res.data;
};

export const deleteFile = async (
  id: number,
): Promise<MaterialType[]> => {
  const link = MATERIALS_API_URL_MAP.file(String(id));
  const res = await request.delete<any>(link);
  return res.data;
};

export const fileRequest = async (
  id: number,
) => {
  const res = await request.get<MaterialType>(MATERIALS_API_URL_MAP.file(String(id)));
  return res.data;
};

export const fileActive = async (
  id: number,
  isActive: boolean,
): Promise<MaterialType> => {
  const res = await request.patch<any>(MATERIALS_API_URL_MAP.file(String(id)), {
    is_active: isActive,
  });

  return res.data;
}

export const createFile = async (dto: FormData) => {
  const res = await request.post<
    MaterialType,
    AxiosResponse<MaterialType>,
    FormData
  >(MATERIALS_API_URL_MAP.create, dto);

  return res.data;
};

export const getCategoriesList = async () => {
  const res = await request.get<MaterialCategoryType[]>(
    CATEGORIES_API_URL_MAP.list,
  );

  return res.data;
};


export const createCategory = async (createCategoryDTO: CreateCategoryDTO) => {
  const res = await request.post<MaterialCategoryType, AxiosResponse<MaterialCategoryType>, CreateCategoryDTO>(CATEGORIES_API_URL_MAP.create, createCategoryDTO)

  return res.data
}

export const deleteCategory = async (categoryId: string) => {
  const res = await request.delete(CATEGORIES_API_URL_MAP.delete(categoryId))

  return res.data
}

export const updateCategory = async (categoryId: string, categoryDTO: CreateCategoryDTO) => {
  const res = await request.patch<MaterialCategoryType, AxiosResponse<MaterialCategoryType>, CreateCategoryDTO>(CATEGORIES_API_URL_MAP.update(categoryId), categoryDTO)

  return res.data
}

export const getTopicsList = async () => {
  const res = await request.get<MaterialTopicType[]>(TOPICS_API_URL_MAP.list);

  return res.data;
};

export const createTopic = async (createTopicDTO: CreateTopicDTO) => {
  const res = await request.post<MaterialCategoryType, AxiosResponse<MaterialTopicType>, CreateTopicDTO>(TOPICS_API_URL_MAP.create, createTopicDTO)

  return res.data
}

export const deleteTopic = async (topicId: string) => {
  const res = await request.delete(TOPICS_API_URL_MAP.delete(topicId))

  return res.data
}

export const updateTopic = async (topicId: string, topicDTO: CreateCategoryDTO) => {
  const res = await request.patch<MaterialTopicType, AxiosResponse<MaterialTopicType>, CreateCategoryDTO>(TOPICS_API_URL_MAP.update(topicId), topicDTO)

  return res.data
}
