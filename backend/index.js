import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import travelRoutes from './routes/TravelRoute.js';
import cors from 'cors'; // Import CORS

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECT_STRING)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB connection error:", err));

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON request body
app.use(express.json());

// Define routes
app.use('/travels', travelRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
