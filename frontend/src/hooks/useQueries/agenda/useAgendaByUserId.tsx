import { useToast } from "@/components/ui/use-toast";
import { useApi } from "@/hooks/useApi";
import { useAuthStore } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
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

type AgendaByUsuarioId = z.infer<typeof agendaSchema>;

export const AGENDA_BY_USER_ID_QUERY_KEY = "agendaByUserId";

export const useAgendaByUserId = () => {
  const { api } = useApi();
  const { user } = useAuthStore();
  const { toast } = useToast();

  const queryAgendaByUserId = useQuery({
    enabled: !!user,
    queryKey: [AGENDA_BY_USER_ID_QUERY_KEY, user],
    queryFn: async () => {
      const { data } = await api.get<AgendaByUsuarioId[]>(
        `/schedule/user/${user?.userId}`
      );
      console.log("data", data);

      const filter = data.filter((schedule) => {
        if (agendaSchema.safeParse(schedule).success) {
          return true;
        } else {
          console.warn("[Data] => ", schedule);
          console.warn("[Error] => ", agendaSchema.safeParse(schedule));
          toast({
            title: "Erro ao carregar dados",
            description: `${agendaSchema.safeParse(schedule).error?.message}`,
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
  return { ...queryAgendaByUserId };
};
