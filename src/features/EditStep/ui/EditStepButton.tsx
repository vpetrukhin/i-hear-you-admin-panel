import { EditIcon, TrashIcon } from "@/shared/ui/icons"
import { IconButton, Stack, TextField, Typography } from "@mui/material"
import useModal from "@/shared/hooks/useModal"
import { ModalWrapper } from "@/shared/ui/ModalWrapper"
import { useState } from "react"

export type StepDataType = {
  name: string
  message: string
  variants: {
    id: string
    value: string
  }[]
}

interface Props {
  stepData: StepDataType
}

export const EditStepButton = ({ stepData }: Props) => {
  const modal = useModal()

  const [variants, setVariants] = useState(stepData.variants)

  const handleClick = () => {
    modal.openModal()
  }

  const handleModalClose = () => {
    modal.closeModal()
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <EditIcon />
      </IconButton>

      <ModalWrapper title={'Редактирование шага'} isOpen={modal.isOpen} onClose={handleModalClose}>
        <Stack spacing={2}>
          <TextField slotProps={{
            htmlInput: {
              readOnly: true
            }
          }} id="step-name" defaultValue={stepData.name} label="Название шага" variant="standard" />
          <TextField slotProps={{
            htmlInput: {
              readOnly: true
            }
          }} id="step-name" defaultValue={stepData.message} label="Сообщение от бота" variant="standard" />

          <Stack spacing={2}>
            <Typography sx={{
              fontSize: '14px',
              fontWeight: 600,
            }}>Варианты ответа</Typography>
            <Stack spacing={3} sx={{
              pl: 2.5
            }}>
              {stepData.variants.map((variant) => (
                <Stack spacing={2.5} key={variant.id} direction="row">
                  <TextField sx={{ flexGrow: 1 }} id={variant.id} value={variant.value} label="Текст кнопки" />
                  <IconButton>
                    <TrashIcon />
                  </IconButton>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </ModalWrapper>
    </>

  )
}
