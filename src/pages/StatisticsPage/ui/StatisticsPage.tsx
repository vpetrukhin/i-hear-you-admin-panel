import { Page } from "@/widgets/Page"
import { PageContent } from "@/widgets/PageContent"
import { Sidebar } from "@/widgets/Sidebar"
import { StatisticValue } from "./StatisticValue"
import { Chip, List, ListItem, ListItemText, Stack, Typography } from "@mui/material"
import { Block } from "@/shared/ui/Block"
import { COLORS_TOKENS } from "@/shared/ui/tokens"
import { useStatistic } from "../lib/useStatistics"

export const StatisticsPage = () => {
  const { data: statistics, isLoading } = useStatistic()

  return (
    <Page>
      <Sidebar />
      <PageContent sx={{
        flexDirection: "column",
        gap: '32px',
      }}>
        <Block>
          <Stack direction="column" spacing={3}>
            <Typography sx={{
              fontSize: '28px',
              fontWeight: 600,
              lineHeight: 1.5,
            }}>Активные пользователи</Typography>
            <Stack direction="row" justifyContent="space-between" >
              <StatisticValue title="За сутки" value={statistics?.dau ?? 0} isLoading={isLoading} />
              <StatisticValue title="За неделю" value={statistics?.wau ?? 0} isLoading={isLoading} />
              <StatisticValue title="За месяц" value={statistics?.mau ?? 0} isLoading={isLoading} />
              <StatisticValue title="Новых за неделю" value={statistics?.newUsersLastWeek ?? 0} isLoading={isLoading} />
            </Stack>

          </Stack>
        </Block>
        <Block>
          <Typography sx={{
            fontSize: '28px',
            fontWeight: 600,
            lineHeight: 1.5,
          }}>
            Популярный контент
          </Typography>
          <Block variant="secondary">
            <Stack spacing={2.5} alignItems="flex-start">
              <Chip label="Топ-5 по просмотрам за неделю " sx={{
                backgroundColor: COLORS_TOKENS.accent.light,
              }} />

              {statistics?.topContentLastWeek.length === 0 && <Typography sx={{
                width: '100%',
                textAlign: 'center'
              }}>Мало просмотров для расчета топа</Typography>}

              {statistics?.topContentLastWeek?.length !== 0 && (
                <List>
                  {statistics?.topContentLastWeek.map((item, index) => (
                    <ListItem key={item.id}>
                      <ListItemText>
                        {index + 1}. {item.title} — {item.count} просмотров
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              )}
            </Stack>
          </Block>
        </Block>
      </PageContent>
    </Page>
  )
}
