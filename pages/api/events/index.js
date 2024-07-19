// pages/api/feedback.js
import connectDB from '../lib/db';
import Event from '../models/event';

export default async function handler(req, res) {
    await connectDB();

    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                const eventModel = {
                    id: new Date().toISOString(),
                    title: req.body.title,
                    description: req.body.description,
                    location: req.body.location,
                    date: req.body.date,
                    image: req.body.image
                };
                const event = new Event(eventModel);
                const savedEvent = await event.save();
                res.status(201).json({ "event": savedEvent });
            } catch (error) {
                res.status(500).json({ message: 'Error creating feedback', error });
            }
            break;

        case 'GET':
            try {

                const { id } = req.query;
                if (!id) {
                    const events = await Event.find({});
                    res.status(200).json({ "events": events });
                }
                else {
                    const event = await Event.find({ id: id });
                    if (event) {
                        res.status(200).json({ "event": event });

                    }
                    else {
                        res.status(200).json({ "message": "event not found" });

                    }
                }
            } catch (error) {
                res.status(500).json({ message: 'Error retrieving event', error });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}
