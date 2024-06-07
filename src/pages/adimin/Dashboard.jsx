import axios from "axios";
import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { myContext } from "../../App";

const Dashboard = () => {
    const { admin } = useContext(myContext);

    const navigate = useNavigate();

    const handleSignOut = () => {
        axios
            .delete("admin/logout")
            .then((res) => {
                toast.success("Sign Out success");
                navigate("/adminlogin");
            })
            .catch((err) => toast.error("Error"));
    };
    return (
        <div className=" h-screen overflow-y-scroll">
            <nav className="bg-blue-500 p-4 flex items-center justify-between">
                <div className=" flex items-center gap-2">
                    <label htmlFor="my-drawer" className=" drawer-button md:hidden">
                        <IoMenu size={40} />
                    </label>
                    <h1 className="text-white text-xl font-semibold">BANKING</h1>
                </div>
                <div className="flex items-center space-x-4 px-5 font-bold">
                    <span className="text-white">{admin?.username}</span>
                    <FaUserCircle size={30} />
                </div>
            </nav>
            <div className="drawer z-10">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content"></div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        <div className=" flex items-center gap-2">
                            <label htmlFor="my-drawer" className=" drawer-button md:hidden">
                                <IoMenu size={40} />
                            </label>
                            <h1 className=" text-xl font-semibold  text-black">BANKING</h1>
                        </div>
                        <div className=" py-10 text-xl">
                            <Link to={"/admin"}>
                                <p className=" hover:bg-gray-200 rounded-md py-3 cursor-pointer  px-2">Users</p>
                            </Link>

                            <Link to={"/admin/transactions"}>
                                <p className=" hover:bg-gray-200 rounded-md py-3 cursor-pointer  px-2">Transations</p>
                            </Link>
                            <Link to={"/"}>
                                <p
                                    className=" hover:bg-gray-200 rounded-md py-3 cursor-pointer  px-2"
                                    onClick={handleSignOut}
                                >
                                    Sign Out
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" w-full  h-full flex ">
                <div className=" bg-gray-300 py-10 px-5 w-1/5 h-full text-xl font-sans hidden md:block">
                    <Link to={"/admin"}>
                        <p className=" hover:bg-gray-200 rounded-md py-3 cursor-pointer  px-2">Users</p>
                    </Link>

                    <Link to={"/admin/transactions"}>
                        <p className=" hover:bg-gray-200 rounded-md py-3 cursor-pointer  px-2">Transactions</p>
                    </Link>

                    <p className=" hover:bg-gray-200 rounded-md py-3 cursor-pointer  px-2" onClick={handleSignOut}>
                        Sign Out
                    </p>
                </div>
                <div className=" p-10 w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
