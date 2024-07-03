import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useCustomerDataTable } from "./useCustomerDataTable";

export const TodosClientes = () => {
  const dataTable = useCustomerDataTable();

  return (
    <section className="flex justify-center pt-10">
      <div className="w-10/12">
        <DataTable data={dataTable ?? []} columns={columns} />
      </div>
    </section>
  );
};
