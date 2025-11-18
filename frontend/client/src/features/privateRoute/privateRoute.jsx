
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


function parseJwt (token) {
    if (!token) { return null; }
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decodedToken = parseJwt(token);
    return decodedToken ? (decodedToken.exp * 1000 > Date.now()) : false;
};

const PrivateRoute = () => {
    const isAuthenticated = checkAuth();

    // Si está autenticado, renderiza las rutas anidadas (Outlet)
    // Si NO está autenticado, redirige al usuario a la página /login
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;