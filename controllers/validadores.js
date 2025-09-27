import { z } from "zod";

export const idTransform = z.string().transform(((value, ctx)  => {
    const number = Number(value);

    if (isNaN(number)) {
        ctx.addIssue({
            code: "INVALID_ID",
            message: "id must be a number"
        });

        return z.NEVER;
    }

    return number;
}))


export function validarIdParam(req, res) {
    const result_id = idTransform.safeParse(req.params.id)

    if(result_id.error) {
        return res.status(400).json(result_id.error.issues)
    }

    return result_id.data
}


export function showBodyErrors(req, res, result_body) {
    const errores = result_body.error.issues.map(e => ({
        path: e.path.join("."),
        message: e.message
    }));

    res.status(400).json({errores})
}