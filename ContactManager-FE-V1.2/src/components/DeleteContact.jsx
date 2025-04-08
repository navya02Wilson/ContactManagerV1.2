import { useState } from "react";
import axiosInstance from "./axiosInstance";
import "../assets/css/DeleteContact.css";

const DeleteContact=({ contactId, refreshContacts })=>{
  const [isModalOpen, setIsModalOpen] = useState(false);
//   const token = sessionStorage.getItem("jwtToken");

  const handleDelete = async () => {
      try {
          await axiosInstance.delete(`/contacts/delete-contact/${contactId}`);
          refreshContacts();
          handleCloseModal();
      } catch (error) {
          console.error("Error deleting contact:", error);
      }
  };

  const handleOpenModal = () => {
      setIsModalOpen(true);
  };

  const handleCloseModal = () => {
      setIsModalOpen(false);
  };

  return (
      <div className="delete-contact-container">
          <button className="delete-contact-button" onClick={handleOpenModal}>Delete</button>

          {isModalOpen && (
              <div className="delete-contact-modal-overlay">
                  <div className="delete-contact-modal">
                      <div className="delete-contact-header">
                          <h2>Confirm Deletion</h2>
                      </div>

                      <div className="delete-contact-body">
                          <p>Are you sure you want to delete your contact? <br /> This action cannot be undone.</p>
                          <div className="delete-contact-modal-buttons">
                              <button className="delete-contact-cancel-button" onClick={handleCloseModal}>Cancel</button>
                              <button className="delete-contact-confirm-button" onClick={handleDelete}>Delete</button>
                          </div>
                      </div>
                  </div>
              </div>
          )}
      </div>
  );
};

export default DeleteContact