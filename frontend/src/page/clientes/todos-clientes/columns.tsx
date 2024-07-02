import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { TableData } from "./todos-clientes";
import { format } from "date-fns";
import { Acoes } from "./acoes";

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
