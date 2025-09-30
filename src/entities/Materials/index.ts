import { listRequest, deleteFile } from "./api/services";
export { type MaterialType } from "./types";
export { MATERIALS_FRONT_URL_MAP } from "./api/urls";

export const materialService = {
  listRequest,
  deleteFile,
};
