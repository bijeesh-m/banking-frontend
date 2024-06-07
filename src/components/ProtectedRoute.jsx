import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { myContext } from "../App";

const ProtectedRoute = ({ element }) => {
    const { user } = useContext(myContext);
    return user?.username ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
