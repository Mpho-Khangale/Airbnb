const express = require("express");

const {
    createReservation,
    getReservationById,
    getUserReservations,
    getHostReservations,
    updateReservation,
    deleteReservation
} = require("../controllers/reservationController");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, createReservation);

router.get("/user", protect, getUserReservations);

router.get("/host", protect, getHostReservations);

router.get("/:id", protect, getReservationById);

router.put("/:id", protect, updateReservation);

router.delete("/:id", protect, deleteReservation);

module.exports = router;