import { Block } from "@/shared/ui/Block"
import { EditIcon, TrashIcon } from "@/shared/ui/icons"
import { Stack, Chip, Typography, IconButton } from "@mui/material"

interface Props {
  step: number
  title: string

  onEdit?: (step: number) => void
  onDelete?: (step: number) => void
}

export const Step = ({ step, title, onEdit, onDelete }: Props) => {

  const handleEditClick = () => {
    onEdit?.(step)
  }
  const handleDeleteClick = () => {
    onDelete?.(step)
  }

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
          (onDelete || onEdit) && (
            <Stack direction={'row'}>
              {onEdit && (
                <IconButton onClick={handleEditClick}>
                  <EditIcon />
                </IconButton>
              )}
              {onDelete && (
                <IconButton onClick={handleDeleteClick}>
                  <TrashIcon />
                </IconButton>
              )}
            </Stack>
          )
        }
      </Stack>
    </Block>
  )
}
