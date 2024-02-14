import connectMongo from '@/database/conn';
import OnboardFormModel from '@/model/OnboardFormModel';

export default async function handler(request, response) {
    try {
        await connectMongo();

        if (request.method === 'GET') {
            const { buNumbersCount, buNumbers } = await fetchUpdatedBUData();
            response.status(200).json({ buNumbersCount, buNumbers });
        } else {
            response.status(405).json({ message: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error('Error:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

async function fetchUpdatedBUData() {
    try {
        const buNumbers = await OnboardFormModel.find({}, 'buNumber name');
        const buNumbersCount = buNumbers.length;
        console.log('Fetched BU Numbers:', buNumbers);
        return { buNumbersCount, buNumbers };
    } catch (error) {
        console.error('Error fetching BU numbers:', error);
        throw error;
    }
}
