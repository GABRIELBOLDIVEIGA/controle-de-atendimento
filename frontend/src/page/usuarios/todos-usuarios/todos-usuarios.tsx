import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";
import { useUsuarios } from "@/hooks/useQueries/usuarios/useUsuarios";

export const TodosUsuarios = () => {
  const { data } = useUsuarios();

  return (
    <section className="flex justify-center pt-10">
      <div className="w-10/12">
        <DataTable data={data ?? []} columns={columns} />
      </div>
    </section>
  );
};
