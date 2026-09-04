const Reservation = require("../models/Reservation");
const Accommodation = require("../models/Accommodation");

// Create a reservation
const createReservation = async (req, res, next) => {
    try {
        const {
            accommodationId,
            checkIn,
            checkOut,
            guests
        } = req.body;

        if (!accommodationId || !checkIn || !checkOut || !guests) {
            return res.status(400).json({
                message: "Accommodation, check-in, check-out and guests are required"
            });
        }

        const accommodation = await Accommodation.findById(accommodationId);

        if (!accommodation) {
            return res.status(404).json({
                message: "Accommodation not found"
            });
        }

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        if (checkOutDate <= checkInDate) {
            return res.status(400).json({
                message: "Check-out date must be after check-in date"
            });
        }

        if (guests > accommodation.guests) {
            return res.status(400).json({
                message: `This accommodation can only accommodate ${accommodation.guests} guests`
            });
        }

        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const numberOfNights = Math.ceil(
            (checkOutDate - checkInDate) / millisecondsPerDay
        );

        const accommodationCost =
            accommodation.price * numberOfNights;

        const totalPrice =
            accommodationCost +
            accommodation.cleaningFee +
            accommodation.serviceFee +
            accommodation.occupancyTaxes;

        const reservation = await Reservation.create({
            accommodationId,
            userId: req.user.id,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            guests,
            totalPrice
        });

        res.status(201).json(reservation);
    } catch (error) {
        next(error);
    }
};

const getReservationById = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id)
            .populate("accommodationId")
            .populate("userId", "username email");

        if (!reservation) {
            return res.status(404).json({
                message: "Reservation not found"
            });
        }

        if (reservation.userId._id.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to view this reservation"
            });
        }

        res.status(200).json(reservation);
    } catch (error) {
        next(error);
    }
};

// Get reservations made by the logged-in user
const getUserReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find({
            userId: req.user.id
        })
            .populate("accommodationId")
            .sort({ createdAt: -1 });

        res.status(200).json(reservations);
    } catch (error) {
        next(error);
    }
};

// Get reservations for accommodations owned by the logged-in host
const getHostReservations = async (req, res, next) => {
    try {
        const accommodations = await Accommodation.find({
            host: req.user.id
        }).select("_id");

        const accommodationIds = accommodations.map(
            accommodation => accommodation._id
        );

        const reservations = await Reservation.find({
            accommodationId: { $in: accommodationIds }
        })
            .populate("accommodationId")
            .populate("userId", "username email")
            .sort({ createdAt: -1 });

        res.status(200).json(reservations);
    } catch (error) {
        next(error);
    }
};
