import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const AddContactsModal = ({ isOpen, onClose, onAddContact }) => {
    const [newContactName, setNewContactName] = useState('');
    const [newContactPhoneNumber, setNewContactPhoneNumber] = useState('');

    const handleAddContact = () => {

        onAddContact(newContactName, newContactPhoneNumber);
        setNewContactName('');
        setNewContactPhoneNumber('');
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}>
                <Typography variant="h6" component="h2">
                    Add Contact
                </Typography>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    value={newContactPhoneNumber}
                    onChange={(e) => setNewContactPhoneNumber(e.target.value)}
                    margin="normal"
                />
                <Button onClick={handleAddContact} color="primary" margin="normal">
                    <CheckIcon /> Save
                </Button>
                <Button onClick={onClose} color="secondary">
                    <CloseIcon /> Cancel
                </Button>
            </Box>
        </Modal>
    );
};

export default AddContactsModal;
