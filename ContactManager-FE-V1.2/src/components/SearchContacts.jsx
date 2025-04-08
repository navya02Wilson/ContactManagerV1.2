import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import axiosInstance from "./axiosInstance";


const SearchContacts = ({ userId, setFilteredContacts }) => {
  const [keyword, setKeyword] = useState("");
//    const userId = sessionstorage.getItem("userId");
    // const token = sessionStorage.getItem("jwtToken");

  const handleSearch = async () => {
    console.log("times");
    try {
      const response = await axiosInstance.get(
        `/contacts/search?userId=${userId}&keyword=${keyword}`
      );
      setFilteredContacts(response.data);
    } catch (error) {
      console.error("Error searching contacts:", error);
    }
  };

  //debounce logic
  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      handleSearch();
    }, 1000);
    return () => {
      clearTimeout(searchTimeout);
    };
  }, [keyword]);

  return (
    <div className="search-contacts">
      <input
        type="text"
        value={keyword}
        onChange={(event) => {
          setKeyword(event.target.value);
        }}
        placeholder="Search by name or phone number"
        style={{
          padding: "8px",
          width: "100%",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
      />
    </div>
  );
};

export default SearchContacts;
