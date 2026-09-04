const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        tls: true,
        tlsAllowInvalidCertificates: true
        });

        console.log("MongoDB connected successfully");

        const hashedPassword = await bcrypt.hash("AdminPassword123", 10);

        const admin = await User.create({
            username: "admin",
            email: "admin@example.com",
            password: hashedPassword,
            role: "admin"
        });

        console.log("Admin created successfully");
        console.log(admin.email);

        await mongoose.disconnect();
    } catch (error) {
        console.error("Error creating admin:", error.message);
    }
};

createAdmin();