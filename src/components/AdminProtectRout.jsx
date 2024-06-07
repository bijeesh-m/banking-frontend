import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { myContext } from "../App";

const ProtectedRoute = ({ element }) => {
    const { admin,loading1 } = useContext(myContext);
    if(loading1){
        return (
            <div className=" w-screen h-screen flex justify-center items-center">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }
    return admin?.username ? element : <Navigate to="/adminlogin" replace />;
};

export default ProtectedRoute;
