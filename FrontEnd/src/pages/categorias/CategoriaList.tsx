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
import { useEffect, useState } from "react";
import CategoriaForm from "./CategoriaForm";
import type { Categoria } from "../../types/Categoria";
import { categoriaService } from "../../services/categoriaService";

export default function CategoriaList() {
  const [openForm, setOpenForm] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Paginação
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  async function carregarCategorias() {
    setLoading(true);

    try {
      const result = await categoriaService.listar(page, pageSize);

      setCategorias(result.data);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Erro ao carregar categorias", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarCategorias();
  }, [page]);

  const handleAddCategoria = async (
    novaCategoria: Omit<Categoria, "id">
  ) => {
    try {
      await categoriaService.criar(novaCategoria);
      setOpenForm(false);
      carregarCategorias(); // 🔹 garante consistência
    } catch (error) {
      console.error("Erro ao criar categoria", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await categoriaService.deletar(id);
      carregarCategorias(); // 🔹 recarrega página atual
    } catch (error) {
      console.error("Erro ao deletar categoria", error);
    }
  };

  if (loading) {
    return <Typography>Carregando...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Categorias
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <Button
          variant="contained"
          onClick={() => setOpenForm(true)}
        >
          Nova Categoria
        </Button>

        <TextField
          size="small"
          placeholder="Buscar Categoria"
          disabled
        />
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
                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDelete(categoria.id)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {categorias.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    Nenhuma categoria encontrada
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 🔹 Paginação simples (temporária) */}
      <Box
        display="flex"
        justifyContent="flex-end"
        gap={1}
        mt={2}
      >
        <Button
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Anterior
        </Button>

        <Typography>
          Página {page} de {totalPages}
        </Typography>

        <Button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Próxima
        </Button>
      </Box>

      <CategoriaForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={handleAddCategoria}
      />
    </Box>
  );
}
