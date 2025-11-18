import React, { useState, useEffect, useMemo } from 'react';
import {
    Menu, MenuItem, IconButton, Badge, Typography, Divider, Box, Button, CircularProgress, Tooltip
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import {getUserIdFromLocalStorage} from "../localStorage"
import {obtenerNotificaciones, marcarComoLeida} from "../services/NotificacionesService"
import {usePanel} from "../hooks/usePanel";


const FILTER_ORDER = ['unread', 'read', 'all'];

const NotificationSection = () => {
    const {openPanel, closePanel, panelOpen, anchorElement} = usePanel()
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('unread');


    const unreadCount = useMemo(() =>
        notifications.filter(n => !n.leida).length, [notifications]
    );

    useEffect(() => {
        let filtros = "";
        const compradorId = getUserIdFromLocalStorage();
        if (!compradorId) return

        if (filter === 'read') {
            filtros = "leida=true";
        } else if (filter === 'unread') {
            filtros = "leida=false";
        }


        setLoading(true);

        obtenerNotificaciones(compradorId, filtros)
            .then(data => {
                setNotifications(data);
            })
            .catch(() => {
                setNotifications([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [filter]);

    const markAsRead =  (id) => {
        return marcarComoLeida(id)
            .then(notificacion =>
                setNotifications(noti =>
                    noti.map(n => (n.id === notificacion.id ? { ...n, leida: true } : n))))

    };

    const markAllAsRead = () => {
        const unreadNotificationIds = notifications
            .filter(n => !n.leida)
            .map(n => n.id);

        if (unreadNotificationIds.length === 0) {
            return;
        }

        const markPromises = unreadNotificationIds.map(id => marcarComoLeida(id));

        setNotifications(prev =>
            prev.map(n => ({ ...n, leida: true }))
        );

        Promise.all(markPromises)
            .then(() => {
                console.log(`Éxito al marcar ${unreadNotificationIds.length} notificaciones como leídas.`);
            })
            .catch((error) => {
                console.error("Fallo al marcar el conjunto de notificaciones. Forzando recarga.", error);

                setLoading(true);
                //fuerzo que se haga el useEfecct aunque no cambie el valor
                setFilter(prev => prev);
            });

    };

    const toggleFilter = () => {
        const currentIndex = FILTER_ORDER.indexOf(filter);
        const nextIndex = (currentIndex + 1) % FILTER_ORDER.length;
        setFilter(FILTER_ORDER[nextIndex]);
    };


    let FilterIcon;
    let filterText;

    if (filter === 'unread') {
        FilterIcon = VisibilityOffIcon;
        filterText = 'No Leídas';
    } else if (filter === 'read') {
        FilterIcon = VisibilityIcon;
        filterText = 'Leídas';
    } else { // 'all'
        FilterIcon = VisibilityIcon;
        filterText = 'Todas';
    }

    return (
        <Box>
            {/* ÍCONO DE NOTIFICACIÓN EN EL NAVBAR */}
            <Tooltip title="Notificaciones">
                <IconButton
                    sx={{ color: "navbar.icon", }}
                    onClick={openPanel}
                    aria-controls={panelOpen ? 'notifications-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={panelOpen ? 'true' : undefined}
                    disabled={loading}
                >
                    {loading? (
                        <CircularProgress size={24} sx={{ color: 'var(--gold)' }} />
                    ) : (

                            <Badge badgeContent={unreadCount} color="error">
                                <NotificationsIcon />
                            </Badge>

                    )}
                </IconButton>
            </Tooltip>

            <Menu
                id="notifications-menu"
                anchorEl={anchorElement}
                open={panelOpen}
                onClose={closePanel}
                PaperProps={{ sx: { width: 320 } }}
            >
                {/* Encabezado y Filtro */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Notificaciones
                    </Typography>
                    <Button size="small" onClick={toggleFilter} startIcon={<FilterIcon />}>
                        {filterText}
                    </Button>
                </Box>

                <Divider />

                {/* Opción Marcar Todas como Leídas */}
                <MenuItem onClick={markAllAsRead} disabled={unreadCount === 0 || loading}>
                    <DoneAllIcon fontSize="small" sx={{ mr: 1 }} />
                    Marcar todas como leídas
                </MenuItem>

                <Divider />


                {/* Muestra un indicador de carga si está cargando */}
                {loading ? (
                    <MenuItem sx={{ justifyContent: 'center' }}>
                        <CircularProgress size={20} />
                    </MenuItem>
                ) : notifications.length > 0 ? (
                    notifications.map((n) => (
                        <MenuItem
                            key={n.id}
                            onClick={n.leida ? undefined : () => markAsRead(n.id)}
                            sx={{
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                bgcolor: n.leida ? 'inherit' : '#f5f5f5',
                                py: 1,
                                borderLeft: `4px solid ${n.leida ? 'transparent' : '#b7bf5d'}`
                            }}
                        >
                            <Typography variant="body2" sx={{ fontWeight: n.leida ? 'normal' : 'bold' }}>
                                {n.mensaje}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {n.fecha_alta}
                            </Typography>
                            {!n.leida && (
                                <Typography
                                    variant="caption"
                                    color="primary"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        markAsRead(n.id);
                                    }}
                                    sx={{ mt: 0.5, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                                >
                                    Marcar como leído
                                </Typography>
                            )}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>
                        No hay {filter === 'all' ? '' : filterText.toLowerCase()} notificaciones.
                    </MenuItem>
                )}
            </Menu>
        </Box>
    );
};

export default NotificationSection;