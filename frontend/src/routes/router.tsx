import { Layout } from "@/layout";
import { CriarConta } from "@/page/criar-conta/criar-conta";
import { Login } from "@/page/login/login";
import { useAuthStore } from "@/store/auth.store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const AppRoutes = () => {
  const user = useAuthStore((store) => store.user);

  return (
    <>
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
            <Route path="/minha-agenda" element={<>agenda</>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
