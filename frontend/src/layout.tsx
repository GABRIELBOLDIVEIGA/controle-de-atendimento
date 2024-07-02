import { Outlet } from "react-router-dom";
import { Header } from "./components/header";
import { MainBody } from "./components/main-body";
import { SideMenu } from "./components/side-menu";

export const Layout = () => {
  return (
    <section className="w-screen h-screen overflow-x-hidden">
      <Header />

      <SideMenu />

      <MainBody>
        <Outlet />
      </MainBody>
    </section>
  );
};
