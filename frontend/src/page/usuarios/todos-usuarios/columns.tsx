import { ColumnDef } from "@tanstack/react-table";
import { Acoes } from "./acoes";
import { User } from "@/hooks/useQueries/usuarios/useUsuarios";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: () => {
      return <p>Nome</p>;
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: () => {
      return <p>E-mail</p>;
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },

  {
    accessorKey: "role",
    header: () => {
      return <p>Role</p>;
    },
    cell: ({ row }) => {
      return <div className="lowercase">{row.original.role}</div>;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <Acoes userId={row.original.id} />;
    },
  },
];
