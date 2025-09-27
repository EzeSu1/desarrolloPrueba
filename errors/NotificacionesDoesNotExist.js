export class NotificacionesDoesNotExist extends Error{
    constructor(id) {
        super();
        this.message = "El usuario con id: "+id+ ", no tiene notificaiones"
    }
}