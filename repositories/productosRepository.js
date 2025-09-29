import ProductosMapper from "../mappers/productosMapper.js";
import {Repository} from "./repository.js";
import {ProductoModel} from "../models/entities/producto.js";
import {sortMethod} from "./functions/sortMethod.js";
import {obtenerRango} from "./functions/obtenerRango.js";



class ProductosRepository  extends Repository{
    constructor() {
        super(ProductoModel);
    }
    findbyPage(filtros){
        const {page, sort, maxPrice, minPrice}= filtros
        return this.model.find(obtenerRango( minPrice, maxPrice))
            .limit(3)
            .skip((page-1)*(3))
            .sort(sortMethod(sort))

    }
}


export default ProductosRepository