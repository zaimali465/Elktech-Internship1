import { useState } from "react";
import api from "../api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async() => {
        const res = await api.post("/login", {
            email,
            password,
        });

        localStorage.setItem("token", res.data.token);

        alert("Login Success");

        window.location.href = "/tasks";
    };

    return ( <
        div style = {
            { padding: 30 } } >
        <
        h2 > Login < /h2>{" "} <
        input placeholder = "Email"
        onChange = {
            (e) => setEmail(e.target.value) }
        />{" "} <
        br / > < br / >
        <
        input type = "password"
        placeholder = "Password"
        onChange = {
            (e) => setPassword(e.target.value) }
        />{" "} <
        br / > < br / >
        <
        button onClick = { login } > Login < /button>{" "} <
        /div>
    );
}