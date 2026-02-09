const express = require("express");
const app = express();
const PORT = 3000;

const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.use(express.json());

const secret = "mysecretkey";
let users = [];
const signupSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

app.post("/signup", async(req, res) => {
    const { error } = signupSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    };
    users.push(user);
    res.status(201).json({ message: "User created!", user: { id: user.id, name: user.name, email: user.email } });
});
app.post("/login", async(req, res) => {
    const user = users.find(u => u.email === req.body.email);
    if (!user) return res.status(401).json({ message: "Invalid email" });
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(401).json({ message: "Invalid password" });
    const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
});

function auth(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ message: "No token provided" });
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ message: "Invalid token" });
    }
}
app.get("/users", auth, (req, res) => res.json(users));
app.listen(PORT, () => console.log(`Exercise Server running on port ${PORT}`));