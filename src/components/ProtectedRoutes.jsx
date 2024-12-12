import React from 'react'
import {Navigate} from 'react-router-dom'
import {jwtDecode} from "jwt-decode"
const ProtectedRoutes = ({children,requiredRole}) => {
    const token=localStorage.getItem("token");
   

    if(!token){
       return <Navigate to="/login" replace /> 
    }
    try {
        
        const decodedToken=jwtDecode(token);
        if(decodedToken.role !==requiredRole){
            return <Navigate to="/un-authorized"  replace/>
        }
    } catch (error) {
        console.error('Invalid token:', error);
    return <Navigate to="/login" replace />;
        
    }

  return children;
}

export default ProtectedRoutes