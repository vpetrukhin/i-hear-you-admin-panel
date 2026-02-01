import type { CreateFormStateType } from "./types";
import { getMaterialFormData } from "@/entities/Materials";

export const getCreateMaterialFormData = (formState: CreateFormStateType) => {
  return getMaterialFormData()
    .setFile(formState.file)
    .setFileLink(formState.fileLink)
    .setName(formState.name)
    .setDescription(formState.description)
    .setCategory(formState.category)
    .setTopic(formState.topic)
    .setPaths(formState.paths)
    .setIsActive(formState.isActive)
    .build();
};
