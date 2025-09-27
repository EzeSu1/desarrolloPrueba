export class Usuario {
    constructor(nombre, email, telefono, tipo) {
        this.id = null
        this.nombre = nombre
        this.email = email
        this.telefono = telefono
        this.tipo = tipo
        this.fecha_alta = new Date()
    }

    getId() {
        return this.id
    }
}