import React, {useState} from 'react';
import { motion } from 'framer-motion';
import { TextField, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import './LoginPage.css';
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const LoginPage = () => {
    const [userDto, setUserDto] = useState({
        phoneNumber: '',
        password: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setUserDto((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const navigate = useNavigate();
    const onLoginHandler = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/login', userDto)
            .then((response) => {
                if (response.data) {
                    localStorage.setItem('phoneNumber', response.data.phoneNumber);
                    localStorage.setItem('id', response.data.id);
                    setSnackbarMessage('You have successfully logged in!');
                    setSnackbarOpen(true);
                    console.log('logged in');
                    setTimeout(() => {
                        navigate('/contacts');
                    }, 2000);
                } else {
                    setSnackbarMessage('Bad credentials!');
                    setSnackbarOpen(true);
                }
            })
            .catch((error) => {
                console.error(error);
                setSnackbarMessage('Bad credentials!');
                setSnackbarOpen(true);
            });
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <div className="login-container">
                <div className="background"></div>
                <motion.div
                    className="content-box"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="welcome-text">Login</h1>
                    <form className="login-form">
                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            margin="normal"
                            id="phoneNumber"
                            name="phoneNumber"
                            fullWidth
                            onChange={onChangeHandler}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            id="password"
                            name="password"
                            fullWidth
                            onChange={onChangeHandler}
                        />
                        <button className="login-button" onClick={onLoginHandler}>
                            Login
                        </button>
                    </form>
                </motion.div>
            </div>
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleSnackbarClose}
                    severity={snackbarMessage === 'You have successfully logged in!' ? 'success' : 'error'}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </>
    );
};

export default LoginPage;
