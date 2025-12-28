import type { Finalidade } from "../types/Categoria";

export function mapFinalidadeEnumToLabel(
  valor: number
): Finalidade {
  switch (valor) {
    case 1:
      return "DESPESA";
    case 2:
      return "RECEITA";
    case 3:
      return "AMBAS";
    default:
      throw new Error("Finalidade inválida");
  }
}

export function mapFinalidadeLabelToEnum(
  valor: Finalidade
): number {
  switch (valor) {
    case "DESPESA":
      return 1;
    case "RECEITA":
      return 2;
    case "AMBAS":
      return 3;
  }
}
