import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [formValues, setFormValues] = useState({
        username: "",
        accountNumber: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const [formErrors, setFormErrors] = useState({});
    const handleSignUp = (e) => {
        e.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            axios
                .post("user/register", formValues)
                .then((res) => {
                    toast.success("Register success");
                    navigate("/login");
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

        if (!values.username) {
            errors.username = "Enter a username";
        } else if (values.username.length < 3) {
            errors.username = "Minimum 3 characters required";
        }
        if (!values.accountNumber) {
            errors.accountNumber = "Enter accountNumber";
        } else if (values.accountNumber.length < 14) {
            errors.accountNumber = "Invalid, Minimum 14 characters required";
        } else if (values.accountNumber.length > 14) {
            errors.accountNumber = "Invalid, maximum 14 characters";
        }

        if (!values.email) {
            errors.email = "Enter an email";
        } else if (!emailRegex.test(values.email)) {
            errors.email = "Enter a valid email";
        }

        if (!values.password) {
            errors.password = "Enter a password";
        } else if (values.password.length < 8) {
            errors.password = "Minimum 8 characters required";
        }

        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Register
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSignUp}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="username"
                                    value={formValues.username}
                                    onChange={(e) => handleChange(e)}
                                    className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {formErrors?.username && <p className="text-red-400">{formErrors?.username}</p>}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="accountNumber"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Enter your 14 digit account number
                            </label>
                            <div className="mt-2">
                                <input
                                    id="accountNumber"
                                    name="accountNumber"
                                    type="number"
                                    value={formValues.accoutNumber}
                                    onChange={(e) => handleChange(e)}
                                    className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {formErrors?.accountNumber && (
                                    <p className="text-red-400">{formErrors?.accountNumber}</p>
                                )}
                            </div>
                        </div>
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
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formValues.password}
                                    onChange={(e) => handleChange(e)}
                                    className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {formErrors?.password && <p className="text-red-400">{formErrors?.password}</p>}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign Up
                            </button>
                            <p className=" my-3 w-full text-center">
                                Already have an account{" "}
                                <Link className=" text-blue-700" to={"/login"}>
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
