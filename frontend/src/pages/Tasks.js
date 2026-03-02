import { useState, useEffect } from "react";
import api from "../api";

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    const token = localStorage.getItem("token");

    const headers = {
        Authorization: token,
    };

    const loadTasks = async() => {
        const res = await api.get("/tasks", { headers });
        setTasks(res.data);
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const addTask = async() => {
        await api.post("/tasks", { title }, { headers });

        setTitle("");
        loadTasks();
    };

    return ( <
        div style = {
            { padding: 30 } } >
        <
        h2 > Task Dashboard < /h2> <
        input value = { title }
        placeholder = "New Task"
        onChange = {
            (e) => setTitle(e.target.value) }
        /> <
        button onClick = { addTask } > Add Task < /button> <
        ul > { " " } {
            tasks.map((task) => ( <
                li key = { task._id } > { task.title } < /li>
            ))
        } { " " } <
        /ul>{" "} <
        /div>
    );
}