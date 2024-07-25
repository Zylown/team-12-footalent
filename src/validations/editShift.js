import { z } from "zod";

const editShiftSchema = z.object({
  date: z.string().optional(),
  hour: z.string().optional(),
  reason: z.string().optional(),
  odontologist: z.string().optional(),
  reminder: z.boolean(),
});

export default editShiftSchema;
