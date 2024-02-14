import React, { useState } from 'react';
import { toast } from 'react-toastify';

const BillingForm = () => {
    const accountNumbers = ["42424242424242", "43434343434343"];
    const engineeringUnits = {
        electric: ["kWh", "MWh"],
        gas: ["Therms", "SCF"],
    };

    const [formData, setFormData] = useState({
        accountNumber: '',
        billType: 'electric',
        serviceStartDate: '',
        serviceEndDate: '',
        billAmount: '',
        usageAmount: '',
        engineeringUnit: engineeringUnits['electric'][0],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'billType') {
            setFormData({
                ...formData,
                [name]: value,
                engineeringUnit: engineeringUnits[value][0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedFormData = {
            ...formData,
            accountNumber: formData.accountNumber || accountNumbers[0],
            serviceStartDate: formData.serviceStartDate || new Date().toISOString(),
            serviceEndDate: formData.serviceEndDate || new Date().toISOString(),
            billAmount: parseFloat(formData.billAmount) || 0,
            usageAmount: parseFloat(formData.usageAmount) || 0,
        };

        try {
            const response = await fetch('/api/submitBillingForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFormData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.log('Form submitted successfully');
            toast.success("Billing form created")
        } catch (error) {
            console.error('Error:', error);
            toast.error(error)
        }

        // Reset the form after successful submission
        setFormData({
            accountNumber: '',
            billType: 'electric',
            serviceStartDate: '',
            serviceEndDate: '',
            billAmount: '',
            usageAmount: '',
            engineeringUnit: engineeringUnits['electric'][0],
        });
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-md mx-auto mt-10 p-5 bg-sky-50 rounded-md shadow-md dark:bg-light-gray dark:text-white">
                <h2 className="text-2xl font-semibold mb-8 dark:bg-light-gray dark:text-white">Billing Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="accountNumber" className="block text-gray-600 font-semibold mb-2 dark:bg-light-gray dark:text-white">
                            Account Number
                        </label>
                        <select
                            id="accountNumber"
                            name="accountNumber"
                            className="w-full p-2 border rounded-md dark:bg-light-gray dark:text-white"
                            defaultValue=""
                        >
                            <option value="" disabled>Select Account Number</option>
                            {accountNumbers.map((number) => (
                                <option key={number} value={number}>{number}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="billType" className="block text-gray-600 font-semibold mb-2 dark:bg-light-gray dark:text-white">
                            Bill Type
                        </label>
                        <select
                            id="billType"
                            name="billType"
                            className="w-full p-2 border rounded-md dark:bg-light-gray dark:text-white"
                            value={formData.billType}
                            onChange={handleChange}
                        >
                            <option value="electric">Electric</option>
                            <option value="gas">Gas</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="serviceStartDate" className="block text-gray-600 font-semibold mb-2 dark:bg-light-gray dark:text-white">
                            Service Start Date
                        </label>
                        <input
                            type="date"
                            id="serviceStartDate"
                            name="serviceStartDate"
                            className="w-full p-2 border rounded-md dark:bg-light-gray dark:text-white"
                            value={formData.serviceStartDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="serviceEndDate" className="block text-gray-600 font-semibold mb-2 dark:bg-light-gray dark:text-white">
                            Service End Date
                        </label>
                        <input
                            type="date"
                            id="serviceEndDate"
                            name="serviceEndDate"
                            className="w-full p-2 border rounded-md dark:bg-light-gray dark:text-white"
                            value={formData.serviceEndDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="billAmount" className="block text-gray-600 font-semibold mb-2 dark:bg-light-gray dark:text-white">
                            Bill Amount ($)
                        </label>
                        <input
                            type="number"
                            id="billAmount"
                            name="billAmount"
                            className="w-full p-2 border rounded-md dark:bg-light-gray dark:text-white"
                            placeholder="Enter bill amount"
                            value={formData.billAmount}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="usageAmount" className="block text-gray-600 font-semibold mb-2 dark:bg-light-gray dark:text-white">
                            Usage Amount
                        </label>
                        <input
                            type="number"
                            id="usageAmount"
                            name="usageAmount"
                            className="w-full p-2 border rounded-md dark:bg-light-gray dark:text-white"
                            placeholder="Enter usage amount"
                            value={formData.usageAmount}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="engineeringUnit" className="block text-gray-600 font-semibold mb-2 dark:bg-light-gray dark:text-white">
                            Engineering Unit
                        </label>
                        <select
                            id="engineeringUnit"
                            name="engineeringUnit"
                            className="w-full p-2 border rounded-md dark:bg-light-gray dark:text-white"
                            value={formData.engineeringUnit}
                            onChange={handleChange}
                        >
                            {engineeringUnits[formData.billType].map((unit) => (
                                <option key={unit} value={unit}>{unit}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BillingForm;
