const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo DB connected");
    } catch (err) {
        console.error("db connection :", err.message);
        process.exit(1);
    }
}
module.exports = connectDB;