import { Box, Typography } from "@mui/material";

export default function Header() {
  const dataAtual = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Box
      height={64}
      px={3}
      display="flex"
      alignItems="center"
      borderBottom="1px solid #E2E8F0"
      bgcolor="#F3F3F3"
    >
      <Typography variant="body2" color="text.secondary">
        &gt;&gt; {dataAtual}
      </Typography>
    </Box>
  );
}