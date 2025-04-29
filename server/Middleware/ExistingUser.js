const User = require('../models/userSchema.js');

const existingUser = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }

        const user_existing = await User.findOne({ email });

        if (user_existing) {
            return res.status(400).json({ message: "User already exists, please log in." });
        }

        next();
    } catch (error) {
        console.error("Error checking existing user:", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};





module.exports = { existingUser};
