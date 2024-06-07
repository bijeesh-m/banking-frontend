import React, { useContext } from "react";
import { myContext } from "../../App";

const Transations = () => {
    const { user } = useContext(myContext);

    const lastFourDigits = user?.accountNumber.slice(-4);
    const maskedNumber = (user?.accountNumber.slice(0, -4).replace(/./g, "*") + lastFourDigits).toString();

    return (
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-white dark:text-gray-400">
                    <thead className="text-xs text-white uppercase bg-gray-200  dark:text-gray-400">
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
                        {user?.transactions.map((tns) => {
                            return (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td scope="row" className="px-6 py-4 ">
                                        {tns?.transactionId}
                                    </td>
                                    <td className="px-6 py-4">{maskedNumber}</td>
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

export default Transations;
