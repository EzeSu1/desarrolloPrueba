import {Box, ListItemButton, ListItemIcon} from "@mui/material";
import Login from "@mui/icons-material/Login";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import React from "react";
import {useUserContext} from "../contexts/userContext";
import {desloguear} from "../services/UsuariosService";

const AccountOptions = ({closePanel, navigateTo}) => {
    const {isLoggedIn, setIsLoggedIn, isVendedor} = useUserContext()

    const logout = () => {
        return desloguear()
            .then(() => {
                localStorage.removeItem("user_data")
                localStorage.removeItem("token");
                setIsLoggedIn(false)
                closePanel()})
    }

    if(!isLoggedIn) {
        return (
            <>
                <ListItemButton onClick={() => navigateTo("/logIn")}>
                    <ListItemIcon><Login fontSize="small" /></ListItemIcon>
                    Iniciar sesión
                </ListItemButton>
                <ListItemButton onClick={() => navigateTo("/signUp")}>
                    <ListItemIcon><PersonAdd fontSize="small" /></ListItemIcon>
                    Registrarse
                </ListItemButton>
            </>
        )
    }
    else
    {
        return (
            <>
                {!isVendedor ?(
                    <ListItemButton onClick={() => navigateTo("/historialPedidos")}>
                        <ListItemIcon><Logout fontSize="small"/></ListItemIcon>
                        Mis pedidos
                    </ListItemButton>
                ):(
                    <Box>
                        <ListItemButton onClick={() => navigateTo("/misProductos")}>
                            <ListItemIcon><Logout fontSize="small"/></ListItemIcon>
                            Mis Productos
                        </ListItemButton>
                        <ListItemButton onClick={() => navigateTo("/ordenesPendientes")}>
                            <ListItemIcon><Logout fontSize="small"/></ListItemIcon>
                            Pedidos Pendientes
                        </ListItemButton>
                    </Box>
                )}

                <ListItemButton onClick={logout}>
                    <ListItemIcon><Logout fontSize="small"/></ListItemIcon>
                    Cerrar sesión
                </ListItemButton>

            </>
        )
    }
}

export default AccountOptions