import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState();

    const handleChange = (event, userId) => {
        const toastId = toast.loading("loading..");
        setStatus(event.target.value);
        axios
            .put(`/admin/accountAction/${userId}`, { status })
            .then((res) => {
                toast.success("success", { id: toastId });
            })
            .catch((err) => {
                console.log(err);
                toast.error("Something went wrong");
            });
    };

    useEffect(() => {
        axios
            .get("/admin/users")
            .then((res) => {
                setUsers(res.data?.users);
            })
            .catch((err) => {
                toast.error("Something went wrong");
            });
    }, []);
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>TUsername</th>
                            <th>Account No</th>
                            <th>Balance</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => {
                            return (
                                <tr>
                                    <td>{user?.username}</td>
                                    <td>{user?.accountNumber}</td>
                                    <td>{user?.balance}</td>
                                    <td>
                                        <select
                                            className="select select-bordered "
                                            onChange={(e) => handleChange(e, user?._id)}
                                            value={user?.accountStatus}
                                        >
                                            <option value="Enabled">Enabled</option>
                                            <option value="Disabled">Disabled</option>
                                        </select>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
