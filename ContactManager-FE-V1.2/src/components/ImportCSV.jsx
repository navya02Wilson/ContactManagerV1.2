import React, { useState } from "react";
import axios from "axios";


const ImportCSV = ({ refreshContacts, userId }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const token = sessionStorage.getItem("jwtToken");

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("userId", userId); 

        try {
            const response = await axiosInstance.post("/contacts/import-csv", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });

            alert(response.data); 
            refreshContacts(); 
        } catch (error) {
            console.error("Error importing CSV:", error);
            alert("Failed to import contacts.");
        }
    };

    return (
        <div className="import-container">
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button className="import-btn" onClick={handleUpload}>Import CSV</button>
        </div>
    );
};

export default ImportCSV;
