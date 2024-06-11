import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Protect = ({ children }) => {
   const userInfo = useSelector(state => state.user.data);

   if (!userInfo || userInfo.length === 0) {
      return <Navigate to="/" />;
   }

   return <>{children}</>; // Render children components
}

export default Protect;
