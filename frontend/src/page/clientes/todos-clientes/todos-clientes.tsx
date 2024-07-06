import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useTodosClientes } from "@/hooks/useQueries/clientes/useTodosClientes";

export const TodosClientes = () => {
  const { data } = useTodosClientes();

  return (
    <section className="flex justify-center pt-10">
      <div className="w-10/12">
        <DataTable data={data ?? []} columns={columns} />
      </div>
    </section>
  );
};
