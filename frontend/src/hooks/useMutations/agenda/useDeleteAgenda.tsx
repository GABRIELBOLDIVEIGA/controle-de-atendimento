import { useApi } from "@/hooks/useApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteAgenda = () => {
  const { api } = useApi();

  const deleteAgenda = useMutation({
    mutationKey: ["delete-agenda"],
    mutationFn: async ({
      customerId,
      companyId,
    }: {
      customerId: number;
      companyId: number;
    }) => {
      const { data } = await api.delete(`/schedule/${companyId}/${customerId}`);
      return data;
    },
  });

  return {
    ...deleteAgenda,
  };
};
