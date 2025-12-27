import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Button,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import AppInput from "../../components/common/AppInput";
import type { Finalidade } from "../../types/Categoria";

interface CategoriaFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (categoria: {
    descricao: string;
    finalidade: Finalidade;
  }) => void;
}

export default function CategoriaForm({
  open,
  onClose,
  onSave,
}: CategoriaFormProps) {
  const [descricao, setDescricao] = useState("");
  const [finalidade, setFinalidade] = useState<Finalidade>("DESPESA");

  const handleSave = () => {
    if (!descricao) return;

    onSave({ descricao, finalidade });
    setDescricao("");
    setFinalidade("DESPESA");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Nova Categoria</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <AppInput
            label="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <AppInput
            select
            label="Finalidade"
            value={finalidade}
            onChange={(e) =>
              setFinalidade(e.target.value as Finalidade)
            }
          >
            <MenuItem value="DESPESA">Despesa</MenuItem>
            <MenuItem value="RECEITA">Receita</MenuItem>
            <MenuItem value="AMBAS">Ambas</MenuItem>
          </AppInput>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}