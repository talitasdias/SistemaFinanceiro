import { Routes, Route, Navigate } from "react-router-dom";

import PessoaList from "../pages/pessoas/PessoaList";
import CategoriaList from "../pages/categorias/CategoriaList";
import TransacaoList from "../pages/transacoes/TransacaoList";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/pessoas" />} />
      <Route path="/pessoas" element={<PessoaList />} />
      <Route path="/categorias" element={<CategoriaList />} />
      <Route path="/transacoes" element={<TransacaoList />} />
    </Routes>
  );
}