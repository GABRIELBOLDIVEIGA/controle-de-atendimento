import { useToast } from "@/components/ui/use-toast";
import { useApi } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";

const agendaSchema = z.object({
  id: z.coerce.number().int().positive(),
  time_preference: z.string().datetime().nullable(),
  next_return: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  companyId: z.coerce.number().int().positive(),
  customerId: z.coerce.number().int().positive(),
  userId: z.coerce.number().int().positive(),
  customer: z.object({
    id: z.coerce.number().int().positive(),
    name: z.string(),
    email: z.string().email().nullable(),
    phone1: z.string().nullable(),
    phone2: z.string().nullable(),
    phone3: z.string().nullable(),
    origin: z.string().nullable(),
    person: z.string().nullable(),
    competitor: z.string().nullable(),
    comments: z.string().nullable(),
    document: z.string().nullable(),
    first_contact: z.string().datetime().nullable(),
    last_contact: z.string().datetime().nullable(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    deletedAt: z.string().datetime().nullable(),
  }),
  user: z.object({
    id: z.coerce.number().int().positive(),
    name: z.string(),
  }),
});

type AgendaByClienteId = z.infer<typeof agendaSchema>;

export const AGENDA_BY_CLIENTE_ID_QUERY_KEY = "agendaByClienteId";

export const useAgendaByClienteId = () => {
  const { api } = useApi();
  const [customerId, setCustomerId] = useState<number>();
  const { toast } = useToast();

  const queryAgendaByClienteId = useQuery({
    enabled: !!customerId,
    queryKey: [AGENDA_BY_CLIENTE_ID_QUERY_KEY, customerId],
    queryFn: async () => {
      const { data } = await api.get<AgendaByClienteId>(
        `/schedule/customer/${customerId}`
      );

      if (agendaSchema.safeParse(data).success) {
        return data;
      } else {
        console.warn("[Data] => ", data);
        console.warn("[Error] => ", agendaSchema.safeParse(data));
        toast({
          title: "Erro ao carregar dados",
          description: `${agendaSchema.safeParse(data).error?.message}`,
        });
        return null;
      }
    },
  });
  return { ...queryAgendaByClienteId, setCustomerId };
};
