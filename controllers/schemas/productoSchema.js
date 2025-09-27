import {z} from "zod";
import {categoriaSchema} from "./categoriaSchema.js";

export const productoSchema = z.object({
    vendedorId: z.number(),
    titulo: z.string(),
    descripcion: z.string(),
    categorias: z.array(categoriaSchema),
    precio: z.number(),
    moneda: z.enum(["PESO_ARG", "DOLAR_USA", "REAL"]),
    stock: z.number(),
    fotos: z.string().array().min(1)
})