export class Usuario{
    constructor(nombre, email, telefono, tipoUsuario){
        this.id=Usuario.crearId();
        this.nombre= nombre;
        this.email= email;
        this.telefono=telefono;
        this.tipoUsuario=tipoUsuario;
        this.fechaAlta= new Date();
    }

    static crearId(){
        if(!this.ultimoId) {
            this.ultimoId=1;        
        }
        return this.ultimoId++; 
    }
}

export const TipoUsuario = Object.freeze({
    COMPRADOR: "COMPRADOR",
    VENDEDOR: "VENDEDOR",
    ADMIN: "ADMIN"
})


export class CambioEstadoPedido{
    constructor(estado, pedido, usuario, motivo){
        this.fecha= new Date();
        this.estado= estado;
        this.pedido= pedido;
        this.usuario= usuario;
        this.motivo= motivo;    
    }
}

export const Moneda = Object.freeze({
    PESO_ARG: "PESO_ARG",
    DOLAR_USA: "DOLAR_USA",
    REAL: "REAL"
})

export const Estado = Object.freeze({
    PENDIENTE: "PENDIENTE",
    CONFIRMADO: "CONFIRMADO",
    EN_PREPARACION: "EN_PREPARACION",
    ENVIADO: "ENVIADO",
    ENTREGADO: "ENTREGADO",
    CANCELADO: "CANCELADO"
})


export class Pedido{
    constructor(comprador, moneda,items, direccionEntrega, estado){
        this.id=Pedido.crearId();
        this.comprador=comprador;
        this.items=items; 
        this.total=this.calcularTotal();
        this.moneda=moneda;
        this.direccionEntrega=direccionEntrega;
        this.estado=estado;
        this.fechaCreacion=new Date();
        this.historialEstado=[];
        if (this.historialEstado.length==0){
            this.agregarCambioEstado(estado.PENDIENTE, comprador, "Creacion del pedido");
        }
        
        
    }

    static crearId(){
        if(!this.ultimoId){
            this.ultimoId=1;
        }
        return this.ultimoId++;
    }

    calcularTotal(){
        return this.items.reduce((acc, item) =>acc + item.subtotal(), 0);
      
    }

    actualizarEstado(nuevoEstado, quien, motivo){
        this.estado=nuevoEstado;
        this.agregarCambioEstado(nuevoEstado, quien, motivo);
       
    }

    agregarCambioEstado(nuevoEstado , quien, motivo){
        const cambioEstado= new CambioEstadoPedido(nuevoEstado, this, quien, motivo);
        this.historialEstado.push(cambioEstado);
    }

    validarStock(){
        return Boolean;
    }


}

export class ItemPedido {
    constructor(producto, cantidad, precioUnitario){
        this.producto=producto;
        this.cantidad=cantidad;
        this.precioUnitario=precioUnitario;
    }

    subtotal() {
        return this.cantidad * this.precioUnitario;
    }
}

export class Producto{
    constructor(vendedor,titulo,descripcion, precio, moneda){
        this.id=Producto.crearId();
        this.vendedor=vendedor;
        this.titulo=titulo;
        this.descripcion=descripcion;
        this.precio=precio;
        this.moneda=moneda;
        this.stock=0;
        this.fotos=[];
        this.categoria=[];
        this.activo=false;
    }

    estaDisponible(){
        return this.activo && this.stock>0;
    }
    

    aumentarStock(cantidad){
        if (cantidad>0){
            this.stock+=cantidad;
        }
    }

    disminuirStock(cantidad){
        if (cantidad>0 && this.stock>=cantidad){
            this.stock-=cantidad;
        }   
    }

    activar(){
        this.activo=true;
    }
}

export class Categoria{
    constructor(nombre){
        this.nombre=nombre;
    }
}

export class Notificacion{
    constructor(usuarioDestino, mensaje){
        this.id=Notificacion.crearId();
        this.usuarioDestino=usuarioDestino;
        this.mensaje=mensaje;
        this.fechaAlta=new Date();
        this.fechaLeida=null;
        this.leida=false;
    }

    static crearId(){
        if(!this.ultimoId){
            this.ultimoId=1;
        }
        return this.ultimoId++;
    }
    
    marcarComoLeida(){
        this.fechaLeida= new Date();
        this.leida=true;
    }
}

export class FactoryNotificacion extends Notificacion{
    crearSegunEstado(estado){
        return "Notificacion segun estado: "+estado;
    }

    crearSegunPedido(pedido){
        const notificacion= new Notificacion(pedido.comprador, "Su pedido con id "+pedido.id+" ha cambiado de estado a "+pedido.estado);
        return notificacion;
    }
}

export class DireccionEntrega{
    constructor(calle, altura, piso, departamento, codigoPostal, ciudad, provincia, pais, lat, lon){
        this.calle=calle;
        this.altura=altura;
        this.piso=piso;
        this.departamento=departamento;
        this.codigoPostal=codigoPostal;
        this.ciudad=ciudad;
        this.provincia=provincia;
        this.pais=pais;
        this.lat=lat;
        this.lon=lon;
    }
}

const usuario1= new Usuario("Ezequiel", "dds@frba.utn.edu.ar", "1234", TipoUsuario.COMPRADOR);
console.log("usuario:", usuario1);

const usuario2= new Usuario("Pedro", "dds@frba.utn.edu.ar", "4321", TipoUsuario.COMPRADOR);
console.log("usuario:", usuario2);


// POST DATOS -> Router
// DATOS -> Error Handler: Que hace?