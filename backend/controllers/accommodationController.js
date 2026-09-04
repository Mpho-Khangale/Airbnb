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