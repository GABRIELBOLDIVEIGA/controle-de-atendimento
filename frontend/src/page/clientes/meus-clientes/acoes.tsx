import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, MoreHorizontal } from "lucide-react";
import { Role, useAuthStore } from "@/store/auth.store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteCliente } from "@/hooks/useMutations/clientes/useDeleteCliente";
import { TODOS_CLIENTES_QUERY_KEY } from "@/hooks/useQueries/clientes/useTodosClientes";
import { useToast } from "@/components/ui/use-toast";
import { errorHandler } from "@/helpers/error-handler";
import { Link, useNavigate } from "react-router-dom";
import { queryClient } from "@/lib/tanstack-react-query";
import { MEUS_CLIENTE_QUERY_KEY } from "@/hooks/useQueries/clientes/useMeusCliente";

interface AcoesProps {
  customerId: number;
}

export const Acoes = ({ customerId }: AcoesProps) => {
  const user = useAuthStore((store) => store.user);
  const { mutate, isPending } = useDeleteCliente();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!user) return;

    mutate(
      {
        customerId: customerId,
        companyId: user?.userId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            predicate: ({ queryKey }) =>
              queryKey[0] === MEUS_CLIENTE_QUERY_KEY ||
              queryKey[0] === TODOS_CLIENTES_QUERY_KEY,
          });
        },
        onError: (error) => {
          toast({
            title: "Erro ao excluir cliente",
            description: `${errorHandler(error).message}`,
          });
        },
      }
    );
  };
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
          <DropdownMenuItem
            onClick={() => {
              navigate("/clientes/editar-clientes/" + customerId);
            }}
          >
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to={`/clientes/detalhes-clientes/${customerId}`}>
              Ver detalhes
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>Iniciar atendimento</DropdownMenuItem>
          {user?.role === Role.ADMIN && (
            <>
              <DropdownMenuSeparator />

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="cursor-pointer">
                    <DropdownMenuLabel>Excluir</DropdownMenuLabel>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Excluir este cliente de forma permanente?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Ao excluir este cliente, todos os dados relacionados serão
                      excluídos permanentemente. Esta ação não pode ser
                      desfeita.
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
              </AlertDialog>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
