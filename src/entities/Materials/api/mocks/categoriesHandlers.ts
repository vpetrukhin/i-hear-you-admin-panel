import type { Handlers } from "@/shared/lib/mocks";
import { delay, http, HttpResponse } from "msw";
import { CATEGORIES_API_URL_MAP } from "../urls";
import { categoryMockList } from "./mockData/category";

export const getCategoriesHandlers = (): Handlers => [
  http.get(CATEGORIES_API_URL_MAP.list, () => {
    return HttpResponse.json(categoryMockList)
  }),
  http.delete(CATEGORIES_API_URL_MAP.delete(':id'), async (info) => {
    await delay(2000)

    return HttpResponse.json(info.params?.id)
  }),
  http.post(CATEGORIES_API_URL_MAP.create, async (info) => {
    const newCategory = await info.request.clone().json()

    await delay(2000)

    return HttpResponse.json(newCategory)
  }),
  http.patch(CATEGORIES_API_URL_MAP.update(':id'), async (info) => {
    const updateCategory = await info.request.clone().json()
    const updateCategoryId = info.params?.id

    await delay(2000)

    return HttpResponse.json({
      id: updateCategoryId,
      ...updateCategory,
    })
  })
]
