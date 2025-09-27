import {Pedido} from "../models/entities/pedido.js"
import {Usuario} from "../models/entities/usuario.js"
import {Producto} from "../models/entities/producto.js"
import {Categoria} from "../models/entities/categoria.js"
import {Moneda} from "../models/enums/moneda.js"
import {ItemPedido} from "../models/entities/itemPedido.js";
import {DireccionEntrega} from "../models/entities/direccionEntrega.js";

// Categorias
const categoria1 = new Categoria("Cocina");
const categoria2 = new Categoria("Banio");
const categoria3 = new Categoria("Electrodomestico");

// Conjuntos de categorias
const catP2 = [categoria2];
const catP1 = [categoria1, categoria3];

// Usuarios
const usuarioVendedor = new Usuario("Julian", "aparalastruquen@hotmail.com", 35335874, "hetero");
const usuarioComprador = new Usuario("Juan", "soygaypapisoygay@hotmail.com", 23212231, "gay");

// Casos comunes
const producto1 = new Producto(usuarioVendedor, "Inodoro", "una decripcion", catP2 , 400, Moneda.PESO_ARG, 5, "una foto");
const producto2 = new Producto(usuarioVendedor, "Spar", "una decripcion", catP1 , 900, Moneda.PESO_ARG, 10, "una foto");


// Items(producto, cantidad)

const itemPedido1 = new ItemPedido(producto1, 20)

const itemPedido2 = new ItemPedido(producto2, 20)
const productoSinStock = new Producto(Usuario, "Cocacola", "una decripcion", catP2 , 400, Moneda.PESO_ARG, 0, "una foto");
const itemPedidoSinStock = new ItemPedido(productoSinStock, 20)



// Direcciones
const direccionEntrega = new DireccionEntrega(usuarioComprador, "Av. Siempre Viva", 123, 4, "B", "1234", "Springfield", "Buenos Aires", "Argentina", -34.6037, -58.3816)

// Casos especiales
const productoSinStock = new Producto(Usuario, "Cocacola", "una decripcion", catP2 , 400, Moneda.PESO_ARG, 0, "una foto");
const productoDesactivado =  new Producto(Usuario, "Desactivado", "una decripcion", catP2 , 400, Moneda.PESO_ARG, 0, "una foto");
productoDesactivado.setActivo(false);

try{
    const pedido = new Pedido(usuarioComprador, [itemPedidoSinStock], Moneda.PESO_ARG, direccionEntrega)
    console.log("Pedido creado")
}
catch(error) {
    console.log(error.message)
}


// Creacion de pedido, validando stock disponible de cada producto
function crearPedido(producto) {
    if(producto.estaDisponible()) {
        const pedido = new Pedido(usuarioComprador, [producto1, producto2], total, moneda, direccionEntrega)
        return "Pedido creado"
    }        
    else{
        return "No se pudo crear el pedido"
    }
    
}

/*const idTransform = z.string().transform(((val, ctx)  => {
    const num = Number(val);
    if (isNaN(num)) {
        ctx.addIssue({
            code: "INVALID_ID",
            message: "id must be a number"
        });
        return z.NEVER;
    }
    return num;
}))

const alojamientoSchema = z.object({
    nombre: z.string().min(3).max(20),
    categoria: z.string(),
    precioPorNoche: z.number().nonnegative()
})
*/

// Pedido: constructor(comprador, items, total, moneda, direccionEntrega) 
// Producto: constructor(vendedor, titulo, descripcion, categoria, precio, moneda, stock, fotos) 