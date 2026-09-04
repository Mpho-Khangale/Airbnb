const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Invalid MongoDB ID
    if (err.name === "CastError") {
        return res.status(400).json({
            message: "Invalid ID format"
        });
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: "Validation error",
            errors: Object.values(err.errors).map(error => error.message)
        });
    }

    // Duplicate value, such as an existing email
    if (err.code === 11000) {
        return res.status(409).json({
            message: "A record with this value already exists"
        });
    }

    // Default server error
    res.status(500).json({
        message: "Something went wrong"
    });
};

module.exports = errorHandler;