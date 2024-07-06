import { useToast } from "@/components/ui/use-toast";
import { useApi } from "@/hooks/useApi";
import { useAuthStore } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const schema = z.object({
  id: z.coerce.number().positive().int(),
  time_preference: z.string().datetime().nullable(),
  next_return: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  companyId: z.coerce.number().positive().int(),
  customerId: z.coerce.number().positive().int(),
  userId: z.coerce.number().positive().int(),
  customer: z.object({
    id: z.coerce.number().positive().int(),
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
    id: z.coerce.number().positive().int(),
    name: z.string(),
  }),
});

export type Schedule = z.infer<typeof schema>;

export const TODOS_AGENDAS_QUERY = "todo-agendas-query";

export const useTodasAgendas = () => {
  const { api } = useApi();
  const { user } = useAuthStore();
  const { toast } = useToast();

  const todasAgendas = useQuery({
    enabled: !!user,
    queryKey: [TODOS_AGENDAS_QUERY],
    queryFn: async () => {
      const { data } = await api.get<Schedule[]>(
        `/schedule/company/${user?.companyId}`
      );

      const filter = data.filter((schedule) => {
        if (schema.safeParse(schedule).success) {
          return true;
        } else {
          console.warn("[Data] => ", schedule);
          console.warn("[Error] => ", schema.safeParse(schedule));
          toast({
            title: "Erro ao carregar dados",
            description: `${schema.safeParse(schedule).error?.message}`,
          });
          return false;
        }
      });

      return filter.map((agenda) => ({
        id: agenda.id,

        user_id: agenda.userId,
        user_name: agenda.user.name,

        customer_id: agenda.customer.id,
        customer_name: agenda.customer.name,

        time_preference: agenda.time_preference,
        next_return: agenda.next_return,

        first_contact: agenda.customer.first_contact,
        last_contact: agenda.customer.last_contact,
      }));
    },
  });

  return {
    ...todasAgendas,
  };
};
