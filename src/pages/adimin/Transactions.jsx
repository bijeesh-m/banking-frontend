import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        axios
            .get("/admin/transactions")
            .then((res) => {
                setTransactions(res.data.transactions);
            })
            .catch((err) => {
                toast.error("something went wrong");
            });
    });

    

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table  text-black">
                    <thead>
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Transaction ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Account
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions?.map((tns) => {
                            return (
                                <tr key={tns._id}>
                                    <td scope="row" className="px-6 py-4 ">
                                        {tns?.transactionId}
                                    </td>
                                    <td className="px-6 py-4">{tns?.accountNumber}</td>
                                    <td className="px-6 py-4">{new Date(tns?.createdAt).toDateString().slice(4)}</td>
                                    <td className="px-6 py-4">{tns?.amount}</td>
                                    <td className="px-6 py-4 text-right">{tns?.transactionType}</td>
                                    <td className="px-6 py-4 text-right">{tns?.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Transactions;
