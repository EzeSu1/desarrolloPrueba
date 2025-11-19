import {z} from "zod";

export const direccionEntregaSchema= z.object({
    calle: z.string(),
    altura: z.number(),
    piso : z.number(),
    departamento: z.string(),
    codigo_postal: z.string(),
    ciudad: z.string(),
    provincia: z.string(),
    pais: z.string()
})