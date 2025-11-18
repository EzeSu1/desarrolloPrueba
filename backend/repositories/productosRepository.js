import {Repository} from "./repository.js";
import {ProductModel} from "../models/entities/producto.js";

const limit = 9

class ProductosRepository  extends Repository {
    constructor() {
        super(ProductModel);
    }

    updateQuantitySold(object) {
        const object_id = object.producto._id
        const update =  { $inc: { cantidadVendida: object.cantidad || 0 } }
        const options = { new: true }

        return this.model.findByIdAndUpdate(object_id, update, options)
    }

    decreaseStock(object) {
        const object_id = object.producto._id
        const update = { $inc: { stock: -object.cantidad } }
        const options = { new: true }

        return this.model.findByIdAndUpdate(object_id, update, options)
    }

    countPages() {
        return this.model.countDocuments({ activo: true })
            .then(total_documents => Math.ceil(total_documents / limit) || 1 )
    }

    incrementStock(productoId, cantidad) {
        const update = { $inc: { stock: +cantidad } };
        const options = { new: true };
        console.log(productoId, update, options)
        return this.model.findByIdAndUpdate(productoId, update, options);
    }
}

export default new ProductosRepository()