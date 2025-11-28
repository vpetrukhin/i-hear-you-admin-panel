import { Block } from "@/shared/ui/Block"
import { Page } from "@/widgets/Page"
import { PageContent } from "@/widgets/PageContent"
import { Sidebar } from "@/widgets/Sidebar"
import { Stack, Typography } from "@mui/material"
import { Step } from "./Step"
import { EditStepButton } from "@/features/EditStep"

export const BotSettingsPage = () => {

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
            <Step step={1} title='Выбор контекста' />
            <Step step={2} title='Выбор категории' actions={[
              <EditStepButton stepData={
                {
                  name: 'Выбор категории',
                  message: 'Добро пожаловать! Пожалуйста, выберите, с каким запросом Вы к нам пришли:',
                  variants: [
                    {
                      id: '1',
                      value: 'Статьи',
                    },
                    {
                      id: '2',
                      value: 'Истории',
                    }
                  ]
                }
              } />
            ]} />
            <Step step={3} title='Выбор темы' />
          </Stack>
        </Block>
      </PageContent>
    </Page>

  )
}
