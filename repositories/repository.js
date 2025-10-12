export class Repository {
    constructor(model) {
        this.model = model
    }

    findAll() {
        return this.model.find()
    }

    findById(object_id) {
        return this.model.findById(object_id)
    }

    save(object) {
        return this.model.create(object)
    }
}