import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Grid from "@mui/material/Grid";

interface RelatorioPessoaItem {
  pessoa: string;
  receitas: number;
  despesas: number;
}

const dadosMockados: RelatorioPessoaItem[] = [
  { pessoa: "João Silva", receitas: 3000, despesas: 500 },
  { pessoa: "Maria Souza", receitas: 0, despesas: 200 },
  { pessoa: "Carlos Lima", receitas: 1800, despesas: 1200 },
];

export default function RelatorioPessoa() {
  const totalReceitas = dadosMockados.reduce(
    (acc, item) => acc + item.receitas,
    0
  );

  const totalDespesas = dadosMockados.reduce(
    (acc, item) => acc + item.despesas,
    0
  );

  const saldoGeral = totalReceitas - totalDespesas;

  return (
    <Box>
      {/* Título */}
      <Typography variant="h5" mb={3}>
        Relatório por Pessoa
      </Typography>

      {/* Cards de resumo */}
      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Total de Receitas
              </Typography>
              <Typography variant="h6" color="success.main">
                R$ {totalReceitas.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Total de Despesas
              </Typography>
              <Typography variant="h6" color="error.main">
                R$ {totalDespesas.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Saldo
              </Typography>
              <Typography
                variant="h6"
                color={saldoGeral >= 0 ? "success.main" : "error.main"}
              >
                R$ {saldoGeral.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabela */}
      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Pessoa</strong></TableCell>
                <TableCell><strong>Receitas</strong></TableCell>
                <TableCell><strong>Despesas</strong></TableCell>
                <TableCell><strong>Saldo</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {dadosMockados.map((item) => {
                const saldo = item.receitas - item.despesas;

                return (
                  <TableRow key={item.pessoa}>
                    <TableCell>{item.pessoa}</TableCell>
                    <TableCell sx={{ color: "success.main" }}>
                      R$ {item.receitas.toFixed(2)}
                    </TableCell>
                    <TableCell sx={{ color: "error.main" }}>
                      R$ {item.despesas.toFixed(2)}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: saldo >= 0 ? "success.main" : "error.main",
                        fontWeight: 500,
                      }}
                    >
                      R$ {saldo.toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })}

              {/* Total geral */}
              <TableRow sx={{ backgroundColor: "#F1F5F9" }}>
                <TableCell><strong>Total Geral</strong></TableCell>
                <TableCell>
                  <strong>R$ {totalReceitas.toFixed(2)}</strong>
                </TableCell>
                <TableCell>
                  <strong>R$ {totalDespesas.toFixed(2)}</strong>
                </TableCell>
                <TableCell>
                  <strong>R$ {saldoGeral.toFixed(2)}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}