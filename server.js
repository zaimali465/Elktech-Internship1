const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
let users = [
    { id: 1, name: "Zain" },
    { id: 2, name: "Ali" }
];
let tasks = [
    { id: 1, title: "Pushups" },
    { id: 2, title: "Situps" }
];

app.get('/users', (req, res) => {
    res.send(users);
});
app.post('/users', (req, res) => {
    const newUser = { id: users.length + 1, name: req.body.name };
    users.push(newUser);
    res.send(newUser);
});
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.send("User not found");
    user.name = req.body.name;
    res.send(user);
});
app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.send("User not found");
    const deleted = users.splice(index, 1);
    res.send(deleted[0]);
});
app.get('/tasks', (req, res) => {
    res.send(tasks);
});
app.post('/tasks', (req, res) => {
    const newTask = { id: tasks.length + 1, title: req.body.title };
    tasks.push(newTask);
    res.send(newTask);
});
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});