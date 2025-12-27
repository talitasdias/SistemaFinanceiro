import { TextField, type TextFieldProps } from "@mui/material";

type AppInputProps = TextFieldProps & {
  label: string;
};

export default function AppInput({ label, ...props }: AppInputProps) {
  return (
    <TextField
      label={label}
      fullWidth
      variant="outlined"
      margin="normal"
      {...props}
    />
  );
}