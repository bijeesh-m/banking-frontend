import React, { useContext, useState } from "react";

import { BiMoneyWithdraw } from "react-icons/bi";
import { myContext } from "../../App";
import axios from "axios";

const Home = () => {
    const { user, setUser } = useContext(myContext);
    const [formValues, setFormValues] = useState({
        amount: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const [isSubmited, setIsSubmited] = useState(false);
    const [error, setError] = useState("");

    const handleDeposit = (e) => {
        setIsSubmited(true);
        e.preventDefault();
        axios
            .put(`user/deposit/${user?._id}`, formValues)
            .then((res) => {
                setUser(res.data.user);
                setMessage(res.data?.message);
                setIsSubmited(false);
                setError("");
            })
            .catch((err) => {
                setMessage("");
                setIsSubmited(false);
                if (err.response) {
                    setError(err.response?.data?.message);
                }
            });
    };
    const handleWithdraw = (e) => {
        e.preventDefault();
        if (formValues.amount > user?.balance) {
            setError("insufficient balance");
        } else {
            setIsSubmited(true);
            setError("");
            axios
                .put(`/user/withdraw/${user?._id}`, formValues)
                .then((res) => {
                    setError("");
                    setMessage(res.data?.message);
                    setIsSubmited(false);
                    setUser(res.data?.user);
                })
                .catch((err) => {
                    setMessage("");
                    setIsSubmited(false);
                    if (err.response) {
                        setError(err.response?.data?.message);
                    }
                });
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleModelDeposit = () => {
        setMessage("");
        setFormValues({ ...formValues, password: "", amount: "" });
        document.getElementById("my_modal_1").showModal();
    };
    const handleModelWithdraw = () => {
        setMessage("");
        setFormValues({ ...formValues, password: "", amount: "" });
        document.getElementById("my_modal_2").showModal();
    };

    const lastFourDigits = user?.accountNumber.slice(-4);
    const maskedNumber = (user?.accountNumber.slice(0, -4).replace(/./g, "*") + lastFourDigits).toString();

    return (
        <div className="  w-full h-full">
            <div className=" flex flex-col md:flex-row justify-between gap-8">
                <div className=" flex gap-4">
                    <div
                        className="  w-fit cursor-pointer flex gap-3 shadow-md items-center justify-center rounded-md py-3 px-5 bg-green-300  h-fit text-black font-bold  "
                        onClick={handleModelDeposit}
                    >
                        <img width={20} src="/deposit.svg" alt="depost" />
                        Deposit
                    </div>
                    <div
                        className=" w-fit cursor-pointer flex gap-3 items-center justify-center shadow-md rounded-md py-3 px-5 bg-red-500 h-fit text-black font-bold"
                        onClick={handleModelWithdraw}
                    >
                        <BiMoneyWithdraw size={20} />
                        Withdraw
                    </div>
                </div>
                <div>
                    <div className=" w-full  flex items-center justify-center md:bg-none border-x-2  py-3 px-5 md:border-l-2 md:border-r-0 h-fit">
                        Your Current Balance : {user?.balance}
                    </div>
                </div>
            </div>

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box ">
                    <h3 className="font-bold text-lg">Deposit money to your account</h3>
                    <form className=" py-5 flex flex-col gap-3" onSubmit={handleDeposit}>
                        <label className="input input-bordered flex items-center gap-2">
                            Amount
                            <input
                                type="number"
                                name="amount"
                                min={10}
                                onChange={(e) => handleChange(e)}
                                value={formValues?.amount}
                                required
                                className="grow"
                                placeholder="Enter amount"
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Account number
                            <input type="number" disabled className="grow" placeholder={maskedNumber} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Password
                            <input
                                name="password"
                                type="password"
                                onChange={(e) => handleChange(e)}
                                required
                                value={formValues?.password}
                                className="grow"
                                placeholder="Enter your account password"
                            />
                        </label>
                        {error && <p className=" text-red-500">{error}</p>}

                        <button type="submit" className=" btn btn-accent ">
                            {isSubmited ? <span className="loading loading-spinner loading-xs"></span> : "Deposit"}
                        </button>
                        {message && <p className=" text-green-500">{message} 🤝</p>}
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box ">
                    <h3 className="font-bold text-lg">Withdraw money from your account</h3>
                    <form className=" py-5 flex flex-col gap-3" onSubmit={handleWithdraw}>
                        <label className="input input-bordered flex items-center gap-2">
                            Amount
                            <input
                                type="number"
                                name="amount"
                                min={10}
                                onChange={(e) => handleChange(e)}
                                value={formValues?.amount}
                                required
                                className="grow"
                                placeholder="Enter amount to withdraw"
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Account number
                            <input type="number" disabled className="grow" placeholder={maskedNumber} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Password
                            <input
                                name="password"
                                type="password"
                                onChange={(e) => handleChange(e)}
                                required
                                value={formValues?.password}
                                className="grow"
                                placeholder="Enter your account password"
                            />
                        </label>
                        {error && <p className=" text-red-500">{error}</p>}

                        <button type="submit" className=" btn btn-error ">
                            {isSubmited ? <span className="loading loading-spinner loading-xs"></span> : "Wthdraw"}
                        </button>
                        {message && <p className=" text-green-500">{message} 🤝</p>}
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            <div className=" w-full h-2/3 mt-10  p-5 space-y-5">
                <div className=" p-5 text-sm md:text-lg font-mono flex gap-5 bg-slate-300  rounded-md ">
                    <p>Account number :</p>
                    <p className=" font-bold">{maskedNumber}</p>
                </div>
                <div className=" p-5 text-sm md:text-lg font-mono flex gap-5 bg-slate-300  rounded-md ">
                    <p>Username :</p>
                    <p className=" font-bold">{user?.username}</p>
                </div>
                <div className=" p-5 text-sm md:text-lg font-mono flex gap-5 bg-slate-300  rounded-md ">
                    <p>Email :</p>
                    <p className=" font-bold">{user?.email}</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
