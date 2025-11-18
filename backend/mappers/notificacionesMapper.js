import {Notificacion} from "../models/entities/notificacion.js";
import UsuariosMapper from "./usuariosMapper.js";



class NotificacionesMapper {

    mapToNotificacionesObject(dataObjects) {
        return dataObjects.map(this.mapToNotificacionObject);
    }

    mapToNotificacionObject(dataObjects){
        const usuario = UsuariosMapper.mapToUsuarioObject(dataObjects.usuario_destino)
        const notificacion = new Notificacion(usuario, dataObjects.mensaje)
        notificacion.id = dataObjects.id
        notificacion.fecha_alta= new Date(dataObjects.fecha_alta)
        notificacion.fecha_leida= dataObjects.fecha_leida ? new Date(dataObjects.fecha_leida) :  null;
        return notificacion;
    }
}


export default new NotificacionesMapper()