import {useEffect, useState} from "react"
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton,
    Typography,
    Backdrop,
    Modal,
    Fade,
    Button,
} from "@mui/material"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import { useTheme } from "@mui/material/styles"
import {getUserIdFromLocalStorage} from "../localStorage"
import {getPedidosComprador, patchEstadoPedido} from "../services/PedidosService"
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

const OrdersPage = () => {
    const [pedidos, setPedidos] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null)
    const theme = useTheme()
    const compradorId = getUserIdFromLocalStorage()
    const estadoMap = { PENDIENTE: "pending", CONFIRMADO: "confirmed", EN_PREPARACION: "inPreparation", ENVIADO: "shipped", ENTREGADO: "delivered", CANCELADO: "canceled" }

    useEffect(() => {
        if (!compradorId) return;

        getPedidosComprador(compradorId)
            .then(pedidos_obtenidos => {
                setPedidos(pedidos_obtenidos)
            })
            .catch(err => console.error(err))
    }, [compradorId])

    const handleCancelarPedido = (pedidoId) => {
        patchEstadoPedido(pedidoId, compradorId, "CANCELADO", "Pedido cancelado por el comprador.")
            .then((pedidoActualizado) => {
                if (!pedidoActualizado) return
                setPedidos(prev => prev.map(p => p.id === pedidoId ? { ...p, estado: "CANCELADO" } : p))
                handleClose()
            })
            .catch(err => console.error(err))
    }

    const handleOpen = (order) => setSelectedOrder(order)
    const handleClose = () => setSelectedOrder(null)



    return (
        <Box p={3}>
            <Typography variant="h5" mb={2}>Mis pedidos</Typography>

            <TableContainer component={Paper} elevation={2}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Pedido ID</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell align="right">Detalle</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {pedidos.map((order) => (
                            <TableRow key={order.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>
                                    <Chip label={order.estado} sx={{ backgroundColor: theme.palette.orderStatus?.[estadoMap[order.estado]], color: "#fff" }} size="small"/>
                                </TableCell>
                                <TableCell align="right"><IconButton color="primary" onClick={() => handleOpen(order)}><InfoOutlinedIcon /></IconButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={!!selectedOrder} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 300 } }}>
                <Fade in={!!selectedOrder}>
                    <Box
                        sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", borderRadius: 2, boxShadow: 24, p: 4, width: "400px", backdropFilter: "blur(6px)",}}>
                        {selectedOrder && (
                            <Box>
                                <Typography variant="h6" mb={2}>Detalle del Pedido {selectedOrder.id}</Typography>
                                <Typography variant="body2" mb={1}>Estado: <strong>{selectedOrder.estado}</strong></Typography>
                                <Typography variant="body2" mb={1}>Moneda: {selectedOrder.moneda}</Typography>

                                <Typography variant="subtitle2" mt={2}>Dirección de Entrega:</Typography>
                                <Typography variant="body2">
                                    {selectedOrder.direccion_entrega.calle}{" "}
                                    {selectedOrder.direccion_entrega.altura},{" "}
                                    {selectedOrder.direccion_entrega.ciudad},{" "}
                                    {selectedOrder.direccion_entrega.provincia},{" "}
                                    {selectedOrder.direccion_entrega.pais}
                                </Typography>

                                {selectedOrder.estado !== "ENVIADO" &&
                                    selectedOrder.estado !== "CANCELADO" &&
                                    selectedOrder.estado !== "ENTREGADO" && (
                                        <Box mt={3} textAlign="center">
                                            <Button variant="contained" color="error" onClick={() => handleCancelarPedido(selectedOrder.id)} startIcon={<CancelOutlinedIcon />}>
                                                Cancelar Pedido
                                            </Button>
                                        </Box>
                                    )}
                            </Box>
                        )}
                    </Box>
                </Fade>
            </Modal>
        </Box>
    )
}

export default OrdersPage;
