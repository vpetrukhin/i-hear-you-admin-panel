import { request } from "@/shared/api/axios"

export const STATISTIC_API_URL_MAP = {
  getStatistics: "/api/statistics",
} as const

interface StatisticApiDTO {
  dau: number,
  wau: number,
  mau: number,
  new_users_last_week: number,
  top_content_last_week: {
    content_file__name: string
    content_file_id: number
    view_count: number
  }[],
}

export const getStatistics = async () => {
  const { data } = await request.get<StatisticApiDTO>(STATISTIC_API_URL_MAP.getStatistics)

  return data
}
