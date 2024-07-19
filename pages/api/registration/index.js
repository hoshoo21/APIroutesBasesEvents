import connectDB from '../lib/db';
import UserRegisteration from '../models/userRegisteration';
export default async function handler(req, res) {

    const db = await connectDB();

    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                console.log(req.body)
                const fetchedEamil = req.body.email;
                if (!fetchedEamil) {
                    res.status(422).json({ 'message': 'email address is not valid' });
                }
                const userRegisterationMOdel = {
                    id: new Date().toISOString(),
                    email: fetchedEamil,
                };
                const savedUser = db.collection("UserRegisteration").insertOne(userRegisterationMOdel);
                //const userRegisteration = new UserRegisteration(userRegisterationMOdel);
                //const savedUser = await userRegisteration.save();
                res.status(201).json({ "usser": savedUser });
            } catch (error) {
                console.log(error);
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
