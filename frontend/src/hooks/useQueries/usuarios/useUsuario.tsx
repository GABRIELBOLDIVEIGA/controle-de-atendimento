import { useApi } from "@/hooks/useApi";
import { useAuthStore } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const USUARIO_QUERY_KEY = "usuario";

export const useUsuario = () => {
  const { api } = useApi();
  const [usuarioId, setUsuarioId] = useState<number>();
  const user = useAuthStore((store) => store.user);

  const usuario = useQuery({
    enabled: !!usuarioId && !!user,
    queryKey: [USUARIO_QUERY_KEY, usuarioId],
    queryFn: async () => {
      const { data } = await api.get(`/user/${user?.companyId}/${usuarioId}`);
      return data;
    },
  });

  return { ...usuario, setUsuarioId };
};
