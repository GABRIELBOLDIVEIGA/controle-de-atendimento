import { useApi } from "@/hooks/useApi";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

const schema = z.object({
  id: z.coerce.number().int().positive(),
  customerId: z.coerce.number().int().positive(),

  cep: z.string().optional(),
  logradouro: z.string().optional(),
  complemento: z.string().optional(),
  bairro: z.string().optional(),
  localidade: z.string().optional(),
  uf: z.string().optional(),
  numero: z.string().optional(),
});

type UpdateEndereco = z.infer<typeof schema>;

export const useUpdateEndereco = () => {
  const { api } = useApi();

  const updateEndereco = useMutation({
    mutationKey: ["updateEndereco"],
    mutationFn: async (form: UpdateEndereco) => {
      const { data } = await api.patch(
        `/address/${form.id}/${form.customerId}`,
        { ...form }
      );
      return data;
    },
  });

  return { ...updateEndereco };
};
