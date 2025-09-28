import NotificacionesMapper from "../mappers/notificacionesMapper.js";
import {Repository} from "./repository.js";
import fs from "node:fs/promises";



class NotificacionesRepository extends Repository {

    constructor() {
        super("notificaciones.json",(data) => NotificacionesMapper.mapToNotificacionesObject(data));
    }

    findByUserId(userId) {
        return this.getAll()
            .then(notificaciones=>{
                return notificaciones.filter(n => n.usuario_destino.id === Number(userId))
            })
    }
}


export default NotificacionesRepository