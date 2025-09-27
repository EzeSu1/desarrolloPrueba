import { Categoria } from "../models/entities/categoria.js";
import { Producto } from "../models/entities/producto.js";
import {Usuario} from "../models/entities/usuario.js";
import usuariosMapper from "./usuariosMapper.js";



class ProductosMapper{
    map(productoJson, vendedor, categorias) {
        return new Producto(vendedor, productoJson.titulo, productoJson.descripcion, categorias, productoJson.precio, productoJson.moneda, productoJson.stock, productoJson.fotos)
    }

    mapToProductosObject(dataObjects) {
        return dataObjects.map(this.mapToProductoObject);
    }

    mapToProductoObject(dataObjects){
        const { titulo, descripcion, categorias, precio, moneda, stock, fotos } = dataObjects
        const vendedor = usuariosMapper.mapToUsuarioObject(dataObjects.vendedor)
        const producto = new Producto(vendedor, titulo, descripcion, categorias, precio, moneda, stock, fotos)
        producto.id = dataObjects.id
        return producto;
    }

}

export default new ProductosMapper();