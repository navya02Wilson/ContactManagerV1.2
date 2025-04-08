import { useState } from "react";
import axios from "axios";
import axiosInstance from "./axiosInstance";
import "../assets/css/EditContact.css"; 

const EditContact = ({ contact, refreshContacts }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedContact, setUpdatedContact] = useState({ ...contact });

    // const token = sessionStorage.getItem("jwtToken");

    const handleChange = (e) => {
        setUpdatedContact({ ...updatedContact, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if(updatedContact.phone.length < 10){
            alert("Phone Number less than 10 digits")
            return
        }
        if (!emailRegex.test(updatedContact.email)) {
            alert("Please enter a valid email address");
            return;
        }

        try {
            await axiosInstance.put(`/contacts/edit-contact/${contact.id}`, updatedContact);
            refreshContacts();
            handleCloseModal();
        } catch (error) {
            console.error("Error updating contact:", error);
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setUpdatedContact({ ...contact }); 
    };

    return (
        <div className="edit-contact-container">
            <button className="edit-contact-button" onClick={handleOpenModal}>Edit</button>

            {isModalOpen && (
                <div className="edit-contact-modal-overlay">
                    <div className="edit-contact-modal">
                        <div className="edit-contact-header">
                            <h2>Edit Contact</h2>
                            <button className="edit-contact-close-button" onClick={handleCloseModal}>×</button>
                        </div>

                        <form onSubmit={handleSubmit} className="edit-contact-form">
                            <label>First Name:</label>
                            <input type="text" name="firstName" value={updatedContact.firstName} onChange={handleChange} required />

                            <label>Last Name:</label>
                            <input type="text" name="lastName" value={updatedContact.lastName} onChange={handleChange} required />

                            <label>Email:</label>
                            <input type="email" name="email" value={updatedContact.email} onChange={handleChange} required />

                            <label>Phone Number:</label>
                            <input type="text" name="phone" maxLength={10} value={updatedContact.phone} onChange={handleChange} required />

                            <label>Address:</label>
                            <input type="text" name="address" value={updatedContact.address} onChange={handleChange} required />

                            <div className="edit-contact-modal-buttons">
                                <button type="button" className="edit-contact-cancel-button" onClick={handleCloseModal}>Cancel</button>
                                <button type="submit" className="edit-contact-save-button">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditContact;
