import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from "../../App";

const Login = () => {
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            axios
                .post("user/login", formValues)
                .then((res) => {
                    toast.success("Login success");
                    localStorage.setItem("userToken", res.data?.token);
                    navigate("/");
                    window.location.reload();
                })
                .catch((err) => {
                    if (err.response) {
                        toast.error(err?.response?.data?.message);
                    } else {
                        toast.error("Something went wrong");
                    }
                    console.log(err);
                });
        }
    };
    const validate = (values) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const errors = {};

        if (!values.email) {
            errors.email = "Enter an email";
        } else if (!emailRegex.test(values.email)) {
            errors.email = "Enter a valid email";
        }

        if (!values.password) {
            errors.password = "Enter a password";
        } else if (values.password.length < 8) {
            errors.password = "Invalid password";
        }

        return errors;
    };
    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Login to Your Account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSignIn}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formValues.email}
                                    onChange={(e) => handleChange(e)}
                                    className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {formErrors?.email && <p className="text-red-400">{formErrors?.email}</p>}
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formValues.password}
                                    onChange={(e) => handleChange(e)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 px-3 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {formErrors?.password && <p className="text-red-400">{formErrors?.password}</p>}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                            <p className=" my-3 w-full text-center">
                                Don't have a account{" "}
                                <Link className=" text-blue-700" to={"/register"}>
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
