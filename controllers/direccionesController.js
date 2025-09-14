import DireccionesService from "../services/direccionesService.js"
import { idTransform, direccionEntregaSchema } from "./validadores.js";

class DireccionesController {
    obtenerDireccion(req, res) {
        const resultId = idTransform.safeParse(req.params.id)

        if (resultId.error) {
            res.status(400).json(resultId.error.issues)
            return
        }

        const direccion = DireccionesService.obtenerDireccion(resultId.data);

        if (!direccion) {
            res.status(404).json({error: "Direccion no encontrada con ese ID"})
            return
        }

        res.status(200).json(direccion)
    }

    crearDireccion(req, res) {
        const resultBody = direccionEntregaSchema.safeParse(req.body)

        if (!resultBody.success) {
            res.status(400).json(resultBody.error.issues)
            return
        }

        const direccionCreada = DireccionesService.crearDireccion(resultBody.data);

        if (!direccionCreada) {
            res.status(500).json({error: "Error al crear la direccion"})
            return
        }

        res.status(201).json(direccionCreada)
    }

    actualizarDireccion(req, res) {
        const resultId = idTransform.safeParse(req.params.id)
        const resultBody = direccionEntregaSchema.safeParse(req.body)

        if (!resultBody.success || resultId.error) {
            res.status(400).json(resultBody.error.issues)
            return
        }

        const idDireccion = resultId.data
        const nuevaDireccion = resultBody.data

        const nuevaDireccionGuardada = DireccionesService.actualizarDireccion(nuevaDireccion, idDireccion)

        res.status(200).json(nuevaDireccionGuardada)
    }

    eliminarDireccion(req,res) {
        const resultId = idTransform.safeParse(req.params.id)

        if(resultId.error) {
            res.status(400).json(resultId.error.issues)
            return
        }

        const nuevaDireccionGuardada = DireccionesService.eliminarDireccion(resultId.data)

        res.status(204).json(nuevaDireccionGuardada)
    }
}

export default new DireccionesController()