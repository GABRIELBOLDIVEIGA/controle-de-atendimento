import { Layout } from "@/layout";
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
          <Route path="/criar-conta" element={<>criar conta</>} />
          <Route path="/esqueci-minha-senha" element={<>EsqueciMinhaSenha</>} />
          <Route
            path="/recover-password/:token"
            element={<>RecoverPassword</>}
          />
          <Route path="/" element={user ? <Layout /> : <Login />}>
            <Route index element={<>agenda</>} />
            <Route path="/agenda" element={<>agenda</>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
