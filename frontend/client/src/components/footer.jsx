import * as React from 'react';
import { Box, Typography, Divider, IconButton, List, ListItem, ListItemButton, Card } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LightModeIcon from '@mui/icons-material/LightMode';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <Box component="footer" sx={{mt: 6, px: 3, py: 2, bgcolor: "#ebebeb", borderTop: "1px solid", borderColor: "divider" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
                <IconButton variant="plain">
                    <LightModeIcon />
                </IconButton>
                <Divider orientation="vertical" />
                <IconButton component={Link} to="https://github.com/ddsw-mn/2025-2c-backend-grupo-08" color="neutral" variant="plain" target="_blank">
                    <GitHubIcon />
                </IconButton>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3 }}>
                <Box>
                    <Typography fontSize="0.9rem" fontWeight="bold">Argentina</Typography>
                    <Typography fontSize="0.8rem">Envíos a todo el país</Typography>
                </Box>
                <Box>
                    <Typography fontSize="0.9rem" fontWeight="bold">Contacto</Typography>
                    <Typography fontSize="0.8rem">Email: jmartinez@ng.com</Typography>
                    <Typography fontSize="0.8rem">Tel: 11 2233-4455</Typography>
                </Box>
                <Box>
                    <Typography fontSize="0.9rem" fontWeight="bold">Encuéntranos en</Typography>
                    <Box sx={{ display: "flex", gap: 1.5 }}>
                        <IconButton variant="soft" sx={{ color: "#1877F2", p: 0 }}><FacebookIcon /></IconButton>
                        <IconButton variant="soft" sx={{ p: 0 }}><InstagramIcon /></IconButton>
                        <IconButton variant="soft" sx={{ color: "#1DA1F2", p: 0 }}><TwitterIcon /></IconButton>
                        <IconButton variant="soft" sx={{ color: "#E60023", p: 0 }}><PinterestIcon /></IconButton>
                    </Box>
                </Box>
                <Box>
                    <Typography fontSize="0.9rem" fontWeight="bold">Aceptamos</Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {["visa.webp", "master.webp", "maestro.webp", "american_express.webp", "mercadopago.webp", "paypal.webp"]
                            .map((img) => (
                                <Card key={img} variant="outlined" sx={{ width: 40, height: 25, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <img
                                        src={`/assets/${img}`}
                                        alt={img.split('.')[0]}
                                        style={{ width: "100%", height: "auto", objectFit: "contain", }}
                                    />
                                </Card>
                            ))}
                    </Box>
                </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <List size="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'flex-start' }, textAlign: { xs: 'center', sm: 'left' }, }}>
                <ListItem sx={{ p: 0, fontSize: "0.9rem", fontWeight: "bold" }}>Podemos ayudarte</ListItem>
                <Box fontSize="0.8rem" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                    <ListItem sx={{ p: 0 }}>
                        <ListItemButton component={Link} to="/ayuda" variant="soft" sx={{ p: 0 }}>Ayuda</ListItemButton>
                    </ListItem>
                </Box>
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography level="body-xs" textAlign="center" fontSize="0.8rem">
                © 2025 TiendaSol. Todos los derechos reservados.
            </Typography>
        </Box>
    )
}

export default Footer;