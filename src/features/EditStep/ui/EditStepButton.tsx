import { EditIcon, PlusIcon, TrashIcon } from "@/shared/ui/icons"
import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material"
import useModal from "@/shared/hooks/useModal"
import { ModalWrapper } from "@/shared/ui/ModalWrapper"
import type { StepDataType } from "../model/getStepData"
import { useForm } from "@tanstack/react-form"
import { Notification } from "@/shared/ui/Notification"
import useNotification from "@/shared/hooks/useNotification"

interface Props {
  step: number
  stepData: StepDataType
  isSavePending?: boolean
  isSaveError?: boolean
  onSave: (updateData: StepDataType) => Promise<void>
}

export const EditStepButton = ({ step, stepData, isSaveError, isSavePending, onSave }: Props) => {
  const stepNotification = useNotification()
  const modal = useModal()

  const { Field, handleSubmit, reset } = useForm({
    defaultValues: {
      name: stepData.name,
      message: stepData.message,
      variants: stepData.variants
    },
    onSubmit: async ({ value }) => {
      await onSave(value)

      modal.closeModal()
      stepNotification.showNotification()
    }
  })

  const handleClick = () => {
    modal.openModal()
  }

  const handleModalClose = () => {
    modal.closeModal()
  }

  const handleCancel = () => {
    reset()
    modal.closeModal()
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <EditIcon />
      </IconButton>

      <ModalWrapper title={'Редактирование шага'} isOpen={modal.isOpen} onClose={handleModalClose}>
        <Box component="form" onSubmit={(evt) => {
          evt.preventDefault()
          handleSubmit()
        }}>
          <Stack spacing={2}>
            <Field
              name='name'
              children={
                ({ state, handleChange }) => (
                  <TextField slotProps={{
                    htmlInput: {
                      readOnly: true
                    }
                  }} onChange={(evt) => handleChange((evt.target.value))} defaultValue={state.value} label="Название шага" variant="standard" />
                )
              }
            />
            <Field
              name='message'
              children={
                ({ state, handleChange }) => (
                  <TextField slotProps={{
                    htmlInput: {
                      readOnly: true
                    }
                  }} onChange={(evt) => handleChange(evt.target.value)} id="step-name" defaultValue={state.value} label="Сообщение от бота" variant="standard" />
                )
              }
            />

            <Stack spacing={2}>
              <Typography sx={{
                fontSize: '14px',
                fontWeight: 600,
              }}>Варианты ответа</Typography>
              <Field name="variants" mode="array">
                {(field) => {
                  return (
                    <Stack spacing={2}>
                      <Stack spacing={3} pl={2.5}>
                        {field.state.value.map((_, i) => {
                          return (
                            <Field key={i} name={`variants[${i}].value`}>
                              {(subField) => {
                                return (
                                  <Stack spacing={2.5} direction="row">
                                    <TextField variant="standard" sx={{ flexGrow: 1 }} value={subField.state.value} label="Текст кнопки" onChange={(evt) => subField.handleChange(evt.target.value)} />
                                    <IconButton onClick={() => {
                                      field.removeValue(i)
                                    }}>
                                      <TrashIcon />
                                    </IconButton>
                                  </Stack>
                                )
                              }}
                            </Field>
                          )
                        })}
                      </Stack>
                      <Button size='large' sx={{
                        color: '#7751FF',
                        alignSelf: 'self-start',
                      }} onClick={() => {
                        field.pushValue({
                          id: String(field.state.value.length + 1),
                          value: '',
                        })
                      }
                      }>
                        <Stack direction={'row'} alignItems="center" spacing={0.5}>
                          <Typography fontSize={'18px'}>Добавить вариант ответа</Typography>
                          <PlusIcon />
                        </Stack>
                      </Button>
                    </Stack>
                  )
                }}
              </Field>
              {isSaveError &&
                <Typography textAlign="right" color="error">При изменении шага произошла ошибка</Typography>
              }
              <Stack direction="row" spacing={1.5} justifyContent="flex-end">
                <Button onClick={handleCancel} size="large" color="secondary" variant="contained" sx={{
                  backgroundColor: '#2B2735'
                }}>Отмена</Button>
                <Button loading={isSavePending} type="submit" color="secondary" variant="contained" sx={{
                  backgroundColor: '#7751FF'
                }}>Сохранить</Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </ModalWrapper>
      <Notification
        type="success"
        text={`Шаг ${step} изменен`}
        isOpen={stepNotification.isNotificationOpen}
      />
    </>
  )
}
