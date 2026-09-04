const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        type: {
            type: String,
            required: true
        },

        bedrooms: {
            type: Number,
            required: true,
            min: 0
        },

        bathrooms: {
            type: Number,
            required: true,
            min: 0
        },

        guests: {
            type: Number,
            required: true,
            min: 1
        },

        amenities: {
            type: [String],
            default: []
        },

        images: {
            type: [String],
            default: []
        },

        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },

        reviews: {
            type: Number,
            default: 0,
            min: 0
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        weeklyDiscount: {
            type: Number,
            default: 0,
            min: 0
        },

        cleaningFee: {
            type: Number,
            default: 0,
            min: 0
        },

        serviceFee: {
            type: Number,
            default: 0,
            min: 0
        },

        occupancyTaxes: {
            type: Number,
            default: 0,
            min: 0
        },

        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Accommodation", accommodationSchema);