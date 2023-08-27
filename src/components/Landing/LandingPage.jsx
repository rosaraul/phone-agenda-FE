import React from 'react';
import { motion } from 'framer-motion';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    const handleOnClickLogin = () =>{
        navigate('/login');
    }
    const handleOnClickRegister = () =>{
        navigate('/register');
    }


    return (
        <div className="landing-container">
            <div className="background"></div>
            <motion.div
                className="content-box"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                <h1 className="welcome-text">Welcome To Your Agenda</h1>
                <div className="button-container">
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        onClick={handleOnClickLogin}
                        className="custom-button"
                    >
                        Login
                    </motion.button>
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        onClick={handleOnClickRegister}
                        className="custom-button"
                    >
                        Register
                    </motion.button>
                </div>
            </motion.div>

        </div>
    );
};

export default LandingPage;