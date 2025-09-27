import ProductosRepository from "../repositories/productosRepository.js"
import UsuariosService from "./usuariosService.js"
import ProductosMapper from "../mappers/productosMapper.js";
import { InvalidProductRolError } from "../errors/InvalidProductRolError.js";
import { UserDoesNotExist } from "../errors/UserDoesNotExist.js";
import CategoriaMapper from "../mappers/categoriasMapper.js";



class ProductosService {
    constructor() {
        this.productoRepository = new ProductosRepository()

    }

    obtenerProducto(producto_id) {
        return this.productoRepository.findById(producto_id)
            .then(producto => producto)
    }

    crearProducto(nuevo_producto_json) {
        const vendedorId = nuevo_producto_json.vendedorId
        return UsuariosService.obtenerUsuario(vendedorId)
            .then(vendedor=>{
                if (!vendedor)      //TODO: hacerlo en validators
                    throw new UserDoesNotExist(vendedorId)
                if(vendedor.tipo !== "VENDEDOR")
                    throw new InvalidProductRolError(vendedorId)

                const categorias = CategoriaMapper.map(nuevo_producto_json.categorias) //
                const nuevo_producto = ProductosMapper.map(nuevo_producto_json, vendedor, categorias)
                return this.productoRepository.save(nuevo_producto)})
            .then(nuevo_producto => nuevo_producto)
    }
    /*
    static instance() {
        if (!ProductosService.singleton) {
            ProductosService.singleton = new ProductosService();
        }
        return ProductosService.singleton;
    }*/
}

export default new ProductosService();