import {z} from "zod";

export const itemPedidoSchema = z.object({
    productoId: z.number(),
    cantidad: z.number().min(1)
})