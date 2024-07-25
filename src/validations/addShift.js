import { z } from "zod";

const addShiftSchema = z.object({
  date: z.string().nonempty("Este campo es requerido"),
  hour: z.string().nonempty("Este campo es requerido"),
  reason: z.string().nonempty("Este campo es requerido"),
  odontologist: z.string().nonempty("Este campo es requerido"),
  reminder: z.boolean(),
});

export default addShiftSchema;
