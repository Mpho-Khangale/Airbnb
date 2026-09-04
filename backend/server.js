const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const accommodationRoutes = require("./routes/accommodationRoutes");
const userRoutes = require("./routes/userRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
console.log("MONGO_URI loaded:", !!process.env.MONGO_URI);

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/accommodations", accommodationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reservations", reservationRoutes);

// Error handling middleware
app.use(errorHandler);

// Test route
app.get("/", (req, res) => {
    res.json({ message: "Airbnb API is running" });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();