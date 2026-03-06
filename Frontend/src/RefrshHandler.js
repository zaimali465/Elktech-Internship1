import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefrshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            // User is logged in
            setIsAuthenticated(true);

            // Redirect from login/signup/home page if already logged in
            if (['/', '/login', '/signup'].includes(location.pathname)) {
                navigate('/home', { replace: true });
            }
        } else {
            // User not logged in
            setIsAuthenticated(false);

            // Redirect to login if trying to access protected routes
            if (location.pathname === '/home') {
                navigate('/login', { replace: true });
            }
        }
    }, [location, navigate, setIsAuthenticated]);

    return null; // Component renders nothing
}

export default RefrshHandler;