import { ScrollArea } from "./ui/scroll-area";

interface MainBodyProps {
  children: React.ReactNode;
}

export const MainBody = ({ children }: MainBodyProps) => {
  return (
    <div className="overflow-hidden  ml-[250px] w-[full-250px] bg-bg dark:bg-darkBg px-5 pt-[88px] m800:ml-[180px] m800:w-[full-180px] m600:m-0 m600:w-full m500:pt-16 pr-0">
      <ScrollArea className="h-[calc(100dvh-90px)] overflow-y-hidden pr-5">
        <div className="pb-20">{children}</div>
      </ScrollArea>
    </div>
  );
};
