import { useState } from "react";
import axios from "axios";
import "../assets/css/AddContact.css";
import axiosInstance from "./axiosInstance";

const AddContact = ({ refreshContacts }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contact, setContact] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
    });

    // const token = sessionStorage.getItem("jwtToken");

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleAddContact = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setContact({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = sessionStorage.getItem("userId");
        const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if(contact.phone.length <10){
            alert("Phone Number less than 10 digits")
            return
        }
        if (!emailRegex.test(contact.email)) {
            alert("Please enter a valid email address");
            return;
        }
        
        try {
            const newContact = { ...contact, userId };

            const response = await axiosInstance.post("/contacts/add-contact", newContact);
            if (response.status === 200) {
                refreshContacts();
                handleCloseModal();
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to add contact.");
        }
    };

    return (
        <div>
            <button className="add-contact-add-button" onClick={handleAddContact}>Add Contact</button>

            {isModalOpen && (
                <div className="add-contact-modal-overlay">
                    <div className="add-contact-form">
                        <div className="add-contact-header">
                            <h2>Add Contact</h2>
                            <button className="add-contact-close-button" onClick={handleCloseModal}>×</button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <label>First Name:</label>
                            <input type="text" className="add-contact-input" name="firstName" value={contact.firstName} onChange={handleChange} placeholder="First Name" required />

                            <label>Last Name:</label>
                            <input type="text" className="add-contact-input" name="lastName" value={contact.lastName} onChange={handleChange} placeholder="Last Name" required />

                            <label>Email:</label>
                            <input type="email" className="add-contact-input" name="email" value={contact.email} onChange={handleChange} placeholder="Email" required />

                            <label>Phone Number:</label>
                            <input type="text" className="add-contact-input" name="phone" maxLength={10} value={contact.phone} onChange={handleChange} placeholder="Phone Number" required />

                            <label>Address:</label>
                            <input type="text" className="add-contact-input" name="address" value={contact.address} onChange={handleChange} placeholder="Address" required />

                            <div className="add-contact-modal-buttons">
                                <button type="button" className="add-contact-button cancel" onClick={handleCloseModal}>Cancel</button>
                                <button type="submit" className="add-contact-button submit">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddContact;