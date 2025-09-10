const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config()
connectDB();

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send("API is running");
});
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
const PORT = process.env.PORT || 500;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
}).on('error', (err) => {
    console.error('Server failed to start:', err);
});