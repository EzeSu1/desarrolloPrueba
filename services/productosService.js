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
    mostrarProductos(filtros) {
        return this.productosRepository.findbyPage(filtros)
            .then(producto => ProductosValidator.validarProducto(producto))
    }

    obtenerProducto(producto_id) {
        return this.productosRepository.findById(producto_id)
            .then(producto => ProductosValidator.validarProducto(producto))
    }

    // TODO: REDUCIR
    crearProducto(nuevo_producto_json) {
        const vendedor_id = nuevo_producto_json.vendedorId

        return UsuariosService.obtenerUsuario(vendedor_id)
            .then(vendedor =>{
                UsuariosValidator.validarVendedor(vendedor)
                const categorias = CategoriaMapper.map(nuevo_producto_json.categorias) //
                const nuevo_producto = ProductosMapper.map(nuevo_producto_json, vendedor, categorias)
                return this.productosRepository.save(nuevo_producto)})
            .then(nuevo_producto => nuevo_producto) // TODO: SACAR
    }
}

/*
return this.productoRepository.save(
  ProductosMapper.map(
    nuevo_producto_json,
    vendedor,
    CategoriaMapper.map(nuevo_producto_json.categorias)
  )
);

 */

export default new ProductosService();