import { useTodasAgendas } from "@/hooks/useQueries/agenda/useTodasAgendas";
import { useEffect, useState } from "react";
import { z } from "zod";

const dataTableSchema = z.object({
  user_id: z.coerce.number().positive().int(),
  user_name: z.string(),

  customer_id: z.coerce.number().positive().int(),
  customer_name: z.string(),

  first_contact: z.string().datetime().nullable(),
  last_contact: z.string().datetime().nullable(),

  time_preference: z.string().datetime().nullable(),
  next_return: z.string().datetime().nullable(),
});

export type AgendaDataTable = z.infer<typeof dataTableSchema>;

export const useAgendaDataTable = (): { data: AgendaDataTable[] } => {
  const { data: dataAgenda } = useTodasAgendas();
  const [dataTable, setDataTable] = useState<AgendaDataTable[]>([]);

  useEffect(() => {
    if (dataAgenda)
      setDataTable(
        dataAgenda.map((agenda) => ({
          user_id: agenda.userId,
          user_name: agenda.user.name,

          customer_id: agenda.customer.id,
          customer_name: agenda.customer.name,

          time_preference: agenda.time_preference,
          next_return: agenda.next_return,

          first_contact: agenda.customer.first_contact,
          last_contact: agenda.customer.last_contact,
        }))
      );
  }, [dataAgenda]);

  return { data: dataTable };
};
