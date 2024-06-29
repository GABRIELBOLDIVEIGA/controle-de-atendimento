import { Role, useAuthStore } from "@/store/auth.store";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const menuAdm = [
  { name: "Minha Agenda", href: "/minha-agenda" },
  { name: "Agendas", href: "/agendas" },
  { name: "Relatórios", href: "/relatorios" },
  { name: "Contato", href: "/contato" },
];

const menuUsuer = [{ name: "Minha Agenda", href: "/minha-agenda" }];

export const SideMenu = () => {
  const [menu, setMenu] = useState<typeof menuUsuer>([]);
  const user = useAuthStore((store) => store.user);

  useEffect(() => {
    setMenu(user?.role === Role.ADMIN ? menuAdm : menuUsuer);
  }, [user]);

  return (
    <aside className="scrollbar fixed top-[88px] bg-white dark:bg-darkBg h-[calc(100svh-88px)] max-h-[calc(100svh-88px)] w-[250px] overflow-y-auto border-r-4 border-border dark:border-darkBorder m800:w-[180px] m600:hidden">
      {menu.map((item) => (
        <Link
          key={item.name}
          className="block border-b-4 border-r-4 border-border dark:border-darkBorder p-4 pl-7 text-lg font-base text-text/90 dark:text-darkText/90 hover:bg-main dark:hover:text-text m800:p-4 m800:pl-6 m800:text-base cursor-pointer"
          to={item.href}
        >
          {item.name}
        </Link>
      ))}
    </aside>
  );
};
