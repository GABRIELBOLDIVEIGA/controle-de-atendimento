import { useToast } from "@/components/ui/use-toast";
import { useApi } from "@/hooks/useApi";
import { useAuthStore } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const schema = z.object({
  id: z.coerce.number().int().positive(),
  name: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
  companyId: z.coerce.number().int().positive(),
});

type Ocorrencia = z.infer<typeof schema>;

export const OCORRENCIAS_QUERY_KEY = "ocorrencias";

export const useOcorrencias = () => {
  const { api } = useApi();
  const { user } = useAuthStore();
  const { toast } = useToast();

  const ocorrencias = useQuery({
    enabled: !!user,
    queryKey: [OCORRENCIAS_QUERY_KEY],
    queryFn: async () => {
      const { data } = await api.get<Ocorrencia[]>(
        `/occurrence/company/${user?.companyId}`
      );

      const filter = data.filter((ocorrencia) => {
        if (schema.safeParse(ocorrencia).success) {
          return true;
        } else {
          console.warn("[Data] => ", ocorrencia);
          console.warn("[Error] => ", schema.safeParse(ocorrencia));
          toast({
            title: "Erro ao carregar dados",
            description: `${schema.safeParse(ocorrencia).error?.message}`,
          });
          return false;
        }
      });

      return filter;
    },
  });

  return { ...ocorrencias };
};
