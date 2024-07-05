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
import { useToast } from "@/components/ui/use-toast";
import { errorHandler } from "@/helpers/error-handler";
import { useNavigate } from "react-router-dom";
import { queryClient } from "@/lib/tanstack-react-query";
import { useDeleteUsuario } from "@/hooks/useMutations/usuario/useDeleteUsuario";
import { TODOS_USUARIOS_QUERY_KEY } from "@/hooks/useQueries/usuarios/useUsuarios";

interface AcoesProps {
  userId: number;
}

export const Acoes = ({ userId }: AcoesProps) => {
  const user = useAuthStore((store) => store.user);
  const { mutate, isPending } = useDeleteUsuario();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!user) return;

    mutate(
      {
        userId: userId,
        companyId: user?.companyId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            predicate: (query) =>
              query.queryKey[0] === TODOS_USUARIOS_QUERY_KEY,
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
              navigate("/usuarios/editar-usuario/" + userId);
            }}
          >
            Editar
          </DropdownMenuItem>

          {user?.role === Role.ADMIN && (
            <>
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="cursor-pointer hover:text-rose-900">
                    <DropdownMenuLabel>Excluir</DropdownMenuLabel>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Excluir este usuário de forma permanente?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Ao excluir este usuário, todos os dados relacionados serão
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
