import { DataTable } from "@/components/ui/data-table";
import { z } from "zod";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { useTodosClientes } from "@/hooks/useQueries/clientes/useTodosClientes";

const tableSchema = z.object({
  id: z.coerce.number().int().positive(),
  name: z.string(),
  phone1: z.string().nullable(),
  uf: z.string().nullable(),
  document: z.string().nullable(),
  comments: z.string().nullable(),
  first_contact: z.string().datetime().nullable(),
  last_contact: z.string().datetime().nullable(),
});
export type TableData = z.infer<typeof tableSchema>;

const useDataTable = () => {
  const { data } = useTodosClientes();
  const [filtro, setFiltro] = useState<TableData[]>([]);

  useEffect(() => {
    if (data) {
      setFiltro(
        data.map((item) => {
          return {
            id: item.customer.id,
            name: item.customer.name,
            phone1: item.customer.phone1,
            uf: item.customer.customerAddress[0]?.address.uf,
            comments: item.customer.comments,
            document: item.customer.document,
            first_contact: item.customer.first_contact,
            last_contact: item.customer.last_contact,
          };
        })
      );
    }
  }, [data]);

  return filtro;
};

export const TodosClientes = () => {
  const dataTable = useDataTable();

  return (
    <section className="flex justify-center pt-10">
      <div className="w-10/12">
        <DataTable data={dataTable ?? []} columns={columns} />
      </div>
    </section>
  );
};
