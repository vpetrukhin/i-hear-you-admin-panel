/* eslint-disable @typescript-eslint/no-explicit-any */
import { request } from "@/shared/api/axios";
import type { MaterialType } from "../types";
import { MATERIALS_API_URL_MAP } from "./urls";

export const listRequest = async (): Promise<MaterialType[]> => {
  const res = await request.get<any>(MATERIALS_API_URL_MAP.list);
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
