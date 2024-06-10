import { Route, Routes } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import AdminLogin from "./pages/adimin/Login";
import AdminDashboard from "./pages/adimin/Dashboard";
import Dashboard from "./pages/user/Dashboard";
import Transations from "./pages/user/Transations";
import AdminTransations from "./pages/adimin/Transactions";
import Home from "./pages/user/Home";
import  { Toaster } from "react-hot-toast";
import { createContext, useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectRoute from "./components/AdminProtectRout";
import Users from "./pages/adimin/Users";

axios.defaults.baseURL = "http://localhost:3005/";
axios.defaults.withCredentials = true;

export const myContext = createContext();

function App() {
    const [user, setUser] = useState();
    const [admin, setAdmin] = useState();
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);

    useEffect(() => {
        const getUser = () => {
            axios
                .get("user/getuser")
                .then((res) => {
                    setUser(res.data?.user);
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                });
        };
        getUser();
    }, [user?.username]);

    useEffect(() => {
        const getAdmin = () => {
            axios
                .get("admin/getadmin")
                .then((res) => {
                    setAdmin(res.data.admin);
                    setLoading1(false);
                })
                .catch((err) => {
                    setLoading1(false);
                });
        };
        getAdmin();
    }, [admin?.username]);

    if (loading) {
        return (
            <div className=" w-screen h-screen flex justify-center items-center">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }
    return (
        <div>
            <Toaster />
            <myContext.Provider value={{ user, setUser, admin, setAdmin, loading1, setLoading1 }}>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/adminlogin" element={<AdminLogin />} />

                    <Route path="/" element={<ProtectedRoute element={<Dashboard />} />}>
                        <Route index element={<Home />} />
                        <Route path="/transations" element={<Transations />} />
                    </Route>
                    <Route path="/admin" element={<AdminProtectRoute element={<AdminDashboard />} />}>
                        <Route index element={<Users />} />
                        <Route path="/admin/transactions" element={<AdminTransations />} />
                    </Route>
                </Routes>
            </myContext.Provider>
        </div>
    );
}

export default App;
