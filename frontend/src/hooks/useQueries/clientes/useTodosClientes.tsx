import { useApi } from "@/hooks/useApi";
import { useAuthStore } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { Customer, customerSchema } from "./clientes.schema";

export const TODOS_CLIENTES_QUERY_KEY = "todosClientes";

export const useTodosClientes = () => {
  const { api } = useApi();
  const user = useAuthStore((store) => store.user);

  const todosClientes = useQuery({
    enabled: !!user,
    queryKey: [TODOS_CLIENTES_QUERY_KEY],
    queryFn: async () => {
      const { data } = await api.get<Customer[]>(
        `/customer/company/${user?.userId}`
      );

      const filter = data.filter((item) => {
        if (customerSchema.safeParse(item).success) {
          return true;
        } else {
          console.warn("[Data] => ", item);
          console.warn("[Error] => ", customerSchema.safeParse(item));
          return false;
        }
      });

      return filter.map((item) => {
        return {
          id: item.customer.id,
          name: item.customer.name,
          phone1: item.customer.phone1,
          uf: item.customer.customerAddress[0]?.address.uf,
          comments: item.customer.comments,
          document: item.customer.document,
          first_contact: item.customer.first_contact,
          last_contact: item.customer.last_contact,
        };
      });
    },
  });

  return { ...todosClientes, todosClientes };
};
