import ProductosRepository from "../repositories/productosRepository.js"
import { Producto } from "../models/entities/producto.js"
import { Categoria } from "../models/entities/categoria.js"
import UsuariosService from "./usuariosService.js"
import ProductosMapper from "../mappers/productosMapper.js";

class ProductoService {
    constructor() {
        this.productoRepository = new ProductosRepository()
    }

    obtenerProducto(id) {
        return this.productoRepository.findById(id)
    }

    //(vendedor, titulo, descripcion, categorias, precio, moneda, stock, fotos)  //falta schemaproducto
     crearProducto(nuevoProductoJson) {
        const vendedor = UsuariosService.obtenerUsuario(nuevoProductoJson.vendedorId)

        if (!vendedor || vendedor.tipo !== "VENDEDOR") {  //capaz la verificacion de tipo va en el controlador
            throw new Error("Vendedor no existe o no es un vendedor")
        }

        const categorias = nuevoProductoJson.categorias.map(c => new Categoria(c.nombre));
        const nuevoProducto = ProductosMapper.map(nuevoProductoJson, vendedor, categorias)

         // console.log(`+++++++++ Producto con id ${nuevoProducto.id} tiene stock ${nuevoProducto.stock}`)

        return this.productoRepository.save(nuevoProducto)
    }
    //TODO: deberia ser error 500 si no existe el vendedor?



}

export default new ProductoService()