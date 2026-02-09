const express = require("express");
const app = express();
const PORT = 3000;
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.use(express.json());
const secret = "mysecretkey";

let users = [];
let tasks = [];

const signupSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const taskSchema = Joi.object({
    title: Joi.string().min(1).required(),
    status: Joi.string().valid("pending", "completed").optional()
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


app.get("/users", auth, (req, res) => res.json(users));

app.put("/users/:id", auth, (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });
    user.name = req.body.name || user.name;
    res.json(user);
});


app.delete("/users/:id", auth, (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "User not found" });
    const deleted = users.splice(index, 1);
    res.json(deleted[0]);
});

app.get("/tasks", auth, (req, res) => res.json(tasks));

app.post("/tasks", auth, (req, res) => {
    const { error } = taskSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const task = { id: tasks.length + 1, title: req.body.title, status: req.body.status || "pending" };
    tasks.push(task);
    res.status(201).json(task);
});

app.put("/tasks/:id", auth, (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: "Task not found" });
    task.title = req.body.title || task.title;
    task.status = req.body.status || task.status;
    res.json(task);
});

app.delete("/tasks/:id", auth, (req, res) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Task not found" });
    const deleted = tasks.splice(index, 1);
    res.json(deleted[0]);
});

app.listen(PORT, () => console.log(`Assessment Server running on port ${PORT}`));