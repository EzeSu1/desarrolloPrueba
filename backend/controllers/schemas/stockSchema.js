import {z} from "zod";

export const stockSchema = z.object({
    cantidad: z.number()
})