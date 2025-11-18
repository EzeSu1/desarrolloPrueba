# Changelog

## [1.0.0] - 2025-09-16

### Added
- Se agregaron las capas de `routes`, `controllers`, `services` y `repository`.
- Se agregaron endpoints para usuarios, pedidos y productos.
- Se implementaron DTOs para pedidos, productos y usuarios.
- Validación de datos de entrada con `zod` en los controladores.
- Rutas para health-check, pedidos, productos y usuarios.


## [1.1.0] - 2025-09-24

### Added
- Se adaptaron los métodos de las capas de services y repository para trabajar con promesas.
- Implementación de middleware HandlerError para centralizar el manejo de errores en la API.

### Removed
- Se eliminaron las capas de routes, controllers, services y repository de direcciones.
- Se removió la lógica de verificación de stock de productos en el constructor de Pedido.

### Changed
- La lógica de verificación de stock de cada uno de los items de pedidos se trasladó a PedidosService, centralizando la lógica de negocio en el servicio correspondiente.