import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Button,
  MenuItem,
} from "@mui/material";
import { useMemo, useState } from "react";
import AppInput from "../../components/common/AppInput";
import type { TipoTransacao } from "../../types/Transacao";

const pessoasMock = [
  { id: 1, nome: "Talita", idade: 25 },
  { id: 2, nome: "Maria", idade: 16 },
];

const categoriasMock = [
  { id: 1, descricao: "Alimentação", finalidade: "DESPESA" },
  { id: 2, descricao: "Salário", finalidade: "RECEITA" },
  { id: 3, descricao: "Conta Corrente", finalidade: "AMBAS" },
];

interface TransacaoFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function TransacaoForm({
  open,
  onClose,
  onSave,
}: TransacaoFormProps) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState<TipoTransacao>("DESPESA");
  const [pessoaId, setPessoaId] = useState<number | "">("");
  const [categoriaId, setCategoriaId] = useState<number | "">("");

  const pessoaSelecionada = pessoasMock.find(
    (p) => p.id === pessoaId
  );

  const categoriasFiltradas = useMemo(() => {
    return categoriasMock.filter(
      (c) =>
        c.finalidade === tipo || c.finalidade === "AMBAS"
    );
  }, [tipo]);

const isMenorDeIdade = (pessoaSelecionada?.idade ?? 0) < 18;

  const handleSave = () => {
    if (
      !descricao ||
      !valor ||
      !pessoaId ||
      !categoriaId
    )
      return;

    onSave({
      descricao,
      valor: Number(valor),
      tipo,
      pessoaId,
      categoriaId,
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Nova Transação</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <AppInput
            label="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <AppInput
            select
            label="Pessoa"
            value={pessoaId}
            onChange={(e) =>
              setPessoaId(Number(e.target.value))
            }
          >
            {pessoasMock.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.nome}
              </MenuItem>
            ))}
          </AppInput>

          <AppInput
            select
            label="Tipo"
            value={tipo}
            onChange={(e) =>
              setTipo(e.target.value as TipoTransacao)
            }
          >
            <MenuItem value="DESPESA">Despesa</MenuItem>
            <MenuItem
              value="RECEITA"
              disabled={isMenorDeIdade}
            >
              Receita
            </MenuItem>
          </AppInput>

          <AppInput
            select
            label="Categoria"
            value={categoriaId}
            onChange={(e) =>
              setCategoriaId(Number(e.target.value))
            }
          >
            {categoriasFiltradas.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.descricao}
              </MenuItem>
            ))}
          </AppInput>

          <AppInput
            label="Valor"
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
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