import type { MaterialType } from "@/entities/Materials";
import { categoryMockList } from "@/entities/Materials/api/mocks/mockData/category";
import { materialTopics } from "@/entities/Materials/api/mocks/mockData/topic";
import { pathsMock } from "@/shared/api/pathApi/mock/mockData/paths";

export const materials: MaterialType[] = [
  {
    id: 1,
    name: "Алгоритмы и структуры данных",
    file: "algorithms.pdf",
    description: "Базовый учебный материал по алгоритмам и структурам данных.",
    file_type: "pdf",
    is_active: true,
    created_at: "2025-01-10T12:30:00Z",
    paths: pathsMock,
    category: categoryMockList[0],
    topic: materialTopics[0],
  },
  {
    id: 2,
    name: "Основы машинного обучения",
    file: "ml_basics.pptx",
    description: "Презентация о ключевых концепциях машинного обучения.",
    file_type: "pptx",
    is_active: true,
    created_at: "2025-02-01T09:00:00Z",
    paths: pathsMock,
    category: categoryMockList[0],
    topic: materialTopics[0],
  },
  {
    id: 3,
    name: "Введение в веб-разработку",
    file: "web_intro.docx",
    description: "Материал о принципах frontend и backend разработки.",
    file_type: "docx",
    is_active: false,
    created_at: "2024-12-20T16:45:00Z",
    paths: pathsMock,
    category: categoryMockList[0],
    topic: materialTopics[0],
  },
];
