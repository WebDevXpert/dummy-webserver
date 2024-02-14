import React, { useState } from 'react';
import { toast } from 'react-toastify';

const OnboardForm = () => {
    const initialState = {
        buNumber: '',
        billType: 'Electric',
        accountNumber: '',
        grid: 'AKGD',
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/submitForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();
            console.log('Server Response:', responseData);

            if (response.ok) {
                console.log('Form submitted successfully');
                toast.success('Onboard form created');
                window.location.href = "/bu";
            } else {
                console.error('Failed to submit form');
                toast.error(responseData.error || 'Failed to submit form');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.message || 'An error occurred');
        }

        setFormData(initialState);
    };

    return (
        <div className="min-h-screen flex items-center">
            <div className="max-w-md mx-auto p-8 bg-sky-50 rounded-md shadow-md dark:bg-light-gray dark:text-white">
                <h2 className="text-2xl font-semibold mb-4 dark:bg-light-gray dark:text-white">Site Onboard Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 dark:bg-light-gray dark:text-white" htmlFor="buNumber">
                            BU Number
                        </label>
                        <input
                            type="text"
                            id="buNumber"
                            name="buNumber"
                            value={formData.buNumber}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-light-gray dark:text-white"
                            required
                            pattern="^BU\d{4}[A-Z]?$"
                            placeholder='BU65D or BU65DS'
                            title="Please enter a valid BU number in the format BU + 4 digits + 1 optional uppercase letter"
                        />
                    </div>
                    <div className="mb-4 dark:bg-light-gray dark:text-white">
                        <label className="block text-gray-700 text-sm font-bold mb-2 dark:bg-light-gray dark:text-white" htmlFor="billType">
                            Bill Type
                        </label>
                        <select
                            id="billType"
                            name="billType"
                            value={formData.billType}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-light-gray dark:text-white"
                            required
                        >
                            <option value="Electric">Electric</option>
                            <option value="Natural Gas">Natural Gas</option>
                            <option value="Propane">Propane</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 dark:bg-light-gray dark:text-white" htmlFor="accountNumber">
                            Account Number
                        </label>
                        <input
                            type="text"
                            id="accountNumber"
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-light-gray dark:text-white"
                            required
                            pattern="^[\w\-]+(?:-[\w]+)?$"
                            placeholder='123-A or ABC-123'
                            title="Account Number should contain alphabets, digits, and hyphens"
                        />
                    </div>

                    {formData.billType === 'Electric' && (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 dark:bg-light-gray dark:text-white" htmlFor="grid">
                                Grid
                            </label>
                            <select
                                id="text"
                                name="grid"
                                value={formData.grid}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-light-gray dark:text-white"
                                required
                            >
                                <option value="AKGD">AKGD</option>
                                <option value="AKMS">AKMS</option>
                                <option value="AKGD">AZNM</option>
                                <option value="AKMS">CAMX</option>
                                <option value="AKGD">ERCT</option>
                                <option value="AKMS">FRCC</option>
                                <option value="AKGD">HIMS</option>
                                <option value="AKMS">HIOA</option>
                                <option value="AKGD">MROE</option>
                                <option value="AKMS">MROW</option>
                                <option value="AKGD">NEWE</option>
                                <option value="AKMS">NWPP</option>
                                <option value="AKGD">NYCW</option>
                                <option value="AKMS">NYLI</option>
                                <option value="AKGD">NYUP</option>
                                <option value="AKMS">PRMS</option>
                                <option value="AKGD">RFCE</option>
                                <option value="AKMS">RFCM</option>
                                <option value="AKGD">RFCW</option>
                                <option value="AKMS">RMPA</option>
                                <option value="AKGD">SPNO</option>
                                <option value="AKMS">SPSO</option>
                                <option value="AKGD">SRMV</option>
                                <option value="AKMS">SRMW</option>
                                <option value="AKGD">SRSO</option>
                                <option value="AKMS">SRTV</option>
                            </select>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OnboardForm;
