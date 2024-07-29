import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminProtect = ({ children }) => {
   const userInfo = useSelector(state => state.user.data);

   if (userInfo && userInfo.isAdmin) {
    
    // Render children components
       return <>{children}</>;
    
   }

    
     //Render to login Component
    return <Navigate to="/" />;
}

export default AdminProtect;
