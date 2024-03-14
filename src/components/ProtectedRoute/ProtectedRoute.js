import React from 'react';
import { Navigate } from 'react-router-dom';

// Функция защиты роута главной страницы от неавторизованных пользователей
const ProtectedRoute = ({isLoggedIn, children}) => {
    return (
        isLoggedIn ? children : <Navigate to="/" replace/>
    )
}

export default ProtectedRoute;