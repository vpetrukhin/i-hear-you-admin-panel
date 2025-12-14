import { COLORS_TOKENS } from "@/shared/ui/tokens"
import { Chip, Skeleton, Stack, Typography } from "@mui/material"
import { getPluralValue } from "../lib/getPluralValue"
import { Block } from "@/shared/ui/Block"

interface Props {
  title: string
  value: number
  isLoading?: boolean
}

export const StatisticValue = ({ title, value, isLoading }: Props) => {
  return (
    <Block variant="secondary" sx={{
    }}>
      <Stack spacing={1} alignItems="flex-start">
        <Chip sx={{ backgroundColor: COLORS_TOKENS.accent.light, fontWeight: 600, fontSize: '12px' }} size="medium" label={title} />
        <Typography sx={{
          fontSize: '28px',
          fontWeight: 600,
        }}>
          {isLoading ? <Skeleton variant="rectangular" width={154} height={40} sx={{
            backgroundColor: COLORS_TOKENS.light.tertiary,
          }} /> : getPluralValue(value)}
        </Typography>
      </Stack>
    </Block>
  )
}
