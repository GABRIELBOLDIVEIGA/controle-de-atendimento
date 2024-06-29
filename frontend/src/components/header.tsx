import { BookText, LogOut, ShieldCheck, UserRound } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuthStore } from "@/store/auth.store";

export const UserOptions = () => {
  const reset = useAuthStore((store) => store.reset);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="neutral">
          <UserRound />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="flex justify-between">
          <p>Perfil</p>
          <BookText size={16} />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-between">
          <p>Segurança</p>
          <ShieldCheck size={16} />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex justify-between"
          onClick={() => reset()}
        >
          <p>Sair</p>
          <LogOut size={16} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Header = () => {
  return (
    <nav className="fixed left-0 top-0 z-20 mx-auto flex h-[88px] w-full items-center border-b-4 border-border dark:border-darkBorder bg-white dark:bg-darkBg px-5 m500:h-16 ">
      <div className="mx-auto flex w-[1300px] dark:text-darkText text-text max-w-full items-center justify-between">
        <p className="text-4xl w-[172px] m900:w-[unset] font-heading m500:text-xl">
          HOME
        </p>

        <div>Centro</div>

        <div className="space-x-4">
          <ThemeToggle />

          <UserOptions />
        </div>
      </div>
    </nav>
  );
};
