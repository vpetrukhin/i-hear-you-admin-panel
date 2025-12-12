import type { MaterialCategoryType } from "@/entities/Materials/types";

export const categoryMockList: MaterialCategoryType[] = [
  {
    id: 1,
    name: "Программирование",
    slug: "programming",
    is_active: true,
    created_at: "2025-01-05T10:00:00Z"
  },
  {
    id: 2,
    name: "Машинное обучение",
    slug: "machine-learning",
    is_active: true,
    created_at: "2025-01-12T14:20:00Z"
  },
  {
    id: 3,
    name: "Веб-разработка",
    slug: "web-development",
    is_active: true,
    created_at: "2025-01-20T09:45:00Z"
  },
  {
    id: 4,
    name: "Компьютерные науки",
    slug: "computer-science",
    is_active: false,
    created_at: "2024-12-28T18:30:00Z"
  },
  {
    id: 5,
    name: "Дизайн интерфейсов",
    slug: "ui-ux-design",
    is_active: true,
    created_at: "2025-02-02T08:15:00Z"
  }
]
