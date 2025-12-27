import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flex={1}>
        <Header />
        <Box p={3}>{children}</Box>
      </Box>
    </Box>
  );
}