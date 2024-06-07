import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState(false);

    const handleChange = (event, userId) => {
        setStatus(true);
        const newState = event.target.value;
        axios
            .put(`/admin/accountAction/${userId}`, { newState })
            .then((res) => {
                setUsers(res.data.users);
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
                console.log(err);
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
                            <th>AccountStatus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => {
                            return (
                                <tr key={user._id}>
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
