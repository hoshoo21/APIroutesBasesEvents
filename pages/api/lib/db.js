const { MongoClient } = require('mongodb');

const connectDB = async () => {
    try {
        const url = '';
        //"mongodb://localhost:27017/EventSystem"
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db("EventSystem");
        console.log('MongoDB connected successfully');
        return db;
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;