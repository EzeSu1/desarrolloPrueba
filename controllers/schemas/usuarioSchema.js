import {z} from "zod";

export const usuarioSchema = z.object({
    nombre: z.string().min(1,"El nombre es obligatorio"),
    email: z.email(),
    telefono: z.string(),
    tipo: z.enum(["COMPRADOR", "VENDEDOR", "ADMIN"])
})

/*
    email: z.string().trim().email .refine(val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: "El correo no es válido",
    }),
*/