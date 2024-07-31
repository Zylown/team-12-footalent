import { z } from "zod";

const editClinicalSchema = z.object({
  data: z.string(),
  description: z
    .string()
    .nonempty({ message: "La descripción no puede estar vacía" }),
});

export default editClinicalSchema;
