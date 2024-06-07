import React, { useContext } from "react";
import { IoMenu } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

import { Link, Outlet, useNavigate } from "react-router-dom";
import { myContext } from "../../App";
import axios from "axios";
import toast from "react-hot-toast";

const Dashboard = () => {
    const { user } = useContext(myContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        axios
            .delete("user/logout")
            .then((res) => {
                toast.success("Sign Out success");
                navigate("/login");
            })
            .catch((err) => toast.error("Error"));
    };
    return (
        <div className=" flex flex-col h-screen">
            <nav className=" w-full bg-slate-100 shadow-md p-5 flex gap-4 justify-between">
                <div className=" flex">
                    <label htmlFor="my-drawer" className=" drawer-button md:hidden">
                        <IoMenu size={40} />
                    </label>
                    <div>
                        <h1 className=" text-3xl  font-bold text-black">Banking</h1>
                    </div>
                </div>
                <div className=" hidden md:block">
                    <div className=" flex items-center gap-3 w-full">
                        <p className=" font-sans ">{user?.username}</p>
                        <FaUserCircle size={35} />
                    </div>
                </div>
            </nav>
            <div className="drawer z-10">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content"></div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className=" w-80 min-h-full bg-base-200 ">
                        <div className=" flex mb-3 bg-black text-white p-5 gap-4">
                            <label htmlFor="my-drawer" className=" drawer-button md:hidden">
                                <IoMenu size={40} />
                            </label>
                            <div>
                                <h1 className=" text-3xl  font-bold">Banking</h1>
                            </div>
                        </div>
                        <div className=" p-5 text-xl font-sans">
                            <div className=" flex items-center gap-3 w-full mb-3">
                                <FaUserCircle size={35} />
                                <p className=" font-sans ">{user?.username}</p>
                            </div>
                            <Link className="  md:hidden" to={"/"}>
                                <p className=" hover:bg-gray-200 rounded-md py-3 cursor-pointer  px-2">Home</p>
                            </Link>

                            <Link to={"/transations"}>
                                <p className=" hover:bg-gray-200 rounded-md py-3 cursor-pointer  px-2">Transations</p>
                            </Link>
                            <Link to={"/"}>
                                <p
                                    onClick={handleSignOut}
                                    className=" hover:bg-gray-200 rounded-md py-3 cursor-pointer  px-2"
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
                    <Link to={"/"}>
                        <p className=" hover:bg-gray-200 rounded-md py-3 cursor-pointer  px-2">Home</p>
                    </Link>

                    <Link to={"/transations"}>
                        <p className=" hover:bg-gray-200 rounded-md py-3 cursor-pointer  px-2">Transations</p>
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
