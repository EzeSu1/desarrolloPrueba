import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import {
    Box, Button, Divider,
    IconButton,
    List,
    ListSubheader,
    SwipeableDrawer
} from "@mui/material";
import {usePanel} from "../hooks/usePanel";
import AccountOptions from "./accountOptions"
import {Link} from "react-router-dom";


const MenuSection = () => {
    const {openPanel, closePanel, panelOpen, navigateTo} = usePanel()
    
    return (
        <>
            <IconButton onClick={openPanel} sx={{ color: "navbar.icon" }}>
                <MenuIcon />
            </IconButton>

            <SwipeableDrawer anchor="left" open={panelOpen} onClose={closePanel} disableSwipeToOpen={true}>
                <Box sx={{ width: 250, bgcolor: "background.default", height: "100%" }}>
                    <List>
                        <ListSubheader>Perfil</ListSubheader>
                        <Divider />
                        <AccountOptions closePanel={closePanel} navigateTo={navigateTo}/>
                        <Divider />
                        <Button component={Link} to="/destacados" color="inherit">Destacados</Button>
                        <Divider />
                        <Button component={Link} to="/ayuda" color="inherit">Ayuda</Button>
                    </List>
                </Box>
            </SwipeableDrawer>
        </>
    )
}

export default MenuSection