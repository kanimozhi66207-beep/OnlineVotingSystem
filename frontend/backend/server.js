const express = require("express");
const cors = require("cors");

const { router: authRoutes } = require("./routes/auth");
const voteRoutes = require("./routes/vote");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Online Voting System Backend is Running!");
});

app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        message: "Backend is working successfully!"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/vote", voteRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});