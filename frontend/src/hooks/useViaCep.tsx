import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { z } from "zod";

const viaCepSchema = z.object({
  cep: z.string().optional(),
  logradouro: z.string().optional(),
  complemento: z.string().optional(),
  bairro: z.string().optional(),
  localidade: z.string().optional(),
  uf: z.string().optional(),
});

export type ViaCep = z.infer<typeof viaCepSchema>;

export const VIA_CEP_QUERY_KEY = "viaCep";

export const useViaCep = () => {
  const [cep, setCEp] = useState("");

  const viaCep = useQuery({
    enabled: !!cep,
    queryKey: [VIA_CEP_QUERY_KEY, cep],
    queryFn: async () => {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      if (viaCepSchema.safeParse(data).success) {
        return data;
      }
      return null;
    },
  });

  return { ...viaCep, viaCep, setCEp };
};
