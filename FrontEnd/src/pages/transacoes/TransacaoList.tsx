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
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import TransacaoForm from "./TransacaoForm";
import type { Transacao } from "../../types/Transacao";

export default function TransacaoList() {
  const [openForm, setOpenForm] = useState(false);

  const [transacoes, setTransacoes] = useState<Transacao[]>([
    {
      id: 1,
      descricao: "Mercado",
      valor: 150,
      tipo: "DESPESA",
      categoriaId: 1,
      categoriaDescricao: "Alimentação",
      pessoaId: 1,
      pessoaNome: "Talita",
    },
  ]);

  const handleAddTransacao = (nova: any) => {
    setTransacoes((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ...nova,
        categoriaDescricao: "Mock",
        pessoaNome: "Mock",
      },
    ]);
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Transações
      </Typography>

      <Box mb={3}>
        <Button
          variant="contained"
          onClick={() => setOpenForm(true)}
        >
          Nova Transação
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Descrição</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Pessoa</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>

            <TableBody>
              {transacoes.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.descricao}</TableCell>
                  <TableCell>{t.tipo}</TableCell>
                  <TableCell>
                    {t.valor.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {t.categoriaDescricao}
                  </TableCell>
                  <TableCell>{t.pessoaNome}</TableCell>
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

      <TransacaoForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={handleAddTransacao}
      />
    </Box>
  );
}