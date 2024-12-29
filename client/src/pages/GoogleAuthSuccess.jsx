import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const GoogleAuthSuccess = () => {
    const navigate = useNavigate();
    const { setUser, updateUserContext } = useContext(UserContext);

    useEffect(() => {
        const handleAuth = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const token = urlParams.get('token');
                console.log(token);
                if (token) {
                    localStorage.setItem('token', token);
                    await updateUserContext();
                    navigate('/');
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error during authentication:', error);
                navigate('/login');
            }
        };

        handleAuth();
    }, [navigate, updateUserContext]);

    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 h-12 w-12 dark:border-gray-600 dark:border-t-gray-50" />
                <p className="text-gray-500 dark:text-gray-400">Loading content...</p>
            </div>
        </div>
    );
};

export default GoogleAuthSuccess;
