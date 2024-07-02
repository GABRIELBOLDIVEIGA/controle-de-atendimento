import { useApi } from "@/hooks/useApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCliente = () => {
  const { api } = useApi();

  const mutation = useMutation({
    mutationKey: ["deleteCliente"],
    mutationFn: async ({
      customerId,
      companyId,
    }: {
      customerId: number;
      companyId: number;
    }) => {
      return await api.delete(
        `/customer/hard-delete/${customerId}/${companyId}/`
      );
    },
  });

  return { ...mutation };
};
