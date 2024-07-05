import { Layout } from "@/layout";
import { NotFound } from "@/page/404/not-found";
import { TodasAgendas } from "@/page/agenda/todas-agendas/todas-agendas";
import { CadastrarCliente } from "@/page/clientes/cadastrar-cliente/cadastrar-cliente";
import { DetalhesCliente } from "@/page/clientes/detalhes-cliente/detalhes-cliente";
import { EditarCliente } from "@/page/clientes/editar-cliente/editar-cliente";
import { MeusClientes } from "@/page/clientes/meus-clientes/meus-clientes";
import { TodosClientes } from "@/page/clientes/todos-clientes/todos-clientes";
import { CriarConta } from "@/page/criar-conta/criar-conta";
import { Login } from "@/page/login/login";
import { CadastrarUsuario } from "@/page/usuarios/cadastrar-usuario/cadastrar-usuario";
import { EditarUsuario } from "@/page/usuarios/editar-usuario/editar-usuario";
import { TodosUsuarios } from "@/page/usuarios/todos-usuarios/todos-usuarios";
import { useAuthStore } from "@/store/auth.store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const AppRoutes = () => {
  const user = useAuthStore((store) => store.user);

  return (
    <div className="overflow-x-hidden h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/criar-conta" element={<CriarConta />} />
          <Route
            path="/esqueci-minha-senha"
            element={
              <div>
                <p>Em construção</p>
              </div>
            }
          />
          <Route
            path="/recover-password/:token"
            element={<>RecoverPassword</>}
          />
          <Route path="/" element={user ? <Layout /> : <Login />}>
            <Route index element={<>agenda</>} />
            <Route path="/agenda">
              <Route path="/agenda/minha-agenda" element={<>agenda</>} />
              <Route path="/agenda/todas-agendas" element={<TodasAgendas />} />
            </Route>

            <Route path="/clientes">
              <Route
                path="/clientes/todos-clientes"
                element={<TodosClientes />}
              />
              <Route
                path="/clientes/meus-clientes"
                element={<MeusClientes />}
              />
              <Route
                path="/clientes/detalhes-clientes/:id"
                element={<DetalhesCliente />}
              />
              <Route
                path="/clientes/editar-clientes/:id"
                element={<EditarCliente />}
              />
              <Route
                path="/clientes/cadastrar-cliente"
                element={<CadastrarCliente />}
              />
            </Route>

            <Route path="/usuarios">
              <Route
                path="/usuarios/todos-usuarios"
                element={<TodosUsuarios />}
              />
              <Route
                path="/usuarios/cadastrar-usuario"
                element={<CadastrarUsuario />}
              />
              <Route
                path="/usuarios/editar-usuario/:userId"
                element={<EditarUsuario />}
              />
            </Route>
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
