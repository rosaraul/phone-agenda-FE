import React, {useState} from 'react';
import { motion } from 'framer-motion';
import {TextField, Snackbar} from '@mui/material';
import './Register.css';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert'
import {useNavigate} from 'react-router-dom'


const RegisterPage = () => {
    const [userDto, setUserDto] = useState({
        phoneNumber: "",
        name: "",
        password: ""
    });
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setUserDto((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const onRegisterHandler = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/users/add', userDto)
            .then((response) => {
                if (response.data) {
                    setSnackbarMessage('Registration successful!');
                    setSnackbarOpen(true);
                    console.log('registered');
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                } else {
                    setSnackbarMessage('Registration failed.');
                    setSnackbarOpen(true);
                }
            })
            .catch((error) => {
                console.error(error);
                setSnackbarMessage('Registration failed.');
                setSnackbarOpen(true);
            });
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    return (
        <>

            <div className="register-container">
                <div className="background"></div>
                <motion.div
                    className="content-box"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="welcome-text">Register</h1>
                    <form >
                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="phoneNumber"
                            onChange={onChangeHandler}
                        />
                        <TextField
                            label="Name"
                            type="name"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="name"
                            onChange={onChangeHandler}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="password"
                            onChange={onChangeHandler}
                        />
                        <button className="register-button" onClick={onRegisterHandler}>
                            Register
                        </button>
                    </form>
                </motion.div>
            </div>
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleSnackbarClose}
                    severity={snackbarMessage === 'Registration successful!' ? 'success' : 'error'}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </>
    );
};

export default RegisterPage;