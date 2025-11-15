import type { MaterialType } from "@/entities/Materials";

export const materials: MaterialType[] = [
  {
    id: 1,
    name: "Алгоритмы и структуры данных",
    file: "algorithms.pdf",
    description: "Базовый учебный материал по алгоритмам и структурам данных.",
    file_type: "pdf",
    is_active: true,
    created_at: "2025-01-10T12:30:00Z",
    paths: {
      preview: "/previews/algorithms.png",
      download: "/files/algorithms.pdf"
    },
    categories: [
    ],
    topics: [
    ]
  },
  {
    id: 2,
    name: "Основы машинного обучения",
    file: "ml_basics.pptx",
    description: "Презентация о ключевых концепциях машинного обучения.",
    file_type: "pptx",
    is_active: true,
    created_at: "2025-02-01T09:00:00Z",
    paths: {
      preview: "/previews/ml_basics.png",
      download: "/files/ml_basics.pptx"
    },
    categories: [
    ],
    topics: [
      { id: "21", name: "Регрессия" },
      { id: "22", name: "Классификация" }
    ]
  },
  {
    id: 3,
    name: "Введение в веб-разработку",
    file: "web_intro.docx",
    description: "Материал о принципах frontend и backend разработки.",
    file_type: "docx",
    is_active: false,
    created_at: "2024-12-20T16:45:00Z",
    paths: {
      preview: "/previews/web_intro.png",
      download: "/files/web_intro.docx"
    },
    categories: [
    ],
    topics: [
      { id: "31", name: "HTML" },
      { id: "32", name: "CSS" },
      { id: "33", name: "JavaScript" }
    ]
  }
];
