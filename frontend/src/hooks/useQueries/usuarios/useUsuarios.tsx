import { useApi } from "@/hooks/useApi";
import { Role, useAuthStore } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const usuarioSchema = z.object({
  id: z.coerce.number().int().positive(),
  name: z.string(),
  email: z.string().email(),
  role: z.nativeEnum(Role),
});

export type User = z.infer<typeof usuarioSchema>;

export const TODOS_USUARIOS_QUERY_KEY = "todosUsuarios";

export const useUsuarios = () => {
  const { api } = useApi();
  const user = useAuthStore((store) => store.user);

  const todosClientes = useQuery({
    enabled: !!user,
    queryKey: [TODOS_USUARIOS_QUERY_KEY, user?.companyId],
    queryFn: async () => {
      const { data } = await api.get<User[]>(`/user/${user?.companyId}`);

      const filter = data.filter((item) => {
        if (usuarioSchema.safeParse(item).success) {
          return true;
        } else {
          console.warn("[Data] => ", item);
          console.warn("[Error] => ", usuarioSchema.safeParse(item));
          return false;
        }
      });

      return filter;
    },
  });
  return { ...todosClientes };
};
