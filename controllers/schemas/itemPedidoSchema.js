import {z} from "zod";

export const itemPedidoSchema = z.object({
    productoId: z.string(),
    cantidad: z.number().min(1)
})