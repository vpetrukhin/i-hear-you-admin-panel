import { request } from "@/shared/api/axios";
import type { AxiosResponse } from "axios";

export interface PathType {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
  created_at: string;
}

export interface CreatePathDTO {
  slug: string,
  name: string,
  is_active?: boolean,
  path?: number
}

export const PATH_API_URL_MAP = {
  list: () => '/api/path/',
  create: () => '/api/path/',
  update: (id: string) => `/api/path/${id}/`,
  delete: (id: string) => `/api/path/${id}/`,
}

export const getPathsList = async () => {
  const res = await request.get<PathType[]>(PATH_API_URL_MAP.list());

  return res.data;
};

export const createPath = async (createPathDTO: CreatePathDTO) => {
  const res = await request.post<PathType, AxiosResponse<PathType>, CreatePathDTO>(PATH_API_URL_MAP.create(), createPathDTO)

  return res.data
}

export const deletePath = async (pathId: string) => {
  const res = await request.delete(PATH_API_URL_MAP.delete(pathId))

  return res.data
}

export const updatePath = async (pathId: string, pathDTO: CreatePathDTO) => {
  const res = await request.patch<PathType, AxiosResponse<PathType>, CreatePathDTO>(PATH_API_URL_MAP.update(pathId), pathDTO)

  return res.data
}
