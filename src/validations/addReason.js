
import { z } from "zod";

const reasonSchema = z.object({
  time: z
    .string()
    .min(1, { message: "El tiempo es obligatorio" })
    .max(6, { message: "El tiempo no puede exceder las 4 horas" }),
  description: z
  .string()
  .min(1, "El motivo es obligatorio")
  .max(100, "El motivo no puede exceder los 100 caracteres"),
});

export default reasonSchema;