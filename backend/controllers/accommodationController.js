const Accommodation = require("../models/Accommodation");

// Create a new accommodation
const createAccommodation = async (req, res, next) => {
    try {
        const {
            title,
            location,
            description,
            type,
            bedrooms,
            bathrooms,
            guests,
            amenities,
            images,
            rating,
            reviews,
            price,
            weeklyDiscount,
            cleaningFee,
            serviceFee,
            occupancyTaxes
        } = req.body;

        // Check required fields
        if (
            !title ||
            !location ||
            !description ||
            !type ||
            bedrooms === undefined ||
            bathrooms === undefined ||
            guests === undefined ||
            price === undefined
        ) {
            return res.status(400).json({
                message: "Title, location, description, type, bedrooms, bathrooms, guests and price are required"
            });
        }

        // Validate numeric values
        if (
            bedrooms < 0 ||
            bathrooms < 0 ||
            guests < 1 ||
            price < 0 ||
            (rating !== undefined && (rating < 0 || rating > 5)) ||
            (reviews !== undefined && reviews < 0) ||
            (weeklyDiscount !== undefined && weeklyDiscount < 0) ||
            (cleaningFee !== undefined && cleaningFee < 0) ||
            (serviceFee !== undefined && serviceFee < 0) ||
            (occupancyTaxes !== undefined && occupancyTaxes < 0)
        ) {
            return res.status(400).json({
                message: "Invalid accommodation values"
            });
        }

        const accommodation = await Accommodation.create({
            title: title.trim(),
            location: location.trim(),
            description: description.trim(),
            type: type.trim(),
            bedrooms,
            bathrooms,
            guests,
            amenities: amenities || [],
            images: images || [],
            rating: rating || 0,
            reviews: reviews || 0,
            price,
            weeklyDiscount: weeklyDiscount || 0,
            cleaningFee: cleaningFee || 0,
            serviceFee: serviceFee || 0,
            occupancyTaxes: occupancyTaxes || 0,
            host: req.user.id
        });

        res.status(201).json(accommodation);
    } catch (error) {
        next(error);
    }
};

// Get all accommodations
const getAccommodations = async (req, res, next) => {
    try {
        const accommodations = await Accommodation.find()
            .populate("host", "username email");

        res.status(200).json(accommodations);
    } catch (error) {
        next(error);
    }
};

// Get one accommodation by ID
const getAccommodationById = async (req, res, next) => {
    try {
        const accommodation = await Accommodation.findById(req.params.id)
            .populate("host", "username email");

        if (!accommodation) {
            return res.status(404).json({
                message: "Accommodation not found"
            });
        }

        res.status(200).json(accommodation);
    } catch (error) {
        next(error);
    }
};

// Update an accommodation
const updateAccommodation = async (req, res, next) => {
    try {
        const accommodation = await Accommodation.findById(req.params.id);

        if (!accommodation) {
            return res.status(404).json({
                message: "Accommodation not found"
            });
        }

        if (accommodation.host.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to update this accommodation"
            });
        }

        const allowedFields = [
            "title",
            "location",
            "description",
            "type",
            "bedrooms",
            "bathrooms",
            "guests",
            "amenities",
            "images",
            "rating",
            "reviews",
            "price",
            "weeklyDiscount",
            "cleaningFee",
            "serviceFee",
            "occupancyTaxes"
        ];

        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                accommodation[field] = req.body[field];
            }
        });

        // Validate updated values
        if (
            accommodation.bedrooms < 0 ||
            accommodation.bathrooms < 0 ||
            accommodation.guests < 1 ||
            accommodation.price < 0 ||
            accommodation.rating < 0 ||
            accommodation.rating > 5 ||
            accommodation.reviews < 0 ||
            accommodation.weeklyDiscount < 0 ||
            accommodation.cleaningFee < 0 ||
            accommodation.serviceFee < 0 ||
            accommodation.occupancyTaxes < 0
        ) {
            return res.status(400).json({
                message: "Invalid accommodation values"
            });
        }

        const updatedAccommodation = await accommodation.save();

        res.status(200).json(updatedAccommodation);
    } catch (error) {
        next(error);
    }
};

// Delete an accommodation
const deleteAccommodation = async (req, res, next) => {
    try {
        const accommodation = await Accommodation.findById(req.params.id);

        if (!accommodation) {
            return res.status(404).json({
                message: "Accommodation not found"
            });
        }

        if (accommodation.host.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to delete this accommodation"
            });
        }

        await accommodation.deleteOne();

        res.status(200).json({
            message: "Accommodation deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createAccommodation,
    getAccommodations,
    getAccommodationById,
    updateAccommodation,
    deleteAccommodation
};