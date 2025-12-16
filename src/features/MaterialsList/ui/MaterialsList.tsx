import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import { columns, formatDate } from "../utils";
import {
  MATERIALS_FRONT_URL_MAP,
  materialService,
  type MaterialType,
  useCreateMaterialMutation,
} from "@/entities/Materials";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useModal from "@/shared/hooks/useModal";
import { ModalWrapper } from "@/shared/ui/ModalWrapper";
import useNotification from "@/shared/hooks/useNotification";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { Notification } from "@/shared/ui/Notification";
import { FileUploader } from "react-drag-drop-files";
import { UploadIcon } from "./UploadIcon";
import type {
  MaterialCategoryType,
  MaterialTopicType,
} from "@/entities/Materials/types";
import { CreateMaterialForm } from "./CreateMaterialForm";
import { mapMimeToFileType } from "@/shared/lib/mapMimeToFileType";

export interface CreateFormStateType {
  file: File | File[] | null;
  name: string;
  fileLink: string;
  description: string;
  category: MaterialCategoryType | null;
  topic: MaterialTopicType | null;
  paths: number[];
}

const defaultFormState = {
  file: null,
  fileLink: "",
  name: "",
  description: "",
  category: null,
  topic: null,
  paths: [],
};

export const MaterialsList = () => {
  const queryClient = useQueryClient();
  const { isOpen, openModal, closeModal } = useModal();
  const createFileModal = useModal()
  const { isNotificationOpen, showNotification } = useNotification();
  const [selectedFile, setSelecteFile] = useState<MaterialType | null>(null);
  const [formState, setFormState] = useState<CreateFormStateType>(
    defaultFormState,
  );

  const notification = useNotification();

  const {
    data: files = [],
    isLoading,
    error,
  } = useQuery<MaterialType[], Error>({
    queryKey: ["materials"],
    queryFn: () => materialService.listRequest(),
  });

  const createMutation = useCreateMaterialMutation();

  const deleteMutation = useMutation({
    mutationFn: (id: number) => materialService.deleteFile(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      alert(error.message || "Ошибка при удалении файла");
    },
  });

  const handleClickDelete = (file: MaterialType) => {
    setSelecteFile(file);
    openModal();
  };
  const handleDelete = () => {
    if (!selectedFile) {
      return
    }

    deleteMutation.mutate(selectedFile?.id);
    closeModal();
    showNotification();
  };

  const handleDownload = (file: MaterialType) => {
    const link = document.createElement("a");
    link.href = file.file;
    link.download = file.name || "";
    link.target = "_blank"; // для кроссдоменности
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (file: File | File[]) => {
    setFormState((prev) => ({ ...prev, file }));
  };

  const handleCreateModalClose = () => {
    createFileModal.closeModal()
    setFormState(defaultFormState);
  };

  const handleCreateSubmit = (ev: FormEvent) => {
    ev.preventDefault();

    const file = Array.isArray(formState.file)
      ? formState.file[0]
      : formState.file;


    const formData = new FormData();

    // файл
    if (file) {
      formData.append('file', file);
      formData.append('file_type', mapMimeToFileType(file.type));
    }

    if (formState.fileLink) {
      formData.append('external_url', formState.fileLink);
      formData.append('file_type', 'LINK');
    }
    // простые поля
    formData.append('name', formState.name);
    formData.append('is_active', 'false');

    // массивы / связи — как JSON
    formData.append(
      'categories',
      JSON.stringify(
        formState.category?.id ? [formState.category.id] : []
      )
    );

    formData.append(
      'topics',
      JSON.stringify(
        formState.topic?.id ? [formState.topic.id] : []
      )
    );

    formData.append(
      'paths',
      JSON.stringify(formState.paths ?? [])
    );

    // fileCreate
    createMutation.mutate(formData)
    //
    notification.showNotification();
    handleCreateModalClose();
  };

  const changeFormState = (newState: Partial<CreateFormStateType>) => {
    setFormState((prev) => ({ ...prev, ...newState }));
  };

  const handleFileLinkChange = (ev: ChangeEvent<HTMLInputElement>) => {
    changeFormState({ fileLink: ev.target.value });
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error.message}</Typography>;

  return (
    <Stack sx={{ width: "100%" }} direction={"column"}>
      <Box sx={{ width: "100%", backgroundColor: "#FFFFFF", p: "20px" }}>
        <Stack flexDirection="row" justifyContent="space-between" sx={{
          mb: "24px",
        }}>
          <Typography
            align="left"
            color="#2B2735"
            variant="h1"
            sx={{
              mb: "24px",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "150%",
            }}
          >
            Загрузка контента
          </Typography>

          <Button onClick={createFileModal.openModal} variant="contained" size="small" sx={{
            backgroundColor: "#7751FF",
          }}>Создать</Button>

        </Stack>

        <ModalWrapper
          isOpen={createFileModal.isOpen}
          onClose={handleCreateModalClose}
        >
          <Typography
            variant="h6"
            sx={{
              marginBottom: "24px",
            }}
          >
            Добавление файла
          </Typography>
          <Stack
            sx={{
              padding: "16px",
            }}
          >
            {formState.file ? (
              <>
                <Typography variant="body1">
                  {Array.isArray(formState.file)
                    ? formState.file[0].name
                    : formState.file?.name}
                </Typography>
                <Typography>
                  {Array.isArray(formState.file)
                    ? formState.file[0].size
                    : formState.file?.size}кб • Загрузка завершена
                </Typography>
              </>
            ) : !formState.fileLink && (
              <FileUploader
                handleChange={handleFileUpload}
                name="file"
                types={["JPG", "SVG", "PNG", "GIF"]}
              >
                <Box
                  sx={{
                    border: "1px dashed grey",
                    padding: "24px 0",
                    cursor: "pointer",
                  }}
                >
                  <Stack flexDirection="column" alignItems="center">
                    <UploadIcon width={40} height={40} />
                    <Stack direction="row" spacing={0.5}>
                      <Typography
                        sx={{
                          color: "#7751FF",
                        }}
                      >
                        Загрузите
                      </Typography>
                      <Typography>или перетащите файлы сюда</Typography>
                    </Stack>
                    <Typography color="textDisabled">
                      SVG, PNG, JPG or GIF (max. 3MB)
                    </Typography>
                  </Stack>
                </Box>
              </FileUploader>
            )}

            {!formState.file && !formState.fileLink && (
              <Typography textAlign="center">или вы можете ввести ссылку на файл</Typography>
            )}

            {!formState.file && (
              <TextField
                variant="standard"
                onChange={handleFileLinkChange}
                label="Ссылка на файл"
                value={formState.fileLink}
              />
            )}
          </Stack>
          <CreateMaterialForm
            isCreatePending={createMutation.isPending}
            formState={formState}
            changeFormState={changeFormState}
            onCancel={handleCreateModalClose}
            onSubmit={handleCreateSubmit}
          />
        </ModalWrapper>
        <Notification
          isOpen={notification.isNotificationOpen}
          text={"Файл добавлен"}
          type={"success"}
        />
      </Box>
      <Box sx={{ width: "100%", backgroundColor: "#FFFFFF", p: "20px", mt: "32px" }}>
        <Typography
          align="left"
          color="#2B2735"
          variant="h1"
          sx={{
            mb: "24px",
            fontSize: "24px",
            fontWeight: "700",
            lineHeight: "150%",
          }}
        >
          Загруженный контент
        </Typography>

        <TableContainer sx={{}}>
          <Table sx={{ border: "none" }}>
            <TableHead
              sx={{
                backgroundColor: "#FAF9FD",
                textTransform: "uppercase",
              }}
            >
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    sx={{
                      fontSize: "14px",
                      lineHeight: "140%",
                      fontWeight: "600",
                      color: "#686868",
                      border: "none",
                      p: "8px 12px 8px 12px",
                    }}
                    key={column.title}
                  >
                    {column.title}
                  </TableCell>
                ))}
                <TableCell
                  sx={{
                    border: "none",
                  }}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file.id}>
                  <TableCell
                    sx={{
                      color: "#2B2735",
                      fontSize: "14px",
                      lineHeight: "140%",
                      fontWeight: "500",
                      p: "16px 12px 20px 12px",
                      borderBottom: "1px solid #E3E3E3",
                    }}
                  >
                    <Link
                      href={`${MATERIALS_FRONT_URL_MAP.list}/${file.id}`}
                      color="#2B2735"
                      sx={{ textDecoration: "none" }}
                    >
                      {file.name}
                    </Link>
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#2B2735",
                      fontSize: "14px",
                      lineHeight: "140%",
                      fontWeight: "500",
                      p: "16px 12px 20px 12px",
                      borderBottom: "1px solid #E3E3E3",
                    }}
                  >
                    {file.categories.map((category, index) => (
                      <Typography
                        key={category.id || index}
                        sx={{
                          color: "#2B2735",
                          fontSize: "14px",
                          lineHeight: "140%",
                          fontWeight: "500",
                        }}
                      >
                        {category.name}
                        {index < file.categories.length - 1 ? ", " : ""}
                      </Typography>
                    ))}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#2B2735",
                      fontSize: "14px",
                      lineHeight: "140%",
                      fontWeight: "500",
                      p: "16px 12px 20px 12px",
                      borderBottom: "1px solid #E3E3E3",
                    }}
                  >
                    {file.file_type}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#2B2735",
                      fontSize: "14px",
                      lineHeight: "140%",
                      fontWeight: "500",
                      p: "16px 12px 20px 12px",
                      borderBottom: "1px solid #E3E3E3",
                    }}
                  >
                    {formatDate(file.created_at)}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#2B2735",
                      fontSize: "14px",
                      lineHeight: "140%",
                      fontWeight: "500",
                      p: "16px 12px 20px 12px",
                      borderBottom: "1px solid #E3E3E3",
                    }}
                  >
                    {file.is_active ? "Активный" : "Не активный"}
                  </TableCell>
                  <TableCell
                    sx={{
                      p: "16px",
                      width: "100px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <IconButton
                        aria-label="скачать"
                        onClick={() => handleDownload(file)}
                        sx={{
                          color: "#2B2735",
                          p: "0",
                          width: "24px",
                          height: "24px",
                        }}
                      >
                        <DownloadIcon />
                      </IconButton>
                      <IconButton
                        aria-label="удалить"
                        onClick={() => handleClickDelete(file)}
                        sx={{
                          color: "#2B2735",
                          p: "0",
                          width: "24px",
                          height: "24px",
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {files.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Файлы не найдены
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <ModalWrapper
          isOpen={isOpen}
          onClose={closeModal}
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
            Вы уверены, что хотите удалить файл {selectedFile?.name}? После удаления файл больше не будет доступен в боте
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
              onClick={closeModal}
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
              onClick={() => handleDelete()}
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

        <Notification
          type="success"
          text="Файл удалён"
          isOpen={isNotificationOpen}
        />
      </Box>
    </Stack>
  );
};
