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
  topics: any;
}

export interface MaterialCategoryType {
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
  description: string;
  file_type: string;
  is_active: boolean;
  created_at: string;
  paths: any;
  categories: MaterialCategoryType[];
  topics: any;
}
