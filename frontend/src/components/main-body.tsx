import { ScrollArea } from "./ui/scroll-area";

interface MainBodyProps {
  children: React.ReactNode;
}

export const MainBody = ({ children }: MainBodyProps) => {
  return (
    <div className="docs ml-[250px] min-h-[100dvh] w-[full-250px] bg-bg dark:bg-darkBg px-5 pt-[88px] m800:ml-[180px] m800:w-[full-180px] m600:m-0 m600:w-full m500:pt-16 pr-0">
      <ScrollArea className="h-[calc(100dvh-88px)] overflow-y-auto pr-5">
        {children}
        {/* {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
          return (
            <div
              key={index}
              className=" pt-10 flex w-full items-center justify-between border-b-4 border-border dark:border-darkBorder p-4 pl-7 text-lg font-base text-text/90 dark:text-darkText/90 hover:bg-main dark:hover:text-text m800:p-4 m800:pl-6 m800:text-base cursor-pointer"
            >
              {item}
            </div>
          );
        })} */}
      </ScrollArea>
    </div>
  );
};
