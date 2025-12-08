export const MATERIALS_API_URL_MAP = {
  list: "/api/files",
  file: (id: string) => `/api/files/${id}`,
  create: "api/files",
};

export const CATEGORIES_API_URL_MAP = {
  list: "/api/categories",
  create: "/api/categories",
  delete: (id: string) => `/api/categories/${id}`,
  update: (id: string) => `/api/categories/${id}`,
};

export const TOPICS_API_URL_MAP = {
  list: "api/topics",
  create: "/api/topics",
  delete: (id: string) => `/api/topics/${id}`,
  update: (id: string) => `/api/topics/${id}`,
};

export const MATERIALS_FRONT_URL_MAP = {
  list: "/materials",
};
