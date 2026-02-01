import { Block } from "@/shared/ui/Block";
import { COLORS_TOKENS } from "@/shared/ui/tokens";
import { Button, Stack, Typography } from "@mui/material";

interface Props {
  file: File | File[] | null;
  fileName: string;
  fileSize: string;
  onResetFile?: () => void;
}

const getNameFromFile = (file: File | File[] | null) => {
  if (!file) return "";
  if (Array.isArray(file)) return;
  return file.name;
};

const getSizeFromFile = (file: File | File[] | null) => {
  if (!file) return "";
  if (Array.isArray(file)) return;
  return file.size + "кб";
};

export const MaterialFilePreview = ({
  fileName,
  fileSize,
  file,
  onResetFile,
}: Props) => {
  const isLocalFile = file !== null;
  const name = isLocalFile ? getNameFromFile(file) : fileName;
  const size = isLocalFile ? getSizeFromFile(file) : fileSize;

  return (
    <Block variant="secondary">
      <Stack flexDirection="row" justifyContent="space-between">
        <Stack>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              color: "rgba(0, 0, 0, 0.6)",
            }}
          >
            {size}
          </Typography>
        </Stack>
        {isLocalFile && onResetFile && (
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: COLORS_TOKENS.system.error,
            }}
            onClick={onResetFile}
          >
            Сброс
          </Button>
        )}
      </Stack>
    </Block>
  );
};
