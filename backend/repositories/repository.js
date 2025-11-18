const limit = 9

export class Repository {
    constructor(model) {
        this.model = model
    }

    findBy(filters) {
        return this.model.find(filters)
    }

    findbyPage(page, filters, sort) {
        return this.model.countDocuments(filters)
            .then(total_documents => {
                const total_pages = Math.ceil(total_documents / limit) || 1
                const last_page = Math.min(page, total_pages)

                return this.model.find(filters)
                    .limit(limit)
                    .skip((last_page - 1) * limit)
                    .sort(sort)
            })
    }

    findById(object_id) {
        return this.model.findById(object_id)
    }

    save(object) {
        return this.model.create(object)
    }
}