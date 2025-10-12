import {z} from "zod";
import {Types} from "mongoose";

export const cambioEstadoSchema = z.object({
    usuarioId: z.string().refine((val) => Types.ObjectId.isValid(val), {
        message: "usuarioId debe ser un ObjectId"
    }),
    estado: z.enum(["PENDIENTE","CONFIRMADO","EN_PREPARACION" ,"ENVIADO", "ENTREGADO", "CANCELADO"]),
    motivo: z.string()
})