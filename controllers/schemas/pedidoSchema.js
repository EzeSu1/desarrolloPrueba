import {z} from "zod";
import {itemPedidoSchema} from "./itemPedidoSchema.js";
import {direccionEntregaSchema} from "./direccionEntregaSchema.js";

export const pedidoSchema = z.object({
    compradorId: z.number(),
    items: itemPedidoSchema.array().min(1),
    moneda: z.enum(["PESO_ARG", "DOLAR_USA", "REAL"]),
    direccionEntrega: direccionEntregaSchema
})