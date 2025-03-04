import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from 'react'

const ProtectedRoutes = () => {
    const userDetails = useSelector(state => state.user)
    return userDetails?.logged ? <Outlet /> : <Navigate to="/" replace />
}

export default ProtectedRoutes