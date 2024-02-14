import { useDarkMode } from '@/context/DarkmodeContext';
import React, { useState, useEffect } from 'react';

const Bu = () => {
    const [onboardForms, setOnboardForms] = useState([]);
    const [sortOrder, setSortOrder] = useState('newest');
    const [loading, setLoading] = useState(true);
    const { darkMode } = useDarkMode()
    console.log("darkMode bu", darkMode)

    useEffect(() => {
        const fetchOnboardForms = async () => {
            try {
                const response = await fetch('/api/getOnboardForms');
                const data = await response.json();
                let forms = data.onboardForms;

                if (sortOrder === 'newest') {
                    forms.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                } else if (sortOrder === 'oldest') {
                    forms.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                } else if (sortOrder === 'buAsc') {
                    forms.sort((a, b) => {
                        // Extract BU numbers for comparison
                        const buA = parseInt(a.buNumber.match(/\d+/)[0]);
                        const buB = parseInt(b.buNumber.match(/\d+/)[0]);
                        return buA - buB;
                    });
                } else if (sortOrder === 'buDesc') {
                    forms.sort((a, b) => {
                        // Extract BU numbers for comparison
                        const buA = parseInt(a.buNumber.match(/\d+/)[0]);
                        const buB = parseInt(b.buNumber.match(/\d+/)[0]);
                        return buB - buA;
                    });
                }

                setOnboardForms(forms);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching onboard forms:', error);
                setLoading(false);
            }
        };

        fetchOnboardForms();
    }, [sortOrder]);

    const handleSort = (order) => {
        setSortOrder(order);
    };

    return (
        <div className="mt-8">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="relative">
                    <div className="mb-4 flex justify-between">
                        <h1 className="text-2xl font-bold ml-20">Site Onboard</h1>
                        <select
                            className={`ml-20 outline-none mr-28 px-2 py-1 rounded-md  ${darkMode ? "bg-light-gray text-white" : "bg-sky-50 text-black"}`}
                            value={sortOrder}
                            onChange={(e) => handleSort(e.target.value)}
                        >
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                            <option value="buAsc">BU Asc</option>
                            <option value="buDesc">BU Desc</option>
                        </select>
                    </div>
                    <table className="w-10/12 ml-20 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-sm text-gray-700 uppercase">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    BU Number
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Account Number
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Bill Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Grid
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {onboardForms.map((form) => (
                                // <tr key={form._id} className="bg-white text-light-gray border-b dark:bg-gray-800 dark:border-gray-700">
                                <tr key={form._id} className={`${darkMode ? "bg-light-gray text-white" : "bg-sky-50 text-black"}`}>
                                    <td className="px-7 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {form.buNumber}
                                    </td>
                                    <td className="px-10 py-4">{form.accountNumber}</td>
                                    <td className="px-7 py-4">{form.billType}</td>
                                    {form.billType === 'Electric' ? (
                                        <td className="px-7 py-4">{form.grid}</td>
                                    ) : (
                                        <td className="px-7 py-4">N/A</td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Bu;
