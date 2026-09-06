const express = require("express");
const {
    createAccommodation,
    getAccommodations,
    getAccommodationById,
    updateAccommodation,
    deleteAccommodation
} = require("../controllers/accommodationController");

const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.get("/", getAccommodations);


router.get("/:id", getAccommodationById);

router.post("/", protect, adminOnly, createAccommodation);

router.put("/:id", protect, adminOnly, updateAccommodation);

router.delete("/:id", protect, adminOnly, deleteAccommodation);

module.exports = router;