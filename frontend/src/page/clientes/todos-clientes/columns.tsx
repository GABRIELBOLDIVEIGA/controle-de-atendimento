import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Loader2, MoreHorizontal } from "lucide-react";
import { TODOS_CLIENTES_QUERY_KEY, TableData } from "./todos-clientes";
import { format } from "date-fns";
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
import { queryClient } from "@/main";

export const columns: ColumnDef<TableData>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="noShadow"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="capitalize">{`${row.original.name}`}</div>;
    },
  },
  {
    accessorKey: "phone1",
    header: () => {
      return <p>Telefone</p>;
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("phone1")}</div>
    ),
  },

  {
    accessorKey: "uf",
    header: ({ column }) => {
      return (
        <Button
          variant="noShadow"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          UF
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="lowercase">{`${row.original.uf ?? ""}`}</div>;
    },
  },

  {
    accessorKey: "document",
    header: () => {
      return <p>Documento</p>;
    },
    cell: ({ row }) => {
      return (
        <div className="lowercase">{`${row.original.document ?? ""}`}</div>
      );
    },
  },

  {
    accessorKey: "comments",
    header: () => {
      return <p>Observações</p>;
    },
    cell: ({ row }) => {
      return (
        <div className="lowercase">{`${row.original.comments ?? ""}`}</div>
      );
    },
  },

  {
    accessorKey: "first_contact",
    header: () => {
      return <p>Primeiro contato</p>;
    },
    cell: ({ row }) => {
      return (
        <div className="lowercase">
          {row.original.first_contact
            ? `${format(row.original.first_contact, "P")}`
            : ""}
        </div>
      );
    },
  },

  {
    accessorKey: "last_contact",
    header: () => {
      return <p>Ultimo contato</p>;
    },
    cell: ({ row }) => {
      return (
        <div className="lowercase">
          {row.original.last_contact
            ? `${format(row.original.last_contact, "P")}`
            : ""}
        </div>
      );
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <Acoes customerId={row.original.id} />;
    },
  },
];

interface AcoesProps {
  customerId: number;
}

export const Acoes = ({ customerId }: AcoesProps) => {
  const user = useAuthStore((store) => store.user);
  const { mutate, isPending } = useDeleteCliente();

  const handleDelete = () => {
    if (!user) return;

    mutate(
      {
        customerId: customerId,
        companyId: user?.userId,
      },
      {
        onSuccess: () => {
          console.log("[onSuccess]");
          queryClient.invalidateQueries({
            predicate: (query) =>
              query.queryKey[0] === TODOS_CLIENTES_QUERY_KEY,
          });
        },
        onError: (error) => {
          console.log("[onError] => ", error);
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
          <DropdownMenuItem>Editar</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
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
