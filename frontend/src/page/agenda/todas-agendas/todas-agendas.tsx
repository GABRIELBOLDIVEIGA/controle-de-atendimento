import { DataTable } from "@/components/ui/data-table";
import { useAgendaDataTable } from "./useAgendaDataTable";
import { columns } from "./columns";

export const TodasAgendas = () => {
  const { data } = useAgendaDataTable();

  return (
    <section className="flex justify-center pt-10">
      <div className="w-10/12">
        <DataTable data={data ?? []} columns={columns} />
      </div>
    </section>
  );
};
