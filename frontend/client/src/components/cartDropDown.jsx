import React from 'react';
import { useCartContext } from '../contexts/cartContext';
import {Box, Typography, Snackbar, Paper} from "@mui/material";

const CartDropdown = () => {
    const { handleCloseSnackbar, lastAdded, showLastAdded } = useCartContext();

    if (!lastAdded) return null;

    return (
        <Snackbar key={lastAdded._cartEventId} open={showLastAdded} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "right" }} autoHideDuration={2000} sx={{ mt: 3 }}>
            <Paper elevation={4} sx={{ p: 2, borderRadius: 3, display: "flex", flexDirection: "column", gap: 1, bgcolor: "cartSnackbar.bg", height: "9rem", width: "15rem", }}>
                <Box sx={{ display: "flex", flexDirection: "Column", alignItems: "center", gap: 1 }}>
                    <Typography fontWeight="bold">Se agregó al carrito:</Typography>

                    <Box
                        component="img"
                        src={lastAdded.fotos[0]}
                        alt={lastAdded.titulo}
                        sx={{ width: "4rem", height: "4rem", objectFit: "contain", borderRadius: 2, border: "1px solid #eee", bgcolor: "cartSnackbar.bg" }}
                    />

                    <Typography variant="body2" sx={{ textAlign: "center", fontWeight: "bold" }}>
                        ${lastAdded.precio.toLocaleString("es-AR")}
                    </Typography>
                </Box>
            </Paper>
        </Snackbar>
    )
}

export default CartDropdown;