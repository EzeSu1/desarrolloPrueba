import React from 'react'
import {Menu, Box, IconButton, Tooltip, List} from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import {usePanel} from "../hooks/usePanel";
import AccountOptions from "./accountOptions"


export default function AccountSection() {
    const {openPanel, closePanel, navigateTo, panelOpen, anchorElement} = usePanel()

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                <Tooltip title="Cuenta">
                    <IconButton onClick={openPanel} sx={{ color: "navbar.icon", }}>
                        <AccountCircleIcon color="navbar.icon"/>
                    </IconButton>
                </Tooltip>
            </Box>

            <Menu
                anchorEl={anchorElement}
                open={panelOpen}
                onClose={closePanel}
                slotProps={{paper: { elevation: 0, sx: { overflow: 'visible', filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))', mt: 1.5, '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1, }, '&::before': { content: '""', display: 'block', position: 'absolute', top: 0, right: 14, width: 10, height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0, }, }, }, }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <List>
                    <AccountOptions closePanel={closePanel} navigateTo={navigateTo}/>
                </List>
            </Menu>
        </>
    )
}
