import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Cadastrar from "./pages/cadastrar";
import Login from "./pages/login";
import Forum from "./pages/page-forum/forum";
import EditarPerfil from "./pages/perfil";

export default function App() {
  return (
    <div className="w-full h-screen font-inter">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastrar" element={<Cadastrar />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/perfil" element={<EditarPerfil />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
