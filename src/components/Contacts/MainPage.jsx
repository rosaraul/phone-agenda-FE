import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TextField, Button, List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import './MainPage.css';
import axios from "axios";
import AddContactsModal from "./AddContactsModal";
import EditContactsModal from "./EditContactsModal";

const MainPage = () => {
    const userId = localStorage.getItem('id');
    const [contacts, setContacts] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const handleEditContact = (id, name, phoneNumber) => {

        axios.put(`http://localhost:8080/contacts/update/${id}`, {
            name: name,
            phoneNumber: phoneNumber,
        })
            .then(response => {
                setContacts(prevContacts => prevContacts.map(contact =>
                    contact.id === id ? { ...contact, name, phoneNumber } : contact
                ));

            })
            .catch(error => {
                console.error(error);
            });
    };
    const handleAddContact = (name, phoneNumber) => {
        axios.post(`http://localhost:8080/contacts/addForUser/${userId}`, {
            name: name,
            phoneNumber: phoneNumber,
            userId: userId,
        })
            .then(response => {
                const newContact = response.data;
                setContacts(prevContacts => [...prevContacts, newContact]);
                setIsModalOpen(false);
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/contacts/user/${userId}`)
            .then(response => {
                setContacts(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [userId]);

    const compareByName = (a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    };
    const sortedContacts = contacts.slice().sort(compareByName);

    const handleSearch = () => {
        if (searchValue) {
            if (searchValue.match(/^\d+$/)) {
                axios.get(`http://localhost:8080/contacts/view_contacts/phone/${searchValue}`)
                    .then(response => {
                        setContacts([response.data]);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                axios.get(`http://localhost:8080/contacts/view_contacts/name/${searchValue}`)
                    .then(response => {
                        setContacts(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        } else {
            axios.get(`http://localhost:8080/contacts/user/${userId}`)
                .then(response => {
                    setContacts(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/contacts/delete/${id}`)
            .then(response => {
                setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
            })
            .catch(error => {
                console.error(error);
            });
    };


    return (

        <div className="main-container">
            <div className="background"></div>
            <motion.div
                className="main-page-content-box"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="page-title">Contacts</h1>
                <div className="search-bar">
                    <TextField
                        label="Search"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={searchValue}
                        style ={{width: '70%', marginLeft:"-9%"}}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleSearch} style={{ verticalAlign: 'middle', marginLeft: '10px', marginTop:'5%' }}>
                        Search
                    </Button>
                </div>
                <div className="add-button">
                    <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
                        +
                    </Button>
                    <span className="add-text">Add Contacts</span>
                    <AddContactsModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onAddContact={handleAddContact}
                    />

                </div>

                <div className="contact-list">
                    <List >
                        {sortedContacts.map((contact) => (
                            <ListItem key={contact.id} secondaryAction={<div>
                                <IconButton edge="end"
                                            aria-label="delete"
                                            style={{color: 'red'}}
                                            onClick={() => handleDelete(contact.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="edit" style={{color: 'green'}} onClick={() => {
                                    setSelectedContact(contact);
                                    setIsEditModalOpen(true);
                                }}>
                                    <ModeEditOutlineRoundedIcon />
                                </IconButton>
                            </div>}>

                                <ListItemAvatar>
                                    <Avatar><PersonIcon /></Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={contact.name} secondary={contact.phoneNumber} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </motion.div>

            <EditContactsModal

                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                contact={selectedContact}
                handleEditContact={handleEditContact}
            />
        </div>
    );
};

export default MainPage;
