import { z } from "zod";

export const idTransform = z.string().transform(((val, ctx)  => {
    const num = Number(val);
    if (isNaN(num)) {
        ctx.addIssue({
            code: "INVALID_ID",
            message: "id must be a number"
        });
        return z.NEVER;
    }
    return num;
}))



export const compradorSchema = z.object({
    id: z.number(),    //idTransform,
    nombre: z.string(),
    email: z.string(),
    telefono: z.string(),
    tipo: z.enum(["COMPRADOR", "VENDEDOR", "ADMIN"]),
    fecha: z.preprocess(val => new Date(val), z.date()) // z.date()
})

export const usuarioSchema2 = z.object({
    nombre: z.string(),
    email: z.string(),
    telefono: z.string(),
    tipo: z.enum(["COMPRADOR", "VENDEDOR", "ADMIN"])
})

const categoriaSchema = z.object(
    {
        nombre: z.string()

    }
)


const itemPedidoSchema = z.object({
    productoId: z.number(),
    cantidad: z.number().min(1)
})

export const direccionEntregaSchema= z.object({
    usuarioId: z.number(),
    calle: z.string(),
    altura: z.number(),
    piso : z.number(),
    departamento: z.string(),
    codigo_postal: z.string(),
    ciudad: z.string(),
    provincia: z.string(),
    pais: z.string(),
    latitud: z.number(),
    longitud: z.number()
})

export const pedidoSchema = z.object({
    compradorId: z.number(),
    items: itemPedidoSchema.array().min(1),
    moneda: z.enum(["PESO_ARG", "DOLAR_USA", "REAL"]),
    direccionEntrega: direccionEntregaSchema
})


export const productoSchema2 = z.object({
    vendedorId: z.number(),
    titulo: z.string(),
    descripcion: z.string(),
    categorias: z.array(categoriaSchema),
    precio: z.number(),
    moneda: z.enum(["PESO_ARG", "DOLAR_USA", "REAL"]),
    stock: z.number(),
    fotos: z.string().array().min(1)
})
