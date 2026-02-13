const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const app = express();
const PORT = 3000;
app.use(express.json());

app.use(session({
    secret: "sessionsecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

const JWT_SECRET = "jwtsecret";
let users = [];
const signupSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

function authJWT(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(401).json({ message: "JWT token required" });
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ message: "Invalid JWT token" });
    }
}

function authSession(req, res, next) {
    if (!req.session.user)
        return res.status(401).json({ message: "Session login required" });

    next();
}
app.post("/signup", async(req, res) => {
    const { error } = signupSchema.validate(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    };
    users.push(user);

    res.json({ message: "User registered" });
});
app.post("/login-jwt", async(req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });
    const user = users.find(u => u.email === req.body.email);
    if (!user)
        return res.status(401).json({ message: "Invalid credentials" });
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
        return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user.id, email: user.email },
        JWT_SECRET, { expiresIn: "1h" }
    );
    res.json({ message: "JWT Login successful", token });
});
app.post("/login-session", async(req, res) => {
    const user = users.find(u => u.email === req.body.email);
    if (!user)
        return res.status(401).json({ message: "Invalid credentials" });
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
        return res.status(401).json({ message: "Invalid credentials" });
    req.session.user = {
        id: user.id,
        email: user.email
    };
    res.json({ message: "Session login successful" });
});

app.get("/protected-jwt", authJWT, (req, res) => {
    res.json({
        message: "Accessed with JWT",
        user: req.user
    });
});
app.get("/protected-session", authSession, (req, res) => {
    res.json({
        message: "Accessed with Session",
        user: req.session.user
    });
});
app.post("/logout-session", authSession, (req, res) => {
    req.session.destroy(() => {
        res.json({ message: "Session logged out" });
    });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
