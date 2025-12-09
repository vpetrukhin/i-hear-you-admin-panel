import { Block } from "@/shared/ui/Block"
import { Page } from "@/widgets/Page"
import { PageContent } from "@/widgets/PageContent"
import { Sidebar } from "@/widgets/Sidebar"
import { Stack, Typography } from "@mui/material"
import { Step } from "./Step"
import { EditStepButton, getStepData, getVariantFromCategory, getVariantFromTopic } from "@/features/EditStep"
import { useCategoriesList, useTopicsList } from "@/entities/Materials"
import { useCategoriesChange } from "../lib/useCategoriesChange"
import { useTopicChange } from "../lib/useTopicsChange"
import { usePathsQuery } from "../lib/usePathsQuery"
import { usePathsChange } from "../lib/usePathsChange"

export const BotSettingsPage = () => {
  const categoriesQuery = useCategoriesList()
  const topicsQuery = useTopicsList()
  const pathsQuery = usePathsQuery()

  const { handleCategoriesSave, isPending: isCategoryStepPending } = useCategoriesChange({ categories: categoriesQuery.data, refetch: categoriesQuery.refetch })
  const { handleTopicsSave, isPending: isTopicStepPending } = useTopicChange({ topics: topicsQuery.data, refetch: topicsQuery.refetch })
  const { handlePathsSave, isPending: isPathStepPending } = usePathsChange({ paths: pathsQuery.data, refetch: pathsQuery.refetch })


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
            <Step step={1} title='Выбор контекста' actions={[
              <EditStepButton step={1} onSave={handlePathsSave} isSavePending={isPathStepPending} stepData={
                getStepData({
                  name: 'Выбор контекста',
                  message: 'Добро пожаловать! Пожалуйста, выберите, с каким запросом Вы к нам пришли:',
                  variants: pathsQuery.data?.map((path) => ({
                    id: String(path.id),
                    name: path.name,
                  })) ?? []
                })
              } />
            ]} />
            <Step step={2} title='Выбор категории' actions={[
              <EditStepButton step={2} onSave={handleCategoriesSave} isSavePending={isCategoryStepPending} stepData={
                getStepData(
                  {
                    name: 'Выбор категории',
                    message: 'Добро пожаловать! Пожалуйста, выберите, с каким запросом Вы к нам пришли:',
                    variants: categoriesQuery.data?.map(getVariantFromCategory) ?? []
                  }
                )
              } />
            ]} />
            <Step step={3} title='Выбор темы' actions={[
              <EditStepButton step={3} onSave={handleTopicsSave} isSavePending={isTopicStepPending} stepData={getStepData({
                name: 'Выбор темы',
                message: 'Добро пожаловать! Пожалуйста, выберите, с каким запросом Вы к нам пришли:',
                variants: topicsQuery.data?.map(getVariantFromTopic) ?? []
              })} />
            ]} />
          </Stack>
        </Block>
      </PageContent>
    </Page>

  )
}
