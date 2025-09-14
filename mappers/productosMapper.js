import { Categoria } from "../models/entities/categoria.js";
import { Producto } from "../models/entities/producto.js";

class ProductosMapper{
    map(productoJson, vendedor, categorias) {
        return new Producto(vendedor, productoJson.titulo, productoJson.descripcion, categorias, productoJson.precio, productoJson.moneda, productoJson.stock, productoJson.fotos)
    }
}

export default new ProductosMapper();