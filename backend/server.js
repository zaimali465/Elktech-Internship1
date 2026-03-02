require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const Task = require("./models/Task");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log("MongoDB Error:", err.message);
    });

app.get("/", (req, res) => {
    res.send("Backend Working");
});

app.post("/register", async(req, res) => {
    try {
        const { email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
        });

        res.json(user);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

app.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json("User not found");
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return res.status(400).json("Wrong password");
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({
            token,
            user,
        });
    } catch (err) {
        res.status(500).json(err.message);
    }
});

const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json("No token");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch {
        res.status(401).json("Invalid Token");
    }
};

app.post("/tasks", auth, async(req, res) => {
    try {
        const task = await Task.create({
            title: req.body.title,
            userId: req.user.id,
        });

        res.json(task);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

app.get("/tasks", auth, async(req, res) => {
    try {
        const tasks = await Task.find({
            userId: req.user.id,
        });

        res.json(tasks);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});