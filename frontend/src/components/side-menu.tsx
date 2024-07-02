import { Role, useAuthStore } from "@/store/auth.store";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { cn } from "@/lib/utils";

const menuAdmin = [
  {
    title: "Agenda",
    items: [
      {
        title: "Todas Agendas",
        href: "/agenda/todas-agendas",
      },
      {
        title: "Minha Agenda",
        href: "/agenda/minha-agenda",
      },
    ],
  },
  {
    title: "Clientes",
    items: [
      {
        title: "Meus Clientes",
        href: "/clientes/meus-clientes",
      },
      {
        title: "Cadastrar Cliente",
        href: "/clientes/cadastrar-cliente",
      },
    ],
  },
  {
    title: "Relatórios",
    items: [
      {
        title: "Relatórios",
        href: "/relatorios/relatorios",
      },
    ],
  },
  {
    title: "Usuários",
    items: [
      {
        title: "Usuário",
        href: "/usuarios/usuario",
      },
    ],
  },
];

const menuUsuer = [
  {
    title: "Agenda",
    items: [
      {
        title: "Minha Agenda",
        href: "/agenda/minha-agenda",
      },
    ],
  },
  {
    title: "Clientes",
    items: [
      {
        title: "Clientes",
        href: "/clientes/clientes",
      },
    ],
  },
];

export const SideMenu = () => {
  const [menu, setMenu] = useState<typeof menuAdmin>([]);
  const user = useAuthStore((store) => store.user);
  const { pathname } = useLocation();

  useEffect(() => {
    setMenu(user?.role === Role.ADMIN ? menuAdmin : menuUsuer);
  }, [user]);

  return (
    <aside className="scrollbar fixed top-[88px] bg-white dark:bg-darkBg h-[calc(100svh-88px)] max-h-[calc(100svh-88px)] w-[250px] overflow-y-auto border-r-4 border-border dark:border-darkBorder m800:w-[180px] m600:hidden">
      <Accordion className="w-full lg:w-[unset]" type="multiple">
        {menu.map((opt) => (
          <AccordionItem
            key={opt.title}
            className="lg:w-[500px] max-w-full"
            value={`${opt.title}`}
          >
            <AccordionTrigger>{opt.title}</AccordionTrigger>
            <AccordionContent className="px-0  py-0">
              {opt.items.map((opt) => (
                <Link
                  key={opt.href}
                  className={cn(
                    "block border-b-4 border-r-4 border-border dark:border-darkBorder p-4 pl-7 text-md font-base text-text/90 dark:text-darkText/90 hover:bg-bg dark:hover:text-text m800:text-base cursor-pointer",
                    {
                      "underline decoration-main decoration-2 underline-offset-2 font-bold":
                        pathname === opt.href,
                    }
                  )}
                  to={opt.href}
                >
                  {opt.title}
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
};
