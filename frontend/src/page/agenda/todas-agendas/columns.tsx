import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { addHours, format } from "date-fns";
import { AgendaDataTable } from "@/hooks/useQueries/agenda/agenda.schema";
import { Acoes } from "./acoes";
import { ptBR } from "date-fns/locale";

export const columns: ColumnDef<AgendaDataTable>[] = [
  {
    id: "customer_name",
    accessorKey: "customer_name",
    header: ({ column }) => {
      return (
        <Button
          variant="noShadow"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="capitalize">{`${row.original.customer_name}`}</div>
      );
    },
  },
  {
    id: "user_name",
    accessorKey: "user_name",
    header: ({ column }) => {
      return (
        <Button
          variant="noShadow"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Usuário
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="capitalize">{`${row.original.user_name}`}</div>;
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
    id: "last_contact",
    accessorKey: "last_contact",
    header: () => {
      return <p>Ultimo contato</p>;
    },
    cell: ({ row }) => {
      return (
        <div className="lowercase">
          {row.original.last_contact
            ? `${format(row.original.last_contact, "P", { locale: ptBR })}`
            : ""}
        </div>
      );
    },
  },

  {
    accessorKey: "next_return",
    header: () => {
      return <p>Próximo retorno</p>;
    },
    cell: ({ row }) => {
      return (
        <div className="lowercase">
          {row.original.next_return
            ? `${format(row.original.next_return, "P", { locale: ptBR })}`
            : ""}
        </div>
      );
    },
  },

  {
    accessorKey: "time_preference",
    header: () => {
      return <p>Horário de preferência</p>;
    },
    cell: ({ row }) => {
      return (
        <div className="lowercase">
          {row.original.time_preference
            ? addHours(
                new Date(row.original.time_preference),
                3
              ).toLocaleTimeString()
            : ""}
        </div>
      );
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <Acoes customerId={row.original.customer_id} />;
    },
  },
];
