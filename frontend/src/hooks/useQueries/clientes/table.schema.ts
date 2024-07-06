import { z } from "zod";

export const clienteTableSchema = z.object({
  id: z.coerce.number().int().positive(),
  name: z.string(),
  phone1: z.string().nullable(),
  uf: z.string().nullable(),
  comments: z.string().nullable(),
  document: z.string().nullable(),
  first_contact: z.string().datetime().nullable(),
  last_contact: z.string().datetime().nullable(),
});

export type CustomerTableData = z.infer<typeof clienteTableSchema>;
