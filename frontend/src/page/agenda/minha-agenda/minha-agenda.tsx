import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useAgendaByUserId } from "@/hooks/useQueries/agenda/useAgendaByUserId";

export const MinhaAgenda = () => {
  const { data } = useAgendaByUserId();

  return (
    <section className="flex justify-center pt-10">
      <div className="w-10/12">
        <DataTable data={data ?? []} columns={columns} />
      </div>
    </section>
  );
};
