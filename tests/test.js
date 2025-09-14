import Pedido from "../models/entities/pedido.js"
import Usuario from "../models/enities/usuario.js"
import Producto from "../models/entities/producto.js"
import Categoria from "../models/entities/categoria.js"

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

// Items(producto, cantidad)
const itemPedido1 = new ItemPedido(producto1, 20)
const itemPedido2 = new ItemPedido(producto2, 20)

// Direcciones

// Casos comunes
const producto1 = new Producto(Usuario, "Inodoro", "una decripcion", catP2 , 400, moneda.PESO_ARG, 5, "una foto");
const producto2 = new Producto(Usuario, "Spar", "una decripcion", catP1 , 900, moneda.PESO_ARG, 10, "una foto");

// Casos especiales
const productoSinStock = new Producto(Usuario, "Sin stock", "una decripcion", catP2 , 400, moneda.PESO_ARG, 0, "una foto");
const productoDesactivado =  new Producto(Usuario, "Desactivado", "una decripcion", catP2 , 400, moneda.PESO_ARG, 0, "una foto");
productoDesactivado.setActivado(false);

try{
    const pedido = new Pedido(usuarioComprador, [], moneda.PESO_ARG, direccionEntrega)
    console.log("Pedido creado")
}
catch(error) {
    console.log(error.message)
}


// Creacion de pedido, validando stock disponible de cada producto
function crearPedido(producto) {
    if(producto.estaDisponible()) {
        const pedido = new Pedido(comprador, [producto1, producto2], total, moneda, direccionEntrega)
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