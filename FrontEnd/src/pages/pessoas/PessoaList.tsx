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
import PessoaForm from "./PessoaForm";

interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

export default function PessoaList() {
  const [openForm, setOpenForm] = useState(false);

  const [pessoas, setPessoas] = useState<Pessoa[]>([
    { id: 1, nome: "Talita Dias da Silva", idade: 25 },
    { id: 2, nome: "Talita Dias da Silva", idade: 25 },
    { id: 3, nome: "Talita Dias da Silva", idade: 25 },
  ]);

  const handleAddPessoa = (novaPessoa: Omit<Pessoa, "id">) => {
    setPessoas((prev) => [
      ...prev,
      { id: prev.length + 1, ...novaPessoa },
    ]);
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Pessoas
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <Button variant="contained" onClick={() => setOpenForm(true)}>
          Nova Pessoa
        </Button>

        <TextField size="small" placeholder="Buscar Pessoa" />
      </Box>

      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Nome</strong>
                </TableCell>
                <TableCell>
                  <strong>Idade</strong>
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>

            <TableBody>
              {pessoas.map((pessoa) => (
                <TableRow key={pessoa.id}>
                  <TableCell>{pessoa.nome}</TableCell>
                  <TableCell>{pessoa.idade}</TableCell>
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

      {/* Modal */}
      <PessoaForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={handleAddPessoa}
      />
    </Box>
  );
}