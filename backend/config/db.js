const mongoose = require("mongoose");

const connectDB = () => {
    return mongoose.connect(process.env.MONGO_URI, {
        tls: true,
        tlsAllowInvalidCertificates: true
    });
};

module.exports = connectDB;