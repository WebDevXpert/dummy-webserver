
import connectMongo from '../../../database/conn';
import Users from '../../../model/Schema'
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
    connectMongo().catch(error => res.json({ error: "Connection Failed...!" }))

    if (req.method === 'POST') {
        try {
            const { name, email, password } = req.body;

            const checkExisting = await Users.findOne({ email });
            if (checkExisting) {
                return res.status(422).json({ message: "User Already Exists...!" });
            }

            const hashedPassword = await hash(password, 12);
            const newUser = new Users({ name, email, password: hashedPassword });
            await newUser.save();

            return res.status(201).json({ status: true, user: newUser });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        return res.status(500).json({ message: "HTTP method not valid. Only POST is accepted" });
    }
}