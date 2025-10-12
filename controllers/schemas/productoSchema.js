import {z} from "zod";
import { Types } from "mongoose";
import {categoriaSchema} from "./categoriaSchema.js";

export const productoSchema = z.object({
    vendedorId: z.string().refine((val) => Types.ObjectId.isValid(val), {
        message: "vendedorId debe ser un ObjectId"
    }),
    titulo: z.string(),
    descripcion: z.string(),
    categorias: z.array(categoriaSchema),
    precio: z.number(),
    moneda: z.enum(["PESO_ARG", "DOLAR_USA", "REAL"]),
    stock: z.number(),
    fotos: z.string().array().min(1)
})