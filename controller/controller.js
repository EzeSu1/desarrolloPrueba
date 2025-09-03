/*import { 
    Usuario, 
    TipoUsuario, 
    CambioEstadoPedido, 
    Moneda, 
    Estado, 
    Pedido, 
    ItemPedido, 
    Producto, 
    Categoria, 
    Notificacion, 
    FactoryNotificacion, 
    DireccionEntrega 
} from "./domain/domain.js";
*/
import { checkHealth } from "../service/service.js";

export const getHealth = (req, res) => {
  const status = checkHealth();
  res.status(200).json({ status });
};
