import { useApi } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import { Customer, customerSchema } from "./clientes.schema";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const CLIENTE_QUERY_KEY = "cliente";

export const useCliente = (id?: number) => {
  const { api } = useApi();
  const [customerId, setCustomerId] = useState<number | undefined>(id);
  const { toast } = useToast();

  const cliente = useQuery({
    enabled: !!customerId,
    queryKey: [CLIENTE_QUERY_KEY],
    queryFn: async () => {
      const { data } = await api.get<Customer>(`/customer/${customerId}`);

      if (customerSchema.safeParse(data).success) {
        return data;
      } else {
        console.warn("[Data] => ", data);
        console.warn("[Error] => ", customerSchema.safeParse(data));
        toast({
          title: "Erro ao carregar dados",
          description: `${customerSchema.safeParse(data).error?.message}`,
        });
        return null;
      }
    },
  });

  return { ...cliente, setCustomerId };
};
