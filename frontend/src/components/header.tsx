import { ThemeToggle } from "./theme-toggle";

export const Header = () => {
  return (
    <nav className="fixed left-0 top-0 z-20 mx-auto flex h-[88px] w-full items-center border-b-4 border-border dark:border-darkBorder bg-white dark:bg-darkBg px-5 m500:h-16 ">
      <div className="mx-auto flex w-[1300px] dark:text-darkText text-text max-w-full items-center justify-between">
        <p className="text-4xl w-[172px] m900:w-[unset] font-heading m500:text-xl">
          Atendimentos
        </p>

        <div>centro</div>

        <ThemeToggle />
      </div>
    </nav>
  );
};
