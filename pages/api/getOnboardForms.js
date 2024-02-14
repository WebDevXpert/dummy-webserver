import connectMongo from '@/database/conn';
import OnboardFormModel from '@/model/OnboardFormModel';

export default async function handler(req, res) {
    await connectMongo();

    if (req.method === 'GET') {
        // Handle GET request to fetch all onboard forms
        try {
            const onboardForms = await OnboardFormModel.find({});
            res.status(200).json({ onboardForms });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (req.method === 'POST') {
        // Handle POST request for form submission
        const { buNumber, billType, accountNumber } = req.body;

        try {
            // Custom validation for BU Number
            const buNumberRegex = /^bu[A-Za-z0-9]{1,5}$/;
            if (!buNumberRegex.test(buNumber)) {
                throw new Error('Invalid BU Number format');
            }

            // Custom validation for Account Number (exactly 11 digits)
            const accountNumberRegex = /^\d{11}$/;
            if (!accountNumberRegex.test(accountNumber)) {
                throw new Error('Account Number must be exactly 11 digits long');
            }

            // Create a new onboard form instance
            const newOnboardForm = new OnboardFormModel({
                buNumber,
                billType,
                accountNumber,
            });

            // Save the form to the database
            await newOnboardForm.save();

            res.status(201).json({ message: 'Form submitted successfully' });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: 'Bad Request' });
        }
    } else {
        // Handle other HTTP methods
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
