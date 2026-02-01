import { mapMimeToFileType } from "@/shared/lib/mapMimeToFileType";
import type { CreateFormStateType } from "./types";

export const getCreateMaterialFormData = (formState: CreateFormStateType) => {
  const file = Array.isArray(formState.file)
    ? formState.file[0]
    : formState.file;

  const formData = new FormData();

  if (file) {
    formData.append("file", file);
    formData.append("file_type", mapMimeToFileType(file.type));
  }

  if (formState.fileLink) {
    formData.append("external_url", formState.fileLink);
    formData.append("file_type", "LINK");
  }

  formData.append("name", formState.name);
  formData.append("is_active", "false");

  if (formState.category?.id) {
    formData.append("categories", formState.category.id.toString());
  }

  if (formState.topic?.id) {
    formData.append("topics", formState.topic.id.toString());
  }

  if (formState.paths) {
    formState.paths.forEach((path) => {
      formData.append("paths", path.id.toString());
    });
  }

  // formData.append(
  //   "paths",
  //   JSON.stringify(formState.paths.map((path) => Number(path.id)) ?? []),
  // );

  return formData;
};
