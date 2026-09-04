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

        Object.assign(accommodation, req.body);

        const updatedAccommodation = await accommodation.save();

        res.status(200).json(updatedAccommodation);
    } catch (error) {
        next(error);
    }
};