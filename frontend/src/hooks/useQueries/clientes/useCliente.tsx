import { useApi } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import { Customer, customerSchema } from "./clientes.schema";
import { useState } from "react";

const CLIENTE_QUERY_KEY = "cliente";

export const useCliente = () => {
  const { api } = useApi();
  const [customerId, setCustomerId] = useState<number>();

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
        return null;
      }
    },
  });

  return { ...cliente, setCustomerId };
};
