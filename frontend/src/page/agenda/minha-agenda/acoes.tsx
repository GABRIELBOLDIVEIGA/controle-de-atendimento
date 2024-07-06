import { SheetSchedule } from "@/components/sheet-agenda";
import { SheetAtendimento } from "@/components/sheet-atendimento";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
// import { useAuthStore } from "@/store/auth.store";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { useToast } from "@/components/ui/use-toast";
// import { errorHandler } from "@/helpers/error-handler";
// import { queryClient } from "@/lib/tanstack-react-query";
// import { useDeleteAgenda } from "@/hooks/useMutations/agenda/useDeleteAgenda";
// import { TODOS_AGENDAS_QUERY } from "@/hooks/useQueries/agenda/useTodasAgendas";
// import { AGENDA_BY_CLIENTE_ID_QUERY_KEY } from "@/hooks/useQueries/agenda/useAgendaByClienteId";

interface AcoesProps {
  customerId: number;
}

export const Acoes = ({ customerId }: AcoesProps) => {
  // const user = useAuthStore((store) => store.user);
  // const { mutate, isPending } = useDeleteAgenda();
  // const { toast } = useToast();

  // const handleDelete = () => {
  //   if (!user) return;

  //   mutate(
  //     {
  //       customerId: customerId,
  //       companyId: user?.userId,
  //     },
  //     {
  //       onSuccess: () => {
  //         queryClient.invalidateQueries({
  //           predicate: ({ queryKey }) =>
  //             queryKey[0] === AGENDA_BY_CLIENTE_ID_QUERY_KEY ||
  //             queryKey[0] === TODOS_AGENDAS_QUERY,
  //         });

  //         toast({ title: "Cliente excluído com sucesso!" });
  //       },
  //       onError: (error) => {
  //         toast({
  //           title: "Erro ao excluir cliente",
  //           description: `${errorHandler(error).message}`,
  //         });
  //       },
  //     }
  //   );
  // };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="noShadow" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Opções</DropdownMenuLabel>

          <SheetSchedule customerId={customerId}>
            <DropdownMenuLabel className="cursor-pointer">
              Ver detalhes
            </DropdownMenuLabel>
          </SheetSchedule>
          <DropdownMenuSeparator />
          <SheetAtendimento customerId={customerId}>
            <DropdownMenuLabel className="cursor-pointer">
              Iniciar atendimento
            </DropdownMenuLabel>
          </SheetAtendimento>

          {/* <DropdownMenuSeparator />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="cursor-pointer hover:text-rose-900">
                <DropdownMenuLabel>Excluir</DropdownMenuLabel>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir Agenda?</AlertDialogTitle>
                <AlertDialogDescription>
                  O usuário ainda poderá criar um novo agendamento para este
                  cliente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <div className="flex justify-between w-full">
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      handleDelete();
                    }}
                  >
                    {isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Confirmar"
                    )}
                  </AlertDialogAction>
                </div>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
