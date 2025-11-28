import { Block } from "@/shared/ui/Block"
import { Stack, Chip, Typography } from "@mui/material"
import type { ReactNode } from "react"

interface Props {
  step: number
  title: string

  actions?: ReactNode[]
}

export const Step = ({ step, title, actions }: Props) => {

  const chipLabel = `Шаг ${step}`
  return (
    <Block variant='secondary'>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Stack alignItems={'flex-start'} spacing={1}>
          <Chip label={chipLabel} sx={{ backgroundColor: '#2B2735', color: '#fff', fontWeight: 600 }} />
          <Typography sx={{
            fontSize: '16px',
            fontWeight: 600,
          }}>{title}</Typography>
        </Stack>
        {
          actions?.map((action) => (
            action
          ))
        }
      </Stack>
    </Block>
  )
}
