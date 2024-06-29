import { Layout } from "@/layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const AppRoutes = () => {
  const user = true;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<>login</>} />
          <Route path="/cadastrar" element={<>criar conta</>} />
          <Route path="/esqueci-minha-senha" element={<>EsqueciMinhaSenha</>} />
          <Route
            path="/recover-password/:token"
            element={<>RecoverPassword</>}
          />
          <Route path="/" element={user ? <Layout /> : <>Login</>}>
            <Route index element={<>agenda</>} />
            <Route path="/agenda" element={<>agenda</>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
