import React from 'react';

const RegistrationForm = () => {
    return (
        <div className="min-h-full">
            <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded-md shadow-md dark:bg-light-gray dark:text-white">
                <h2 className="text-2xl font-semibold mb-8 dark:bg-light-gray dark:text-white">Register</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600 font-semibold mb-2 dark:bg-light-gray dark:text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-light-gray dark:text-white"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600 font-semibold mb-2 dark:bg-light-gray dark:text-white">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-light-gray dark:text-white"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-600 font-semibold mb-2 dark:bg-light-gray dark:text-white">
                            Confirm Password
                        </label>
                        <input
                            type="current-password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-light-gray dark:text-white"
                            placeholder="Confirm your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
