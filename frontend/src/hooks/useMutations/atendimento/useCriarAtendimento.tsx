import { useApi } from "@/hooks/useApi";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

const schema = z.object({
  comments: z.string(),
  companyId: z.coerce.number().int().positive(),
  customerId: z.coerce.number().int().positive(),
  userId: z.coerce.number().int().positive(),
  occurenceId: z.coerce.number().int().positive(),
  otherOccurenceId: z.coerce.number().int().positive().optional(),
});

type Atendimento = z.infer<typeof schema>;

export const useCriarAtendimento = () => {
  const { api } = useApi();

  const criarAtendimento = useMutation({
    mutationKey: ["criar-atendimento"],
    mutationFn: async (form: Atendimento) => {
      const { data } = await api.post(`/contact`, {
        ...form,
        start: new Date().toISOString(),
        end: new Date().toISOString(),
      });
      return data;
    },
  });

  return {
    ...criarAtendimento,
  };
};
