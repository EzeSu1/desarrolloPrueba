import {z} from "zod";

export const cambioEstadoSchema = z.object({
    usuarioId: z.string(),
    estado: z.enum(["PENDIENTE","CONFIRMADO","EN_PREPARACION" ,"ENVIADO", "ENTREGADO", "CANCELADO"]),
    motivo: z.string()
})