import type { PathType } from "@/shared/api/pathApi";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MaterialsListApiType {
  id: number;
  name: string;
  file: string;
  description: string;
  file_type: string;
  is_active: boolean;
  created_at: string;
  paths: any;
  categories: MaterialCategoryType[];
  topics: MaterialTopicType[];
}

export interface MaterialCategoryType {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
  created_at: string;
}

export interface MaterialTopicType {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
  created_at: string;
}

export interface MaterialType {
  id: number;
  name: string;
  file: string;
  external_url: string;
  description: string;
  file_type: string;
  is_active: boolean;
  created_at: string;
  rating: number;
  rating_count: number;
  file_size: number;
  file_size_human: string;
  paths: PathType[];
  categories: MaterialCategoryType[];
  topics: MaterialTopicType[];
}
/*
{
   "id": 11,
   "name": "Рандомная ссылка",
   "file": null,
   "external_url": "https://practicum.yandex.ru/blog/chto-takoe-plan-proekta/?utm_source=tg&utm_medium=smm&utm_campaign=tg_smm_RF_Mngm_projMa_b2c_Post_None_blog-mngm&utm_content=11-10-2025&utm_term=blog-mngm-plan",
   "description": "",
   "file_type": "LINK",
   "is_active": false,
   "created_at": "2025-12-19T17:06:23.114310+03:00",
   "rating": null,
   "rating_count": 0,
   "file_size": null,
   "file_size_human": null,
   "categories": [],
   "topics": [],
   "paths": []
 }
*/

export interface CreateMaterialDTO {
  name: string;
  file: File;
  file_type: string;
  is_active: false;
  paths: number[];
  categories: number[];
  topics: number[];
}

// NOTE: Возможно нужно изменить контракт на беке
export interface CreateCategoryDTO {
  slug: string;
  name: string;
  is_active?: boolean;
  path?: number;
}

export interface CreateTopicDTO {
  slug: string;
  name: string;
  is_active?: boolean;
  path?: number;
}
