import React, { useEffect, useState } from "react";
import axios from "axios";
import EditContact from "./EditContact";
import DeleteContact from "./DeleteContact";
import SearchContacts from "./SearchContacts";
import "../assets/css/TableDisplay.css";
import AddContact from "./AddContact";
import ExportCSVButton from "./ExportCSV";
import ImportCSV from "./ImportCSV";
import Logout from "./Logout";

const ContactTable = () => {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);

    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("jwtToken");

    const fetchContacts = async () => {
        console.log("123")
        if (!userId) {
            alert("User not logged in!");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/api/contacts/${userId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            setContacts(response.data);
            setFilteredContacts(response.data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);
    

    return (
        <div className="contact-table-container">
            <h2>Contacts</h2>

            
            <div className="contact-table-buttons">
                <AddContact refreshContacts={fetchContacts} />
                <ImportCSV refreshContacts={fetchContacts} userId={userId} />
                <ExportCSVButton contacts={contacts} />
            </div>

            <SearchContacts userId={userId} setFilteredContacts={setFilteredContacts} />

            <table className="contact-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Mobile Number</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredContacts.map((contact, index) => (
                        <tr key={contact.id}>
                            <td>{index + 1}</td>
                            <td>{contact.firstName}</td>
                            <td>{contact.lastName}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phone}</td>
                            <td>{contact.address}</td>
                            <td className="contact-table-actions">
                                <EditContact contact={contact} refreshContacts={fetchContacts} />
                                <DeleteContact contactId={contact.id} refreshContacts={fetchContacts} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Logout />
        </div>
    );
};

export default ContactTable;

