import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import CategoriaForm from "./CategoriaForm";
import type { Categoria } from "../../types/Categoria";

export default function CategoriaList() {
  const [openForm, setOpenForm] = useState(false);

  const [categorias, setCategorias] = useState<Categoria[]>([
    { id: 1, descricao: "Alimentação", finalidade: "DESPESA" },
    { id: 2, descricao: "Salário", finalidade: "RECEITA" },
    { id: 3, descricao: "Conta Corrente", finalidade: "AMBAS" },
  ]);

  const handleAddCategoria = (
    novaCategoria: Omit<Categoria, "id">
  ) => {
    setCategorias((prev) => [
      ...prev,
      { id: prev.length + 1, ...novaCategoria },
    ]);
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Categorias
      </Typography>

      <Box display={'flex'} gap={2} mb={3}>
        <Button
          variant="contained"
          onClick={() => setOpenForm(true)}
        >
          Nova Categoria
        </Button>
        <TextField size="small" placeholder="Buscar Categoria" />
      </Box>

      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Descrição</strong>
                </TableCell>
                <TableCell>
                  <strong>Finalidade</strong>
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>

            <TableBody>
              {categorias.map((categoria) => (
                <TableRow key={categoria.id}>
                  <TableCell>{categoria.descricao}</TableCell>
                  <TableCell>{categoria.finalidade}</TableCell>
                  <TableCell align="right">
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CategoriaForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={handleAddCategoria}
      />
    </Box>
  );
}