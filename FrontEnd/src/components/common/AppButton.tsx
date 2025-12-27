import { Button, type ButtonProps } from "@mui/material";

interface AppButtonProps extends ButtonProps {
  label: string;
}

export default function AppButton({ label, ...props }: AppButtonProps) {
  return (
    <Button {...props} variant="contained">
      {label}
    </Button>
  );
}