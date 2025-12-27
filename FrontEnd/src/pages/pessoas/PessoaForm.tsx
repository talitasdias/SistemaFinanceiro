import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Button,
} from "@mui/material";
import { useState } from "react";
import AppInput from "../../components/common/AppInput";

interface PessoaFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (pessoa: { nome: string; idade: number }) => void;
}

export default function PessoaForm({
  open,
  onClose,
  onSave,
}: PessoaFormProps) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");

  const handleSave = () => {
    if (!nome || !idade) return;

    onSave({
      nome,
      idade: Number(idade),
    });

    setNome("");
    setIdade("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Nova Pessoa</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <AppInput
            label="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <AppInput
            label="Idade"
            type="number"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          />
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