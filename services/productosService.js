import ProductosRepository from "../repositories/productosRepository.js"
import UsuariosService from "./usuariosService.js"
import ProductosMapper from "../mappers/productosMapper.js";
import CategoriaMapper from "../mappers/categoriasMapper.js";
import ProductosValidator from "./validators/productosValidator.js"
import UsuariosValidator from "./validators/usuariosValidator.js";



class ProductosService {
    constructor() {
        this.productosRepository = new ProductosRepository()
    }

    obtenerProducto(productoId) {
        return this.productosRepository.findById(productoId)
            .then(producto => ProductosValidator.validarProducto(producto))
    }

    obtenerProductosPaginado(pagina, filtros, ordenamiento) {
        return this.productosRepository.findbyPage(pagina, filtros, ordenamiento)
    }

    crearProducto(nuevoProductoJson) {
        const vendedor_id = nuevoProductoJson.vendedorId

        return UsuariosService.obtenerUsuario(vendedor_id)
            .then(vendedor => {
                UsuariosValidator.validarVendedor(vendedor)
                const categorias = CategoriaMapper.map(nuevoProductoJson.categorias) //
                const nuevo_producto = ProductosMapper.map(nuevoProductoJson, vendedor, categorias)
                return this.productosRepository.save(nuevo_producto)})
    }
}


export default new ProductosService();