import { useState, useEffect, useRef } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import { MdDelete } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RefrshHandler from "./RefrshHandler";


function useKey(key, cb) {
    const callbackRef = useRef(cb);

    useEffect(() => {
        callbackRef.current = cb;
    });

    useEffect(() => {
        function handle(event) {
            if (event.code === key) {
                callbackRef.current(event);
            }
        }

        document.addEventListener("keypress", handle);
        return () => document.removeEventListener("keypress", handle);
    }, [key]);
}



function TodoApp() {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    const [allTodos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [completedTodos, setCompletedTodos] = useState([]);

    const [currentEdit, setCurrentEdit] = useState("");
    const [currentEditedItem, setCurrentEditedItem] = useState("");



    useEffect(() => {
            const savedTodo = JSON.parse.getItem("todolist"));
        const savedCompletedTodo = JSON.parse(
            .getItem("completedTodos")
        );

        if (savedTodo) setTodos(savedTodo);
        if (savedCompletedTodo) setCompletedTodos(savedCompletedTodo);
    }, []);



const handleAddTodo = () => {
    if (newTitle.trim() === "" || newDescription.trim() === "") {
        alert("Please add Title and Description");
        return;
    }

    const newTodoItem = {
        title: newTitle,
        description: newDescription,
    };

    const updatedTodoArr = [...allTodos, newTodoItem];

    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));

    setNewTitle("");
    setNewDescription("");
};


const handleDeleteTodo = (index) => {
    const reducedTodo = allTodos.filter((_, i) => i !== index);

    setTodos(reducedTodo);
    setItem("todolist", JSON.stringify(reducedTodo));
};


const handleComplete = (index) => {
    const now = new Date();

    const completedOn =
        `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}` +
        ` at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    const filteredItem = {
        ...allTodos[index],
        completedOn,
    };

    const updatedCompletedArr = [...completedTodos, filteredItem];

    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);

    localStorage.setItem(
        "completedTodos",
        JSON.stringify(updatedCompletedArr)
    );
};

const handleDeleteCompletedTodo = (index) => {
    const reducedTodo = completedTodos.filter((_, i) => i !== index);

    setCompletedTodos(reducedTodo);
    .setItem("completedTodos", JSON.stringify(reducedTodo));
};


const handleEdit = (index, item) => {
    setCurrentEdit(index);
    setCurrentEditedItem(item);
};

const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev) => ({
        ...prev,
        title: value,
    }));
};

const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev) => ({
        ...prev,
        description: value,
    }));
};

const handleUpdateTodo = () => {
    const newTodo = [...allTodos];
    newTodo[currentEdit] = currentEditedItem;

    setTodos(newTodo);
    setCurrentEdit("");

    setItem("todolist", JSON.stringify(newTodo));
};

useKey("Enter", handleAddTodo);



return ( <
    div className = "App" >
    <
    h1 > My Todos < /h1>

    <
    div className = "todo-wrapper" >

    {} <
    div className = "todo-input" >

    <
    div className = "todo-input-item" >
    <
    label > Title < /label> <
    input type = "text"
    value = { newTitle }
    placeholder = "What's your todo task"
    onChange = {
        (e) => setNewTitle(e.target.value)
    }
    /> < /
    div >

    <
    div className = "todo-input-item" >
    <
    label > Description < /label> <
    input type = "text"
    value = { newDescription }
    placeholder = "Describe your task"
    onChange = {
        (e) => setNewDescription(e.target.value)
    }
    /> < /
    div >

    <
    div className = "todo-input-item" >
    <
    button className = "primaryBtn"
    onClick = { handleAddTodo } >
    Add <
    /button> < /
    div > <
    /div>

    {} <
    div className = "btn-area" >
    <
    button className = { `secondaryBtn ${!isCompleteScreen && "active"}` }
    onClick = {
        () => setIsCompleteScreen(false)
    } >
    Todo <
    /button>

    <
    button className = { `secondaryBtn ${isCompleteScreen && "active"}` }
    onClick = {
        () => setIsCompleteScreen(true)
    } >
    Completed <
    /button> < /
    div >


    <
    div className = "todo-list" >


    {!isCompleteScreen &&
        allTodos.map((item, index) => {
            if (currentEdit === index) {
                return ( <
                    div className = "edit__wrapper"
                    key = { index } >
                    <
                    input placeholder = "Updated Title"
                    value = { currentEditedItem.title || "" }
                    onChange = {
                        (e) =>
                        handleUpdateTitle(e.target.value)
                    }
                    />

                    <
                    textarea rows = { 4 }
                    placeholder = "Updated Description"
                    value = { currentEditedItem.description || "" }
                    onChange = {
                        (e) =>
                        handleUpdateDescription(e.target.value)
                    }
                    />

                    <
                    button className = "primaryBtn"
                    onClick = { handleUpdateTodo } >
                    Update <
                    /button> < /
                    div >
                );
            }

            return ( <
                div className = "todo-list-item"
                key = { index } >
                <
                div >
                <
                h3 > { item.title } < /h3> <
                p > { item.description } < /p> < /
                div >

                <
                div >
                <
                MdDelete className = "icon"
                onClick = {
                    () => handleDeleteTodo(index)
                }
                />

                <
                FaCircleCheck className = "check-icon"
                onClick = {
                    () => handleComplete(index)
                }
                />

                <
                CiEdit className = "check-icon"
                onClick = {
                    () => handleEdit(index, item)
                }
                /> < /
                div > <
                /div>
            );
        })
    }

    = {
        isCompleteScreen &&
        completedTodos.map((item, index) => ( <
            div className = "todo-list-item"
            key = { index } >
            <
            div >
            <
            h3 > { item.title } < /h3> <
            p > { item.description } < /p> <
            p >
            <
            small > Completed On: { item.completedOn } < /small> < /
            p > <
            /div>

            <
            MdDelete className = "icon"
            onClick = {
                () => handleDeleteCompletedTodo(index)
            }
            /> < /
            div >
        ))
    } <
    /div> < /
    div > <
    /div>
);
}



function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const PrivateRoute = ({ element }) => {
        return isAuthenticated ? element : < Navigate to = "/login" / > ;
    };

    return ( <
        div className = "App" >
        <
        RefrshHandler setIsAuthenticated = { setIsAuthenticated }
        />

        <
        Routes >
        <
        Route path = "/"
        element = { < Navigate to = "/login" / > }
        /> <
        Route path = "/login"
        element = { < Login / > }
        /> <
        Route path = "/signup"
        element = { < Signup / > }
        />

        <
        Route path = "/home"
        element = { < PrivateRoute element = { < TodoApp / > }
            />} / >
            <
            /Routes> < /
            div >
        );
    }

    export default App;