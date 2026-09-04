const express = require("express");

const {
    registerUser,
    loginUser,
    createAdminUser
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/create-admin", createAdminUser);

module.exports = router;