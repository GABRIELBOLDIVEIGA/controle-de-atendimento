import { useApi } from "@/hooks/useApi";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

const schema = z.object({
  customerId: z.coerce.number().int().positive(),
  companyId: z.coerce.number().int().positive(),
  time_preference: z.string().datetime(),
  next_return: z.string().datetime(),
});
type AgendaForm = z.infer<typeof schema>;

export const useUpdateAgenda = () => {
  const { api } = useApi();
  const updateAgenda = useMutation({
    mutationKey: ["updateAgenda"],
    mutationFn: async (form: AgendaForm) => {
      const { data } = await api.patch(
        `/schedule/${form.companyId}/${form.customerId}`,
        form
      );
      return data;
    },
  });
  return { ...updateAgenda };
};
