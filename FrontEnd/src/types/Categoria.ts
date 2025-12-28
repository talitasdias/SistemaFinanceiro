export type Finalidade = "DESPESA" | "RECEITA" | "AMBAS";

export interface Categoria {
  id: number;
  descricao: string;
  finalidade: Finalidade;
}
