import mongoose from 'mongoose';

const connectDB = (handler) => async (req, res) => {
    mongoose.connect(process.env.MONGODB_URL);
    return handler(req, res);
};

module.exports = connectDB;
