import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

axios.defaults.withCredentials = true;

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3001/login", {
                email,
                password,
            });
            console.log("Login successful", response.data);
            setSuccess(true);
            setEmail('');
            setPassword('');
        } catch (err) {
            console.error("Login failed", err.response || err.message);
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center">
                <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
                    <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                    <Link to="/register">
                        <button type="button" className="text-indigo-600 hover:text-indigo-500 mb-4">
                            New user? <span className="font-semibold">Register</span>
                        </button>
                    </Link>

                    <form className="space-y-4" onSubmit={submitHandler}>
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-indigo-400"
                                placeholder="Enter your email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Password</label>
                            <input
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-indigo-400"
                                placeholder="Enter your password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && (
                            <div role="alert" className="bg-red-100 border border-red-400 text-red-700 p-2 rounded-md">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div role="alert" className="bg-green-100 border border-green-400 text-green-700 p-2 rounded-md">
                                Login successfully.
                            </div>
                        )}

                        <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-500 transition duration-200">
                            Submit
                        </button>
                    </form>
                </div>
            </div>

           
        </div>
    );
}

export default Login;
