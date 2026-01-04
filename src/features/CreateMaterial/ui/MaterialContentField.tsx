import { Box, Stack, TextField, Typography } from "@mui/material"
import type { CreateFormStateType } from "../model/types"
import { FileUploader } from "react-drag-drop-files"
import { ALL_FILE_UPLOADER_TYPES } from "../config/const";
import { UploadIcon } from "@/shared/ui/icons";
import { COLORS_TOKENS } from "@/shared/ui/tokens";
import type { ChangeEvent } from "react";

interface Props {
  formState: CreateFormStateType
  changeFormState: (newState: Partial<CreateFormStateType>) => void;
}

export const MaterialContentField = ({ formState, changeFormState }: Props) => {
  const handleFileUpload = (file: File | File[]) => {
    changeFormState({ file })
  };

  const handleFileLinkChange = (ev: ChangeEvent<HTMLInputElement>) => {
    changeFormState({ fileLink: ev.target.value });
  };

  return (
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
          types={ALL_FILE_UPLOADER_TYPES}
        >
          <Box
            sx={{
              border: "1px dashed grey",
              padding: "24px 0",
              cursor: "pointer",
            }}
          >
            <Stack flexDirection="column" alignItems="center">
              <UploadIcon size="large" />
              <Stack direction="row" spacing={0.5}>
                <Typography
                  sx={{
                    color: COLORS_TOKENS.accent.dark,
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
  )
}
