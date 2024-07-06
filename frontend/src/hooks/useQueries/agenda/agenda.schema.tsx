import { z } from "zod";

export const agendaSchema = z.object({
  id: z.coerce.number().positive().int(),

  user_id: z.coerce.number().positive().int(),
  user_name: z.string(),

  customer_id: z.coerce.number().positive().int(),
  customer_name: z.string(),

  time_preference: z.string().datetime().nullable(),
  next_return: z.string().datetime().nullable(),

  first_contact: z.string().datetime().nullable(),
  last_contact: z.string().datetime().nullable(),
});

export type AgendaDataTable = z.infer<typeof agendaSchema>;
