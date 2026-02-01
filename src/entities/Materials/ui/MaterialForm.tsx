import {
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, useStore } from "@tanstack/react-form";
import { MaterialFilePreview } from "./MaterialFilePreview";
import type { MaterialType } from "../types";
import { FileUploader } from "react-drag-drop-files";
import { ALL_FILE_UPLOADER_TYPES } from "@/shared/config/const";
import { UploadIcon } from "@/shared/ui/icons";
import { COLORS_TOKENS } from "@/shared/ui/tokens";
import type { MaterialFormFields } from "../model/material";
import { Form } from "@/shared/ui/Form";
import { useCategoriesList } from "../lib/useCatgoriesListQuery";
import { useTopicsList } from "../lib/useTopicsList";
import { usePathsList } from "../lib/usePathList";
import { getMaterialFormDefaultState } from "../model/getMaterialFormDefaultState";

interface Props {
  isNew?: boolean;
  isPendingSubmit?: boolean;
  onSubmit: (data: MaterialFormFields) => void;
  onCancel: () => void;
  materialData?: MaterialType;
}

export const MaterialForm = ({
  materialData,
  isNew,
  isPendingSubmit,
  onCancel,
  onSubmit,
}: Props) => {
  const { data: categoriesList } = useCategoriesList();
  const { data: topicsList } = useTopicsList();
  const { data: pathsList } = usePathsList();

  const form = useForm({
    defaultValues: getMaterialFormDefaultState(materialData),
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });

  const handleCancel = () => {
    onCancel();
  };
  const handleSubmit = () => {
    form.handleSubmit();
  };

  const title = isNew ? "Добавление файла" : "Просмотр файла";
  const fileLinkValue = useStore(form.store, (state) => state.values.fileLink);
  const fileValue = useStore(form.store, (state) => state.values.file);
  const fileName = useStore(form.store, (state) => state.values.fileName);
  const fileSize = useStore(form.store, (state) => state.values.fileSize);

  const getIsFilePreview = (fileValue: File | File[] | null) =>
    (isNew && fileValue) || (fileName && fileSize);

  return (
    <Form
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      isPendingSubmit={isPendingSubmit}
    >
      <Typography
        sx={{
          fontSize: "28px",
          fontWeight: "600",
          color: COLORS_TOKENS.dark.primary,
          mb: "24px",
        }}
      >
        {title}
      </Typography>
      <Stack spacing={2.5}>
        <form.Field name="file">
          {(fileField) => (
            <>
              {getIsFilePreview(fileField.state.value) && (
                <MaterialFilePreview
                  file={fileField.state.value}
                  fileName={fileName}
                  fileSize={fileSize}
                  onResetFile={() => {
                    fileField.handleChange(null);
                  }}
                />
              )}

              {isNew && !fileField.state.value && (
                <FileUploader
                  handleChange={(file: File | File[]) => {
                    fileField.handleChange(file);
                  }}
                  name="file"
                  types={ALL_FILE_UPLOADER_TYPES}
                  disabled={!!fileLinkValue}
                >
                  <Box
                    sx={{
                      border: "1px dashed grey",
                      padding: "24px 0",
                      cursor: "pointer",
                      "&:hover": {
                        cursor: fileLinkValue ? "not-allowed" : "pointer",
                      },
                    }}
                  >
                    <Stack flexDirection="column" alignItems="center">
                      <UploadIcon size="large" />
                      <Stack direction="row" spacing={0.5}>
                        <Typography sx={{ color: COLORS_TOKENS.accent.dark }}>
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
            </>
          )}
        </form.Field>

        <form.Field name="fileLink">
          {(linkField) => (
            <>
              {isNew && !fileValue && !linkField.state.value && (
                <Typography textAlign="center">
                  или вы можете ввести ссылку на файл
                </Typography>
              )}

              {((isNew && !fileValue) || linkField.state.value) && (
                <TextField
                  variant="standard"
                  label="Ссылка на файл"
                  value={linkField.state.value}
                  onChange={(e) => linkField.handleChange(e.target.value)}
                />
              )}
            </>
          )}
        </form.Field>

        <form.Field name="name">
          {(field) => (
            <TextField
              variant="standard"
              label="Название файла"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <TextField
              variant="standard"
              label="Описание (необязательно)"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>

        <Stack direction="row" spacing={4}>
          <form.Field name="category">
            {(field) => (
              <TextField
                select
                variant="standard"
                label="Категория"
                sx={{ width: "100%" }}
                value={field.state.value?.[0]?.id ?? ""}
                onChange={(e) => {
                  const category = categoriesList?.find(
                    (item) => item.id === Number(e.target.value),
                  );
                  if (category) {
                    field.handleChange([category]);
                  }
                }}
              >
                {categoriesList?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </form.Field>

          <form.Field name="topic">
            {(field) => (
              <TextField
                select
                variant="standard"
                label="Тема (необязательно)"
                sx={{ width: "100%" }}
                value={field.state.value?.[0]?.id ?? ""}
                onChange={(e) => {
                  const topic = topicsList?.find(
                    (item) => item.id === Number(e.target.value),
                  );
                  if (topic) {
                    field.handleChange([topic]);
                  }
                }}
              >
                {topicsList?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </form.Field>
        </Stack>
      </Stack>
      <Typography sx={{ pt: "20px" }}>Контекст</Typography>

      <form.Field name="paths">
        {(field) => (
          <List sx={{ width: "100%", maxWidth: 360 }}>
            {pathsList?.map((value) => {
              const checked =
                field.state.value.findIndex(
                  (fieldValue) => fieldValue.id === value.id,
                ) !== -1;

              return (
                <ListItem key={value.id} disablePadding>
                  <ListItemButton
                    dense
                    onClick={() => {
                      if (checked) {
                        field.handleChange(
                          field.state.value.filter(
                            (item) => item.id !== value.id,
                          ),
                        );
                      } else {
                        field.handleChange([...field.state.value, value]);
                      }
                    }}
                  >
                    <ListItemIcon>
                      <Checkbox edge="start" checked={checked} disableRipple />
                    </ListItemIcon>
                    <ListItemText primary={value.name} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        )}
      </form.Field>

      <Typography variant="body1" color="textDisabled">
        Выберите один или оба варианта
      </Typography>
    </Form>
  );
};
