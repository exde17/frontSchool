import React from "react";
import { Route, Navigate } from "react-router-dom";

const authlogin = ( {element, isAuthenticated, ...rest }) => (
    <Route 
        {...rest}
        element={isAuthenticated ? element : 
        <Navigate to="/login" replace/>}
    />
);

export default authlogin;