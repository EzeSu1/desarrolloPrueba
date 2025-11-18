import NotificacionesService from "../services/notificacionesService.js";
import {validarIdParam} from "./validadores.js";
import notificacionesDTOs from "../DTOs/notificacionesDTOs.js";

class NotificacionController {
    leerNotificacion(req, res) {
        const notificacion_id = validarIdParam(req, res)

        return NotificacionesService.leerNotificacion(notificacion_id)
            .then(notificacion => res.status(200).json(notificacionesDTOs.notificacionToDTO(notificacion)))
    }
}


export default new NotificacionController();