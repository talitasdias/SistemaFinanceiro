export type TipoTransacao = "DESPESA" | "RECEITA";

export interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  categoriaId: number;
  categoriaDescricao: string;
  pessoaId: number;
  pessoaNome: string;
}