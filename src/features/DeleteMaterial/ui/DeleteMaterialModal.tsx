import { ModalWrapper } from "@/shared/ui/ModalWrapper"
import { Box, Button, Typography } from "@mui/material"

interface Props {
  isOpen: boolean
  isDeletePending?: boolean
  materialName: string
  onClose: () => void
  onDeleteMaterial: () => void
}

export const DeleteMaterialModal = ({ isOpen, isDeletePending, materialName, onClose, onDeleteMaterial }: Props) => {

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Удаление файла"
    >
      <Typography
        sx={{
          color: "#2B2735",
          fontSize: "20px",
          lineHeight: "140%",
          fontWeight: "400",
          mb: "44px",
        }}
      >
        Вы уверены, что хотите удалить файл «{materialName}»? После удаления файл больше не будет доступен в боте
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "12px",
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            paddng: "8px 22px",
            color: "#FFFFFF",
            fontSize: "15px",
            lineHeight: "26px",
            fontWeight: "500",
            backgroundColor: "#2B2735",
            borderRadius: "px",
            textTransform: "uppercase",
          }}
        >
          Отмена
        </Button>
        <Button
          loading={isDeletePending}
          onClick={onDeleteMaterial}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            paddng: "8px 22px",
            color: "#FFFFFF",
            fontSize: "15px",
            lineHeight: "26px",
            fontWeight: "500",
            backgroundColor: "#FF3333",
            borderRadius: "px",
            textTransform: "uppercase",
          }}
        >
          Удалить
        </Button>
      </Box>
    </ModalWrapper>
  )
}
