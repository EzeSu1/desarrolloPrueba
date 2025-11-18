import { useCartContext } from '../contexts/cartContext';
import {
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    Typography,
    List,
    ListItem,
    Card,
    Stack,
    Badge,
    Tooltip, CardMedia, CardContent
} from "@mui/material";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {usePanel} from "../hooks/usePanel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


const CartSection = () => {
    const {cartItems, removeFromCart, subtotal, clearCart, getCartTotalItems} = useCartContext()
    const {openPanel, closePanel, panelOpen, navigateTo} = usePanel()

    return (
        <>
            <Tooltip title="Carrito">
                <IconButton onClick={openPanel} sx={{ color: "navbar.icon" }}>
                    <Badge badgeContent={getCartTotalItems} overlap="circular" sx={{"& .MuiBadge-badge": { top: -6, right: -1 }}}>
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </Tooltip>

            <Drawer anchor="right" open={panelOpen} onClose={closePanel} PaperProps={{sx: {width: 400, bgcolor: "cartDrawer.bg"}}}>
                    <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", mb: 2, gap: 1 }}>
                        <IconButton onClick={closePanel}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Box>

                    <Box>
                        {cartItems.length === 0 ? (
                            <Box sx={{ textAlign: "center", mt: 10 }}>
                                <Typography variant="body2" color="castDrawer.txt">Tu carrito está vacío</Typography>
                            </Box>
                        ) : (
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                                <List disablePadding>
                                    {cartItems.map((item, index) => (
                                        <React.Fragment key={item._id || index}>
                                            <ListItem sx={{ py: 1.5, px: 2 }}>
                                                <Card variant="outlined" sx={{ display: "flex", alignItems: "center", width: 360, height: 96, borderRadius: 2, boxShadow: 1, p: 1, boxSizing: "border-box" }}>
                                                    <CardMedia
                                                        component="img"
                                                        src={item.fotos[0]}
                                                        alt={item.titulo}
                                                        sx={{ width: 70, height: 70, objectFit: "contain", borderRadius: 1, border: "1px solid #ddd" }}
                                                    />
                                                    <CardContent sx={{flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                                        <Stack>
                                                            <Typography variant="subtitle2" sx={{ fontWeight: 500, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.titulo}</Typography>
                                                            <Typography variant="body2" sx={{ color: "cartDrawer.txt", fontWeight: "bold", mt: 0.5, justifyContent: "flex-end", }}>
                                                                {item.quantity} X ${item.precio.toLocaleString()}
                                                            </Typography>
                                                        </Stack>
                                                        <IconButton onClick={() => removeFromCart(item)} size="small" color="error">
                                                            <DeleteIcon fontSize="small"/>
                                                        </IconButton>
                                                    </CardContent>
                                                </Card>
                                            </ListItem>
                                            {index !== cartItems.length - 1 && <Divider component="li" />}
                                        </React.Fragment>
                                    ))}
                                </List>
                            </Box>
                        )}
                    </Box>

                    <Box sx={{position: "sticky", bottom: 0, bgcolor: "cartDrawer.bg", pb: 2}}>
                        <Divider sx={{ my: 2 }} />

                        {cartItems.length > 0 && (
                            <>
                                <Box sx={{ display: "flex", justifyContent: "space-around", mb: 2 }}>
                                    <IconButton onClick={clearCart} size="small" sx={{display: "flex", borderRadius: 9999, alignItems: "center"}}>
                                        <ClearIcon />
                                        <Typography>Vaciar carrito</Typography>
                                    </IconButton>
                                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "cartDrawer.total", mb: 0.5, mr: 4 }}>
                                        Total: ${subtotal.toLocaleString("es-AR")}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                                    <Button onClick={() => navigateTo("/checkout")} variant="contained" sx={{ width: 360, bgcolor: "button.bg", borderRadius: "30px", py: 1.5, "&:hover": { backgroundColor: "#0d5700" }, }}>
                                        Iniciar compra
                                    </Button>
                                </Box>
                            </>
                        )}

                        <Button onClick={() => navigateTo("/productos")} variant="text" fullWidth sx={{ mt: 1, bgcolor: "#ffffff", fontWeight: "medium", textDecoration: "underline", }}>
                            Ver más productos
                        </Button>
                    </Box>
            </Drawer>
        </>
    )
}

export default CartSection;