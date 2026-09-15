const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const accommodationRoutes = require("./routes/accommodationRoutes");
const userRoutes = require("./routes/userRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true
    })
);
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

        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();