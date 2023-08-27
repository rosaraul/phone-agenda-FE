import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const EditContactsModal = ({ isOpen, onClose, contact, handleEditContact }) => {
    const [editedName, setEditedName] = useState(contact?.name || '');
    const [editedPhoneNumber, setEditedPhoneNumber] = useState(contact?.phoneNumber || '');

    useEffect(() => {
        setEditedName(contact?.name || '');
        setEditedPhoneNumber(contact?.phoneNumber || '');
    }, [contact]);

    const handleEdit = () => {
        const newName = editedName || contact.name;
        const newPhoneNumber = editedPhoneNumber || contact.phoneNumber;

        if (newName && newPhoneNumber) {
            handleEditContact(contact.id, newName, newPhoneNumber);
            onClose();
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                width: 400 }}>
                <Typography variant="h6" component="h2" id="modal-title">
                    Edit Contact
                </Typography>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    value={editedPhoneNumber}
                    onChange={(e) => setEditedPhoneNumber(e.target.value)}
                    margin="normal"
                />
                <Button onClick={handleEdit} color="primary" margin="normal">
                    <CheckIcon /> Save
                </Button>
                <Button onClick={onClose} color="secondary">
                    <CloseIcon /> Cancel
                </Button>
            </Box>
        </Modal>
    );
};

export default EditContactsModal;
