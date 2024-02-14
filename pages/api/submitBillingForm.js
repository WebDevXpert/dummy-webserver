import connectMongo from '@/database/conn';
import BillingFormModel from '@/model/BillingFormModel';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Connect to MongoDB
            await connectMongo();

            // Create a new instance of the BillingFormModel with data from the request body
            const formData = new BillingFormModel(req.body);

            // Save the data to MongoDB
            await formData.save();

            return res.status(201).json({ message: 'Form submitted successfully' });
        } catch (error) {
            console.error('Error submitting form:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
