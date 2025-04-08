import React from "react";
import axios from "axios";
import "../assets/css/ExportCSV.css"

const ExportCSVButton = ({ contacts }) => {
    const handleExport = () => {
        if (contacts.length === 0) {
            alert("No contacts available to export.");
            return;
        }

        const headers = ["ID", "FirstName", "LastName", "Email","Phone","Address"];

        const csvRows = [
            headers.join(","), 
            ...contacts.map((contact, index) =>
                [(index + 1), contact.firstName, contact.lastName, contact.email,contact.phone,contact.address].join(",") 
            )
        ];

        const csvContent = csvRows.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "contacts.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button className="export-btn" onClick={handleExport}>
            Export CSV
        </button>
    );
};
export default ExportCSVButton;
