import { useApi } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";

export const enderecoSchema = z.object({
  id: z.coerce.number().int().positive(),
  customerId: z.coerce.number().int().positive(),
  addressId: z.coerce.number().int().positive(),
  address: z.object({
    id: z.coerce.number().int().positive(),
    cep: z.string().nullable(),
    logradouro: z.string().nullable(),
    complemento: z.string().nullable(),
    bairro: z.string().nullable(),
    localidade: z.string().nullable(),
    uf: z.string().nullable(),
    numero: z.string().nullable(),
  }),
});

type EnderecoByClienteId = z.infer<typeof enderecoSchema>;

export const ENDERECO_BY_CLIENTE_ID_QUERY_KEY = "enderecoByClienteId";

export const useEnderecoByClienteId = () => {
  const { api } = useApi();
  const [customerId, setCustomerId] = useState<number>();

  const queryEnderecoByClienteId = useQuery({
    enabled: !!customerId,
    queryKey: [ENDERECO_BY_CLIENTE_ID_QUERY_KEY],
    queryFn: async () => {
      const { data } = await api.get<EnderecoByClienteId>(
        `/address/customer-address/${customerId}`
      );

      if (enderecoSchema.safeParse(data).success) {
        return data;
      } else {
        console.warn("[Data] => ", data);
        console.warn("[Error] => ", enderecoSchema.safeParse(data));
        return null;
      }
    },
  });
  return { ...queryEnderecoByClienteId, setCustomerId };
};
