import { Box, Button, Stack, Typography } from "@mui/material"
import type { FormEventHandler, ReactNode } from "react"
import { COLORS_TOKENS } from "./tokens"

interface Props {
  children: ReactNode
  isPendingSubmit?: boolean
  error?: string
  onCancel: () => void
  onSubmit: FormEventHandler<HTMLFormElement>
}

export const Form = ({ children, isPendingSubmit, error, onCancel, onSubmit }: Props) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    onSubmit(event)
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack>
        {children}
      </Stack>

      {error && (
        <Typography
          sx={{
            color: COLORS_TOKENS.system.error,
            fontSize: '14px',
            textAlign: 'right',
            mb: '12px',
          }}
        >{error}</Typography>
      )}

      <Stack direction="row" spacing={1.5} justifyContent="flex-end">
        <Button disabled={isPendingSubmit} onClick={onCancel} size="large" color="secondary" variant="contained" sx={{
          backgroundColor: COLORS_TOKENS.dark.primary
        }}>Отмена</Button>
        <Button loading={isPendingSubmit} type="submit" color="secondary" variant="contained" sx={{
          backgroundColor: COLORS_TOKENS.accent.dark
        }}>Сохранить</Button>
      </Stack>
    </Box>
  )
}
