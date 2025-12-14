import { useQuery } from "@tanstack/react-query"
import { getStatistics } from "../api/staticticApi"

interface Statistic {
  dau: number,
  wau: number,
  mau: number,
  newUsersLastWeek: number,
  topContentLastWeek: {
    title: string
    id: number
    count: number
  }[],
}

export const useStatistic = () => {
  return useQuery<Statistic, Error, Statistic, [string]>({
    queryKey: ['statistics'],
    queryFn: async () => {
      const data = await getStatistics()

      return {
        dau: data.dau,
        mau: data.mau,
        wau: data.wau,
        newUsersLastWeek: data.new_users_last_week,
        topContentLastWeek: data.top_content_last_week.map((item) => ({
          title: item.content_file__name,
          id: item.content_file_id,
          count: item.view_count,
        }))
      }
    }
  })
}
