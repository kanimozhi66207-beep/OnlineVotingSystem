const express = require("express");
const router = express.Router();

const { voters } = require("./auth");

const votes = {};

router.post("/submit", (req, res) => {
    const { voterId, candidate } = req.body;

    if (!voterId || !candidate) {
        return res.status(400).json({
            success: false,
            message: "Voter ID and candidate are required."
        });
    }

    const voter = voters[voterId];

    if (!voter) {
        return res.status(404).json({
            success: false,
            message: "Voter not verified."
        });
    }

    if (voter.hasVoted) {
        return res.status(403).json({
            success: false,
            message: "You have already voted."
        });
    }

    votes[voterId] = candidate;
    voter.hasVoted = true;

    res.json({
        success: true,
        message: "Vote submitted successfully.",
        candidate: candidate
    });
});

module.exports = router;