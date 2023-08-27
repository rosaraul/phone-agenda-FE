import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const handleHome = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <AppBar position="fixed" style={{ background: 'transparent', boxShadow: 'none'}} >
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box display="flex" alignItems="center">
                    <Button edge="start" color="inherit" onClick={handleBack} style={{ fontSize: '20px'}}>
                        Back
                    </Button>
                </Box>
                <Box display="flex" alignItems="center">
                    <Typography variant="h3" style={{ textAlign: 'center', fontStyle: 'italic' }}>
                        Phone Agenda
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                    <Button edge="start" color="inherit" onClick={handleHome} style={{ fontSize: '20px'}}>
                        Home
                    </Button>
                </Box>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
