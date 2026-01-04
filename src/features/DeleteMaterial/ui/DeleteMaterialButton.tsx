import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteMaterialModal } from "./DeleteMaterialModal";
import useModal from "@/shared/hooks/useModal";
import type { MaterialType } from "@/entities/Materials";
import { useDeleteMaterial } from "../lib/useDeleteMutation";
import useNotification from "@/shared/hooks/useNotification";
import { Notification } from "@/shared/ui/Notification";

interface Props {
  material: MaterialType
}

export const DeleteMaterialButton = ({ material }: Props) => {
  const { isOpen, closeModal, openModal } = useModal()
  const successNotification = useNotification();
  const errorNotification = useNotification();

  const deleteMutation = useDeleteMaterial({
    onError: () => {
      closeModal()
      errorNotification.showNotification()
    }
  });

  const handleDeleteMaterial = async () => {
    await deleteMutation.mutateAsync(material.id)

    successNotification.showNotification()
    closeModal()
  }

  return (
    <>
      <IconButton
        aria-label="удалить"
        onClick={openModal}
        sx={{
          color: "#2B2735",
          p: "0",
          width: "24px",
          height: "24px",
        }}
      >
        <DeleteIcon />
      </IconButton>
      <DeleteMaterialModal isDeletePending={deleteMutation.isPending} materialName={material.name} isOpen={isOpen} onClose={closeModal} onDeleteMaterial={handleDeleteMaterial} />
      <Notification
        text="Файл удалён"
        isOpen={successNotification.isNotificationOpen}
        type="success"
      />
      <Notification
        text="Ошибка при удалении файла"
        isOpen={errorNotification.isNotificationOpen}
        type="error"
      />
    </>
  )
}
