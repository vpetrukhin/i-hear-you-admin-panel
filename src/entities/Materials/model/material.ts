import type { PathType } from "@/shared/api/pathApi";
import type { MaterialCategoryType, MaterialTopicType } from "../types";
import { mapMimeToFileType } from "@/shared/lib/mapMimeToFileType";

export interface MaterialFormFields {
  id: number;
  file: File | File[] | null;
  fileName: string;
  fileSize: string;
  name: string;
  fileLink: string;
  description: string;
  category: MaterialCategoryType[] | null;
  topic: MaterialTopicType[] | null;
  paths: PathType[];
  isActive: boolean;
}

type Accumulator = Partial<{
  file: File;
  file_type: string;
  name: string;
  external_link: string;
  description: string;
  categories: number[];
  topics: number[];
  paths: number[];
  is_active: boolean;
}>;

const createBuilder = (acc: Accumulator) => ({
  setFile: (file: File | File[] | null) => {
    if (!file || Array.isArray(file)) {
      return createBuilder(acc);
    }

    return createBuilder({
      ...acc,
      file,
    });
  },

  setName: (name: string) => createBuilder({ ...acc, name }),

  setFileLink: (fileLink: string) =>
    createBuilder({ ...acc, external_link: fileLink, file_type: "LINK" }),

  setDescription: (description: string) =>
    createBuilder({ ...acc, description }),

  setCategory: (categories?: MaterialCategoryType[] | null) =>
    createBuilder({
      ...acc,
      categories: categories?.map((category) => category.id),
    }),

  setTopic: (topics?: MaterialTopicType[] | null) =>
    createBuilder({
      ...acc,
      topics: topics?.map((topic) => topic.id),
    }),

  setPaths: (paths?: PathType[] | null) =>
    createBuilder({
      ...acc,
      paths: paths?.map((path) => path.id),
    }),

  setIsActive: (isActive: boolean) =>
    createBuilder({
      ...acc,
      is_active: isActive,
    }),

  build: (): FormData => {
    const formData = new FormData();

    if (acc.file) {
      formData.append("file", acc.file);
      formData.append("file_type", mapMimeToFileType(acc.file.type));
    }
    if (acc.external_link) formData.append("external_link", acc.external_link);

    if (acc.name) formData.append("name", acc.name);
    if (acc.description) formData.append("description", acc.description);

    if (acc.categories !== undefined) {
      acc.categories.forEach((category) => {
        formData.append("categories", category.toString());
      });
    }

    if (acc.topics !== undefined) {
      acc.topics.forEach((topic) => {
        formData.append("topics", topic.toString());
      });
    }

    if (acc.paths !== undefined) {
      acc.paths.forEach((path) => {
        formData.append("paths", path.toString());
      });
    }

    if (acc.is_active !== undefined) {
      formData.append("is_active", String(acc.is_active));
    }

    return formData;
  },
});

export const getMaterialFormData = () => createBuilder({});
