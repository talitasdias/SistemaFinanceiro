// src/services/categoriaService.ts
import { api } from "./api";
import type { Categoria } from "../types/Categoria";
import {
  mapFinalidadeEnumToLabel,
  mapFinalidadeLabelToEnum,
} from "../utils/finalidadeMapper";

export interface CategoriaPaginada {
  data: Categoria[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}

export const categoriaService = {
  listar: async (
  page: number,
  pageSize: number
): Promise<{
  data: Categoria[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}> => {
  const response = await api.get<any[]>("/Categorias", {
    params: {
      PageNumber: page,
      PageSize: pageSize,
    },
  });

  const data = response.data.map((categoria) => ({
    id: categoria.id,
    descricao: categoria.descricao,
    finalidade: mapFinalidadeEnumToLabel(categoria.finalidade),
  }));

  // 🔹 Header vem como string
  const paginationHeader = response.headers["x-pagination"];

  if (!paginationHeader) {
    throw new Error("Header x-pagination não encontrado");
  }

  const rawPagination = JSON.parse(paginationHeader);

  const pagination = {
    currentPage: rawPagination.CurrentPage,
    pageSize: rawPagination.PageSize,
    totalCount: rawPagination.TotalCount,
    totalPages: rawPagination.TotalPages,
    hasNext: rawPagination.HasNext,
    hasPrevious: rawPagination.HasPrevious,
  };

  return {
    data,
    pagination,
  };
},

  criar: async (
    categoria: Omit<Categoria, "id">
  ): Promise<Categoria> => {
    const payload = {
      descricao: categoria.descricao,
      finalidade: mapFinalidadeLabelToEnum(categoria.finalidade),
    };

    const response = await api.post<any>("/Categorias", payload);

    return {
      id: response.data.id,
      descricao: response.data.descricao,
      finalidade: mapFinalidadeEnumToLabel(response.data.finalidade),
    };
  },

  deletar: async (id: number): Promise<void> => {
    await api.delete(`/Categorias/${id}`);
  },
};
