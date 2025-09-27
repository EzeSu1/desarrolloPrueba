import {z} from "zod";

export const usuarioSchema = z.object({
    nombre: z.string(),
    email: z.string(),
    telefono: z.string(),
    tipo: z.enum(["COMPRADOR", "VENDEDOR", "ADMIN"])
})