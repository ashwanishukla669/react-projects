const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

const connectDB  = async () => {    
    try {
        
        await mongoose.connect(mongoURI);
        console.log("MongoDB Connected");

    } catch (error) {        
        console.error(error.message);
    }
}

module.exports = connectDB;