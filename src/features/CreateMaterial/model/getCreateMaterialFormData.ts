import { mapMimeToFileType } from "@/shared/lib/mapMimeToFileType";
import type { CreateFormStateType } from "./types";

export const getCreateMaterialFormData = (formState: CreateFormStateType) => {
  const file = Array.isArray(formState.file)
    ? formState.file[0]
    : formState.file;


  const formData = new FormData();

  if (file) {
    formData.append('file', file);
    formData.append('file_type', mapMimeToFileType(file.type));
  }

  if (formState.fileLink) {
    formData.append('external_url', formState.fileLink);
    formData.append('file_type', 'LINK');
  }

  formData.append('name', formState.name);
  formData.append('is_active', 'false');

  formData.append(
    'categories',
    JSON.stringify(
      formState.category?.id ? [formState.category] : []
    )
  );

  formData.append(
    'topics',
    JSON.stringify(
      formState.topic?.id ? [formState.topic] : []
    )
  );

  formData.append(
    'paths',
    JSON.stringify(formState.paths ?? [])
  );

  return formData
}
