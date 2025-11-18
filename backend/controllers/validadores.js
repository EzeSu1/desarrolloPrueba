import { z } from "zod";
import { Types } from "mongoose";


export const idTransform = z.string().transform((value, ctx) => {
    if (!Types.ObjectId.isValid(value)) {
        ctx.addIssue({
            code: "INVALID_ID",
            message: "Debe ser un ObjectId"
        });
        return z.NEVER;
    }
    return value; // devuelve el string válido
});


export function validarIdParam(req, res) {
    const result = idTransform.safeParse(req.params.id);

    if (!result.success) {
        return res.status(400).json(result.error.issues);
    }

    return result.data; // devuelve el string validado
}



export function showBodyErrors(req, res, result_body) {
    const errores = result_body.error.issues.map(e => ({
        path: e.path.join("."),
        message: e.message
    }));

    return res.status(400).json({errores})
}