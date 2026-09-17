const express = require("express");
const router = express.Router();

const voters = {};

router.post("/verify", (req, res) => {
    const { voterId, name, dob } = req.body;

    if (!voterId || !name || !dob) {
        return res.status(400).json({
            success: false,
            message: "Please enter all voter details."
        });
    }

    if (voters[voterId]?.hasVoted) {
        return res.status(403).json({
            success: false,
            message: "This voter has already voted."
        });
    }

    voters[voterId] = {
        voterId,
        name,
        dob,
        hasVoted: false
    };

    res.json({
        success: true,
        message: "Voter verified successfully.",
        voter: voters[voterId]
    });
});

module.exports = { router, voters };