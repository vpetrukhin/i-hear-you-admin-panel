import { Block } from "@/shared/ui/Block"
import { Page } from "@/widgets/Page"
import { PageContent } from "@/widgets/PageContent"
import { Sidebar } from "@/widgets/Sidebar"
import { Stack, Typography } from "@mui/material"
import { Step } from "./Step"

export const BotSettingsPage = () => {
  const handleEditStep = (step: number) => {
    console.log(step);
  }

  return (
    <Page>
      <Sidebar />
      <PageContent>
        <Block>
          <Typography
            variant="h2"
            align="left"
            color="#2B2735"
            sx={{
              fontSize: '28px',
              fontWeight: 600,
            }}
          >Сценарий</Typography>
          <Stack spacing={3}>
            <Step step={1} title='Выбор контекста' onEdit={handleEditStep} />
            <Step step={2} title='Выбор категории' onEdit={handleEditStep} />
            <Step step={3} title='Выбор темы' onEdit={handleEditStep} />
          </Stack>
        </Block>
      </PageContent>
    </Page>

  )
}
