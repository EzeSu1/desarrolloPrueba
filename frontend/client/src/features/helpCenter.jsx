import React from "react"
import {Container, Box, Typography, Card, Button, Accordion, AccordionSummary, AccordionDetails} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"


const HelpCenter = () => {
    const faqs = [
        {
            title: "¿Puedo cancelar una compra?",
            detail: "En 'Mis Compras' vas a poder cancelar tu pedido siempre que el vendedor no haya despachado el envío todavía.",
        },
        {
            title: "¿Dónde veo mis pedidos?",
            detail: "En tu perfil encontrás la sección 'Mis Compras', donde verás el estado de todos tus pedidos recientes.",
        },
        {
            title: "¿Qué hago si mi pedido se demora?",
            detail: "Podés rastrear tu envío desde la sección 'Mis Compras'. Si la demora excede lo previsto, contactanos por soporte.",
        },
        {
            title: "¿Por qué mi pedido fue rechazado?",
            detail: "Puede deberse a stock insuficiente.",
        },
    ]

    return (
        <Container
            maxWidth="md"
            sx={{ py: { xs: 6, md: 10 }, display: "flex", flexDirection: "column", gap: 6, }}>
            <Box sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 3, bgcolor: "#0e3926", backdropFilter: "blur(6px)", boxShadow: "0 6px 24px rgba(8,13,24,0.06)", }}>
                <Typography variant="h6" fontWeight="700" sx={{ mb: 2, letterSpacing: "0.2px" ,color:"white"}}>Preguntas frecuentes</Typography>
                {faqs.map((item, idx) => (
                    <Accordion key={idx} disableGutters
                        sx={{ borderRadius: 2, boxShadow: "none", mb: 1.5, overflow: "hidden", "&:before": { display: "none" }, "& .MuiAccordionSummary-root": { px: 2, py: 1.5 }, "& .MuiAccordionDetails-root": { px: 2, pb: 2 }, "&:hover": {boxShadow: "0 8px 30px rgba(11,20,10,0.04)", transform: "translateY(-2px)", transition: "all 180ms ease",}, }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography fontWeight={600}>{item.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="text.secondary">{item.detail}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>

            <Card
                sx={{ borderRadius: 3, p: { xs: 2.5, md: 3 }, bgcolor: "#0e3926", color: "#ffffff", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 8px 36px rgba(4,12,7,0.12)", }}>
                <Box>
                    <Typography variant="h6" fontWeight={700}>¿Necesitás más ayuda?</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                        Nuestro equipo responde en menos de 24 horas hábiles.
                    </Typography>
                </Box>
                <Button variant="contained" sx={{ bgcolor: "#ffffff", color: "#000", fontWeight: 700, borderRadius: 2, px: 3, py: 1, boxShadow: "0 6px 18px rgba(0,0,0,0.12)", "&:hover": { bgcolor: `${"#ffedac"}cc` }, }}>
                    Contactanos
                </Button>
            </Card>
        </Container>
    )
}


export default HelpCenter;