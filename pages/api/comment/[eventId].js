// pages/api/feedback.js
import connectDB from '../lib/db';
import Comment from '../models/comment';

export default async function handler(req, res) {
    await connectDB();

    const { method } = req;
    switch (method) {
        case 'POST':
            try {
                const commentModel = {
                    id: new Date().toISOString(),
                    name: req.body.name,
                    eventId: req.body.eventId,
                    email: req.body.email,
                    comment: req.body.comment,
                    date: new Date().toDateString(),
                };
                console.log(commentModel)
                const comment = new Comment(commentModel);
                const savedComment = await comment.save();
                res.status(201).json({ "comment": savedComment });
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: 'Error creating comment', error });
            }
            break;

        case 'GET':
            try {
                console.log(req.query);
                const { eventId } = req.query;
                const comments = await Comment.find({ eventId: eventId });
                console.log(comments);
                res.status(200).json({ "comments": comments });
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
