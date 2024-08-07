import { z } from 'zod';

const passwordSchema = z.object({
  old_password: z.string()
    .min(8, { message: "La contraseña actual debe tener al menos 8 caracteres" })
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
  new_password: z.string()
    .min(8, { message: "La nueva contraseña debe tener al menos 8 caracteres" }),
  confirm_password: z.string()
  .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
}).refine((data) => data.new_password !== data.old_password, {
  path: ['new_password'],
  message: "La nueva contraseña debe ser diferente de la actual",
}).refine((data) => data.new_password === data.confirm_password, {
  path: ['confirm_password'],
  message: "Las contraseñas no coinciden",
});

export default passwordSchema;
