export class Repository {
    constructor(model) {
        this.model = model // función para mapear objetos JSON a instancias
    }



    findById(id) {
        return this.model.findById(id)

    }

    save(objeto) {
        return this.model.create(objeto)
            .then(obj => obj)
    }
}