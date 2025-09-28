import {ProductoDoesNotExist} from "../../errors/ProductoDoesNotExist.js";
import {ProductoSinStockError} from "../../errors/ProductoSinStockError.js";

class ProductosValidator {

    validarProducto(producto) {
        if (!producto) {
            throw new ProductoDoesNotExist()
        }

        return producto
    }

    validarStock(producto, cantidad) {
        if (!producto.estaDisponible(cantidad)) {
            throw new ProductoSinStockError()
        }

        return producto
    }
}


export default new ProductosValidator();