import connectDB from '../lib/db';
import UserRegisteration from '../models/userRegisteration';
export default async function handler(req, res) {

    await connectDB();

    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                const userRegisterationMOdel = {
                    id: new Date().toISOString(),
                    email: req.body.email,
                };
                const userRegisteration = new UserRegisteration(userRegisterationMOdel);
                const savedUser = await userRegisteration.save();
                res.status(201).json({ "usser": savedUser });
            } catch (error) {
                res.status(500).json({ message: 'Error creating user', error });
            }
            break;

        case 'GET':
            try {
                console.log('No method impleemented yet')
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating user', error });

            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}
