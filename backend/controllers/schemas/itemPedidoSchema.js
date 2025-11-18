import {z} from "zod";
import {Types} from "mongoose";

export const itemPedidoSchema = z.object({
    productoId: z.string().refine((val) => Types.ObjectId.isValid(val), {
        message: "productoId debe ser un ObjectId"
    }),
    cantidad: z.number().min(1)
})