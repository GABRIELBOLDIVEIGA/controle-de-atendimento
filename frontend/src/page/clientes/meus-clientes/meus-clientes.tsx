import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useMeusClientes } from "@/hooks/useQueries/clientes/useMeusCliente";

export const MeusClientes = () => {
  const { data } = useMeusClientes();

  return (
    <section className="flex justify-center pt-10">
      <div className="w-10/12">
        <DataTable data={data ?? []} columns={columns} />
      </div>
    </section>
  );
};
