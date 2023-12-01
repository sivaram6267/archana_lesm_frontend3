import React, { useEffect, useState } from "react";
import "./JobRoleFilter.css";
import ApiService from "../../services/ApiService";
 
function JobRoleFilter({ onFilterChange }) {
  const [optionsList, setOptionsList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClientName, setSelectedClientName] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState(null);
 
  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };
 
  const handleOptionClick = (event, option) => {
    setSelectedClientName(option.clientName);
    setSelectedClientId(option.clientId); // Set the selected client ID
    setIsOpen(false); // Close the dropdown
    onFilterChange({clientId:option.clientId}); // Send the selected client ID to the parent component
 
  };
 
  useEffect(() => {
    ApiService.getAllClients().then((resp) => {
      const clientsArray = resp.data.map((client) => ({
        clientId: client.clientsId,
        clientName: client.clientsNames,
      }));
      setOptionsList(clientsArray);
    });
  }, []);
 
  return (
    <div className={`Job-select-menu ${isOpen ? "active" : ""}`}>
      <div className="Job-select-btn" onClick={toggleOptions}>
        {selectedClientName ? (
          <span className="Job-sBtn-text">{selectedClientName}</span>
        ) : (
          <span className="Job-option-text">Select Client</span>
        )}
        <i className="bx bx-chevron-down"></i>
      </div>
 
      <ul className="Job-options">
        <div className="Job-options-scroll">
          {optionsList.map((option) => (
            <li key={option.clientId} className="Job-option" onClick={(event) => handleOptionClick(event, option)}>
              <span className="Job-option-text">{option.clientName}</span>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}
 
export default JobRoleFilter;