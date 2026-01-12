import { Block } from "@/shared/ui/Block";
import { COLORS_TOKENS } from "@/shared/ui/tokens";
import { Button, Stack, Typography } from "@mui/material";

interface Props {
  material: {
    name: string;
    size: number;
  };
  onResetFile?: () => void;
}

export const MaterialFilePreview = ({ material, onResetFile }: Props) => {
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
            {material.name}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              color: "rgba(0, 0, 0, 0.6)",
            }}
          >
            {material.size}кб
          </Typography>
        </Stack>
        {onResetFile && (
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
