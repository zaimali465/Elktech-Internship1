import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(getItem('loggedInUser'));
    }, []);

    const handleLogout = () => {
        removeItem('token');
        removeItem('loggedInUser');
        handleSuccess('User logged out');
        setTimeout(() => navigate('/login'), 1000);
    };

    const fetchProducts = async () => {
        try {
            const url = "http://localhost:8000/products"; // Corrected URL
            const token = localStorage.getItem('token');

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setProducts(result);
        } catch (err) {
            handleError(err.message || err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Welcome {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>



            <ToastContainer />
        </div>
    );
}

export default Home;
