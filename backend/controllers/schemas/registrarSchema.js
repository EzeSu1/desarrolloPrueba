import {z} from "zod";


export const usuarioSchema = z.object({
    nombre: z.string().min(1,"El nombre es obligatorio"),
    email: z.email(),
    telefono: z.string(),
    tipo: z.enum(["COMPRADOR", "VENDEDOR"])
})

export const registrarSchema = z.object({
    usuario: usuarioSchema,
    password: z.string().min(1),
})

export const loguearSchema = z.object({
    user: z.string().min(1),
    password: z.string().min(1),
})