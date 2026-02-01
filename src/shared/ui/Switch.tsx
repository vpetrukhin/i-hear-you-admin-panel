import { Switch as MUSwitch, Stack, Typography } from "@mui/material";

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
}

export const Switch = ({ value, onChange, label }: Props) => {
  console.log("Switch props:", { value, onChange, label });
  return (
    <Stack direction="row" alignItems="center">
      <MUSwitch checked={value} onChange={(e) => onChange(e.target.checked)} />
      <Typography>{label}</Typography>
    </Stack>
  );
};
