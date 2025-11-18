import { useEffect, useState } from "react"
import {Box, Table, TableBody, TableCell, Tooltip, TableContainer, TableHead, TableRow, Paper, Chip, IconButton, Typography, Backdrop, Modal, Fade, Button} from "@mui/material"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { getUserIdFromLocalStorage } from "../localStorage"
import {getPedidos, getPedido, patchEstadoPedido} from "../services/PedidosService"
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'


const SellerOrdersPage = () => {
    const [pedidos, setPedidos] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null)

    const vendedorId = getUserIdFromLocalStorage()

    useEffect(() => {
        if (!vendedorId) return

        getPedidos({ vendedor: vendedorId })
            .then((data) => setPedidos(data))
            .catch(err => console.error(err))
    }, [vendedorId])

    const handleOpen = (order) => {
        return getPedido(order.id)
            .then(pedido => setSelectedOrder(pedido))
            .catch(err => console.error(err))
    }

    const handleClose = () => setSelectedOrder(null)

    const handleChangeEstado = (pedidoId, nuevoEstado, motivo) => {
        patchEstadoPedido(pedidoId, vendedorId, nuevoEstado, motivo)
            .then((pedidoActualizado) => {
                if (!pedidoActualizado) return
                setPedidos(prev => prev.map(p => p.id === pedidoId ? { ...p, estado: pedidoActualizado.estado } : p)) })
            .catch(err => console.error(err))
    }

    const renderEstado = (estado) => {
        const map = {
            PENDIENTE: { label: "Pendiente", color: "warning" },
            ACEPTADO: { label: "Aceptado", color: "success" },
            RECHAZADO: { label: "Rechazado", color: "error" },
            ENVIADO: { label: "Enviado", color: "info" }
        }
        return map[estado] || { label: estado, color: "default" }
    }


    return (
        <Box p={3}>
            <Typography variant="h5" mb={2}>Pedidos recibidos</Typography>

            <TableContainer component={Paper} elevation={2}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID Pedido</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                            <TableCell>Detalle</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {pedidos.map((order) => {
                            const est = renderEstado(order.estado)

                            return (
                                <TableRow key={order.id}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.comprador}</TableCell>
                                    <TableCell><Chip label={est.label} color={est.color} variant="outlined" size="small"/></TableCell>
                                    <TableCell>${order.total}</TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                                            {order.estado === "PENDIENTE" && (
                                                <Box>
                                                    <Tooltip title="Confirmar pedido">
                                                        <IconButton color="success" onClick={() => handleChangeEstado(order.id, "CONFIRMADO", "Pedido confirmado.")}>
                                                            <CheckCircleOutlineIcon size="small"/>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Cancelar pedido">
                                                        <IconButton color="error" onClick={() => handleChangeEstado(order.id, "CANCELADO", "Pedido cancelado.")}>
                                                            <CancelOutlinedIcon size="small"/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            )}
                                            {order.estado === "CONFIRMADO" && (
                                                <Tooltip title="Marcar como 'En preparación'">
                                                    <IconButton color="info" onClick={() => handleChangeEstado(order.id, "EN_PREPARACION", "Pedido en preparación.")}>
                                                        <ListAltOutlinedIcon size="small"/>
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                            {order.estado === "EN_PREPARACION" && (
                                                <Tooltip title="Marcar como 'Enviado'">
                                                    <IconButton color="info" onClick={() => handleChangeEstado(order.id, "ENVIADO", "Pedido enviado.")}>
                                                        <LocalShippingIcon size="small"/>
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                            {order.estado === "ENVIADO" && (
                                                <Tooltip title="Marcar como 'Enviado'">
                                                    <IconButton color="info" onClick={() => handleChangeEstado(order.id, "ENTREGADO", "Pedido entregado.")}>
                                                        <EmailOutlinedIcon size="small"/>
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => handleOpen(order)}>
                                            <InfoOutlinedIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={!!selectedOrder} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 300 } }}>
                <Fade in={!!selectedOrder}>
                    <Box
                        sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", borderRadius: 2, boxShadow: 24, p: 4, width: "400px", backdropFilter: "blur(6px)" }}>
                        {selectedOrder && (
                            <Box>
                                <Typography variant="h6" mb={2}>Pedido #{selectedOrder.id}</Typography>
                                <Typography variant="body2" mb={1}>Cliente: {selectedOrder.comprador}</Typography>
                                <Typography variant="body2" mb={1}>Total: ${selectedOrder.total}</Typography>
                                <Typography variant="subtitle2" mt={2}>Productos:</Typography>

                                {selectedOrder.items?.map((item) => (
                                    <Box sx={{ my: 1 }}>
                                        <Typography variant="body2">
                                            • {item.producto || "Producto"} — x{item.cantidad}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>
                </Fade>
            </Modal>
        </Box>
    )
}

export default SellerOrdersPage;
