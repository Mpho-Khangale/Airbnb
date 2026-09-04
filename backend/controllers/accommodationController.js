const Accommodation = require("../models/Accommodation");

const createAccommodation = async (req, res, next) => {
    try {
        const accommodation = await Accommodation.create({
            ...req.body,
            host: req.user.id
        });

        res.status(201).json(accommodation);
    } catch (error) {
        next(error);
    }
};

const getAccommodations = async (req, res, next) => {
    try {
        const accommodations = await Accommodation.find()
            .populate("host", "username email");

        res.status(200).json(accommodations);
    } catch (error) {
        next(error);
    }
};