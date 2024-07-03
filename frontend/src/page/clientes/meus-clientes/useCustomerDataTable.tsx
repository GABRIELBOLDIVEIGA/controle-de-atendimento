import { z } from "zod";
import { useEffect, useState } from "react";
import { useMeusClientes } from "@/hooks/useQueries/clientes/useMeusCliente";

const customerTableSchema = z.object({
  id: z.coerce.number().int().positive(),
  name: z.string(),
  phone1: z.string().nullable(),
  uf: z.string().nullable(),
  document: z.string().nullable(),
  comments: z.string().nullable(),
  first_contact: z.string().datetime().nullable(),
  last_contact: z.string().datetime().nullable(),
});
export type CustomerTableData = z.infer<typeof customerTableSchema>;

export const useCustomerDataTable = () => {
  const { data } = useMeusClientes();
  const [filtro, setFiltro] = useState<CustomerTableData[]>([]);

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
