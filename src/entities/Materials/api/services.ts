/* eslint-disable @typescript-eslint/no-explicit-any */
import { request } from "@/shared/api/axios";
import type {
  CreateMaterialDTO,
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
  const link = `${MATERIALS_API_URL_MAP.list}/${id}`;
  const res = await request.delete<any>(link);
  return res.data;
};

export const fileRequest = async (
  id: number,
): Promise<MaterialType> => {
  const res = await request.get<any>(`${MATERIALS_API_URL_MAP.list}/${id}`);
  return res.data;
};

export const fileActive = async (
  id: number,
  is_active: boolean
): Promise<MaterialType> => {
  const link = `${MATERIALS_API_URL_MAP.list}/${id}`;
  const res = await request.patch<any>(link, {
    is_active: is_active
  });

  return res.data;
}

export const createFile = async (dto: CreateMaterialDTO) => {
  const res = await request.post<
    unknown,
    AxiosResponse<unknown>,
    CreateMaterialDTO
  >(MATERIALS_API_URL_MAP.create, dto);

  return res.data;
};

export const getCategoriesList = async () => {
  const res = await request.get<MaterialCategoryType[]>(
    CATEGORIES_API_URL_MAP.list,
  );

  return res.data;
};

export const getTopicsList = async () => {
  const res = await request.get<MaterialTopicType[]>(TOPICS_API_URL_MAP.list);

  return res.data;
};
