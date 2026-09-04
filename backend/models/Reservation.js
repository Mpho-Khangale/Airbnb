const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
    {
        accommodationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Accommodation",
            required: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        checkIn: {
            type: Date,
            required: true
        },

        checkOut: {
            type: Date,
            required: true
        },

        guests: {
            type: Number,
            required: true,
            min: 1
        },

        totalPrice: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Reservation", reservationSchema);