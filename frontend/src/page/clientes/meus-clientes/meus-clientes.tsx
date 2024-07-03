import { DataTable } from "@/components/ui/data-table";
import { useCustomerDataTable } from "./useCustomerDataTable";
import { columns } from "./columns";

export const MeusClientes = () => {
  const dataTable = useCustomerDataTable();

  return (
    <section className="flex justify-center pt-10">
      <div className="w-10/12">
        <DataTable data={dataTable ?? []} columns={columns} />
      </div>
    </section>
  );
};
