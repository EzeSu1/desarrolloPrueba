import { Box, Divider, Typography, List, ListItem, Card, TextField, Stack, Button, Grid, Container } from "@mui/material";
import React, { useState } from "react";
import { useCartContext } from "../contexts/cartContext";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {armarPedido} from "../services/ProductosService";
import {useNavigate} from "react-router-dom";


const getUserIdFromLocalStorage = () => {

    const userDataString = localStorage.getItem('user_data');


    if (!userDataString || userDataString === 'undefined') return null;

    try {

        const userData = JSON.parse(userDataString);


        return userData.id || null;
    } catch (e) {

        console.error("Error al parsear user_data de localStorage:", e);
        return null;
    }
};

const initialAddressState = {
    calle: '',
    altura: '',
    piso: '',
    departamento: '',
    codigoPostal: '',
    ciudad: '',
    provincia: '',
    pais: '',
    latitud: '',
    longitud: '',
};

const CheckoutProducts = () => {
    const { cartItems, subtotal, clearCart } = useCartContext();

    //  Mover el estado de la dirección al componente principal
    const [addressData, setAddressData] = useState(initialAddressState);
    const [isAddressSaved, setIsAddressSaved] = useState(false); // Estado para saber si la dirección es válida/está lista
    const navigateTo = useNavigate()

    // Manejador de cambios universal para el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressData(prevData => ({
            ...prevData,
            [name]: value,
        }));
        // Si el usuario cambia algo, se asume que necesita guardar de nuevo
        setIsAddressSaved(false);
    };


    const handleSaveAddress = (e) => {
        e.preventDefault();

        //  Aquí iría la validación más estricta de los campos requeridos
        if (!addressData.calle || !addressData.altura || !addressData.codigoPostal || !addressData.ciudad || !addressData.provincia || !addressData.pais) {
            alert("Por favor, complete todos los campos requeridos (*).");
            return;
        }

        console.log("Dirección Guardada:", addressData);
        setIsAddressSaved(true);
    };

    const handlePay = async () => {
        if (!isAddressSaved) {
            alert("Por favor, confirme la dirección de envío antes de pagar.");
            return;
        }

        const compradorId = getUserIdFromLocalStorage();
        if (!compradorId) {
            alert("Error: No se pudo obtener el ID del comprador. Por favor, inicie sesión nuevamente.");
            return;
        }

        try {
            console.log("Iniciando creación de pedido...");
            const resultadoPedido = await armarPedido(
                compradorId,
                cartItems,
                addressData
            );
            console.log("Pedido creado exitosamente:", resultadoPedido);
            alert(`Pedido N° ${resultadoPedido.id || 'N/A'} creado. Procediendo al pago...`);

            clearCart()
            navigateTo("/")

        } catch (error) {
            console.error("Fallo durante el armado y envío del pedido:", error);

            alert(`Fallo en el pago. Error: ${error.message}`);
        }
    };

    const handleCancel = () => {
        console.log("Compra cancelada.");
    };

    return (
        <Box sx={{ display: "flex", gap: "2rem", justifyContent: 'center', padding: "1rem" }}>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1rem", minWidth: 450, height: "100%", }}>
                <Card variant="outlined" sx={{ width: '100%', flexGrow: 1, p: 0, borderRadius: 2, boxShadow: 1, overflowY: "auto", }}>
                    <List disablePadding>
                        {cartItems.map((item, index) => (
                            <React.Fragment key={item._id || index}>
                                <ListItem alignItems="flex-start" sx={{ py: 1.5, px: 2 }}>
                                    <Box
                                        component="img"
                                        src={item.fotos && item.fotos[0]}
                                        alt={item.titulo}
                                        sx={{ width: 70, height: 70, objectFit: "contain", borderRadius: 1, border: "1px solid #ddd", mr: 2 }}
                                    />
                                    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                                            {item.titulo}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.quantity} x ${item.precio.toLocaleString()}
                                        </Typography>
                                    </Box>
                                </ListItem>
                                {index !== cartItems.length - 1 && <Divider component="li" />}
                            </React.Fragment>
                        ))}
                    </List>
                </Card>

                <Box sx={{ textAlign: "right", pr: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#b7bf5d" }}>
                        Total: ${subtotal.toLocaleString("es-AR")}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ width: 500, p: 3, border: '1px solid #eee', borderRadius: 2, boxShadow: 3, bgcolor: 'white' }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Dirección de Envío
                </Typography>

                <form onSubmit={handleSaveAddress}>
                    <Container maxWidth="md">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={8}><TextField fullWidth label="Calle" name="calle" value={addressData.calle} onChange={handleChange} required /></Grid>
                            <Grid item xs={12} sm={4}><TextField fullWidth label="Altura" name="altura" value={addressData.altura} onChange={handleChange} type="number" required /></Grid>
                            <Grid item xs={12} sm={6}><TextField fullWidth label="Piso" name="piso" value={addressData.piso} onChange={handleChange} type="number" required/></Grid>
                            <Grid item xs={12} sm={6}><TextField fullWidth label="Departamento" name="departamento" value={addressData.departamento} onChange={handleChange} /></Grid>
                            <Grid item xs={12} sm={4}><TextField fullWidth label="Código Postal" name="codigoPostal" value={addressData.codigoPostal} onChange={handleChange} required /></Grid>
                            <Grid item xs={12} sm={8}><TextField fullWidth label="Ciudad" name="ciudad" value={addressData.ciudad} onChange={handleChange} required /></Grid>
                            <Grid item xs={12} sm={6}><TextField fullWidth label="Provincia" name="provincia" value={addressData.provincia} onChange={handleChange} required /></Grid>
                            <Grid item xs={12} sm={6}><TextField fullWidth label="País" name="pais" value={addressData.pais} onChange={handleChange} required /></Grid>
                            <Grid item xs={12} sm={6}><TextField fullWidth label="Latitud" name="latitud" value={addressData.latitud} onChange={handleChange} type="number" /></Grid>
                            <Grid item xs={12} sm={6}><TextField fullWidth label="Longitud" name="longitud" value={addressData.longitud} onChange={handleChange} type="number" /></Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color={isAddressSaved ? "success" : "primary"} fullWidth sx={{ mt: 1, mb: 3 }}>
                                    {isAddressSaved ? 'Dirección Confirmada' : 'Confirmar Dirección'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </form>

                <Divider sx={{ my: 3 }} />

                <Stack direction="column" spacing={2}>
                    <Button variant="contained" startIcon={<CheckCircleIcon />} onClick={handlePay} disabled={!isAddressSaved}>
                        PAGAR
                    </Button>
                    <Button variant="outlined" startIcon={<CancelIcon />} onClick={handleCancel} color="error">
                        CANCELAR
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}

export default CheckoutProducts;