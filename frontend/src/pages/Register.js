import { useState } from "react";
import api from "../api";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async() => {
        await api.post("/register", {
            email,
            password,
        });

        alert("Register Successful");
        window.location.href = "/login";
    };

    return ( <
        div style = {
            { padding: 30 } } >
        <
        h2 > Register < /h2>{" "} <
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
        button onClick = { register } > Register < /button>{" "} <
        /div>
    );
}