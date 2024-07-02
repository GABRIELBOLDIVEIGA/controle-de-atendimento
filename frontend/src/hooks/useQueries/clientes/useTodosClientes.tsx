import { useApi } from "@/hooks/useApi";
import { useAuthStore } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const customerSchema = z.object({
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
    createdAt: z.string().datetime().nullable(),
    updatedAt: z.string().datetime().nullable(),
    deletedAt: z.string().datetime().nullable(),

    customerAddress: z.array(
      z.object({
        address: z.object({
          id: z.coerce.number().int().positive(),
          cep: z.string().nullable(),
          logradouro: z.string().nullable(),
          complemento: z.string().nullable(),
          bairro: z.string().nullable(),
          localidade: z.string().nullable(),
          uf: z.string().nullable(),
          numero: z.string().nullable(),
          createdAt: z.string().datetime().nullable(),
          updatedAt: z.string().datetime().nullable(),
        }),
      })
    ),
  }),
});

export type Customer = z.infer<typeof customerSchema>;

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

      return filter;
    },
  });

  return { ...todosClientes, todosClientes };
};
