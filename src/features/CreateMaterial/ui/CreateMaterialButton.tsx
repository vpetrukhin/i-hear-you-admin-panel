import { ModalWrapper } from "@/shared/ui/ModalWrapper"
import { COLORS_TOKENS } from "@/shared/ui/tokens"
import { Button } from "@mui/material"
import { CreateMaterialForm } from "./CreateMaterialForm"
import useModal from "@/shared/hooks/useModal"
import type { CreateFormStateType } from "../model/types"
import { useCreateMaterialMutation } from "@/entities/Materials"
import { getCreateMaterialFormData } from "../model/getCreateMaterialFormData"
import useNotification from "@/shared/hooks/useNotification"
import { Notification } from "@/shared/ui/Notification"

export const CreateMaterialButton = () => {
  const modal = useModal()

  const successNotification = useNotification();

  const createMaterialMutation = useCreateMaterialMutation()

  const handleOpenCreateMaterialForm = () => {
    modal.openModal()
  }

  const handleCreateMaterial = async (formState: CreateFormStateType) => {
    await createMaterialMutation.mutateAsync(getCreateMaterialFormData(formState))

    if (!createMaterialMutation.isError) {
      modal.closeModal()
      successNotification.showNotification()
    }
  }

  return (
    <>
      <Button
        onClick={handleOpenCreateMaterialForm}
        variant="contained"
        size="small"
        sx={{ backgroundColor: COLORS_TOKENS.accent.dark }}
      >
        Создать
      </Button>

      <ModalWrapper isOpen={modal.isOpen} onClose={modal.closeModal}>
        <CreateMaterialForm
          isCreateMaterialPending={createMaterialMutation.isPending}
          isCreateMaterialError={createMaterialMutation.isError}
          createMaterial={handleCreateMaterial}
          onCancelCreate={modal.closeModal}
        />
      </ModalWrapper>

      <Notification
        isOpen={successNotification.isNotificationOpen}
        text={"Файл добавлен"}
        type={"success"}
      />
    </>
  )
}
