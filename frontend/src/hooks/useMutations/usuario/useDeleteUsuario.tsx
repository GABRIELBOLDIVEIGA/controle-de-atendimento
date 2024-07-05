import { useApi } from "@/hooks/useApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteUsuario = () => {
  const { api } = useApi();

  const deleteUsuario = useMutation({
    mutationKey: ["deleteUsuario"],
    mutationFn: async (variables: { userId: number; companyId: number }) => {
      return await api.delete(
        `/user/${variables.userId}/${variables.companyId}`
      );
    },
  });

  return { ...deleteUsuario };
};
