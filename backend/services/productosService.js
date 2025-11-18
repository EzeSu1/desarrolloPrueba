import ProductosRepository from "../repositories/productosRepository.js"
import UsuariosService from "./usuariosService.js"
import ProductosMapper from "../mappers/productosMapper.js";
import CategoriaMapper from "../mappers/categoriasMapper.js";
import ProductosValidator from "./validators/productosValidator.js"
import UsuariosValidator from "./validators/usuariosValidator.js";
import CategoriasService from "./categoriasService.js";
import CategoriasValidator from "./validators/categoriasValidator.js";


class ProductosService {
    obtenerProducto(producto_id) {
        return ProductosRepository.findById(producto_id)
            .then(producto => ProductosValidator.validarProducto(producto))
    }

    obtenerProductosPaginado(pagina, filtros, ordenamiento) {
        return ProductosRepository.findbyPage(pagina, filtros, ordenamiento)
            .then(productos => ProductosValidator.validarProductos(productos))
    }

    crearProducto(nuevoProductoJson) {
        const vendedor_id = nuevoProductoJson.vendedorId

        return UsuariosService.obtenerUsuario(vendedor_id)
            .then(vendedor => {
                UsuariosValidator.validarVendedor(vendedor)
                nuevoProductoJson.categorias.forEach(categoria_JSON => CategoriasService.obtenerCategoria(categoria_JSON.nombre))
                CategoriasValidator.validarUnicidad(nuevoProductoJson.categorias)
                const nuevo_producto = ProductosMapper.map(nuevoProductoJson, vendedor, nuevoProductoJson.categorias)
                return ProductosRepository.save(nuevo_producto)
            })
    }

    reducirStock(items) {
        return Promise.all(
            items.map(item => ProductosRepository.decreaseStock(item))
        )
    }

    obtenerVendedor(productoId) {
        return ProductosRepository.findById(productoId)
            .then(producto => producto.vendedor )
    }

    agregarVentas(items) {
        return Promise.all(
            items.map(item => ProductosRepository.updateQuantitySold(item))
        )
    }

    paginasTotales() {
        return ProductosRepository.countPages()
    }

    agregarStock(productoId, cantidad) {
        console.log(productoId)
        return ProductosRepository.incrementStock(productoId, cantidad)
            .then(producto_actualizado => ProductosValidator.validarProducto(producto_actualizado))
    }
}

export default new ProductosService();