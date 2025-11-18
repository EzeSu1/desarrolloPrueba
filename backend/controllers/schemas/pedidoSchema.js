import {z} from "zod";
import { Types } from "mongoose";
import {itemPedidoSchema} from "./itemPedidoSchema.js";
import {direccionEntregaSchema} from "./direccionEntregaSchema.js";

export const pedidoSchema = z.object({
    compradorId: z.string().refine((val) => Types.ObjectId.isValid(val), {
        message: "compradorId debe ser un ObjectId"
    }),
    items: itemPedidoSchema.array().min(1),
    moneda: z.enum(["PESO_ARG", "DOLAR_USA", "REAL"]),
    direccionEntrega: direccionEntregaSchema
})