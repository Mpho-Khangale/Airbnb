const express = require("express");
const {
    createAccommodation,
    getAccommodations,
    getAccommodationById,
    updateAccommodation,
    deleteAccommodation
} = require("../controllers/accommodationController");

const { protect } = require("../middleware/auth");

const router = express.Router();

// Get all accommodations
router.get("/", getAccommodations);

// Get one accommodation
router.get("/:id", getAccommodationById);

// Create an accommodation
router.post("/", protect, createAccommodation);

// Update an accommodation
router.put("/:id", protect, updateAccommodation);

// Delete an accommodation
router.delete("/:id", protect, deleteAccommodation);

module.exports = router;