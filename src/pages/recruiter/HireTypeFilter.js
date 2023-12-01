import React from "react";
import { useState } from "react";
import "./HireTypeFilter.css"
import { useEffect } from "react";
import ApiService from "../../services/ApiService";
function HireTypeFilter({onFilterChange}){
    const [optionsList,setOptionsList]=useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [selectedHireTypeName, setSelectedHireTypeName] = useState(null);
    const[selectedHireTypeId, setSelectedHireTypeId]=useState(null);
 
    const toggleOptions = () => {
      setIsOpen(!isOpen);
    };
 
    const handleOptionClick = (event,option) => {
      setSelectedHireTypeName(option.typeName);
      setSelectedHireTypeId(option.empTypeId);
      setIsOpen(false);
      onFilterChange({hiringType:option.empTypeId});
   
   
    };
  useEffect(()=>{
    ApiService.HiringType().then((resp) => {
      const hireTypeArray = resp.data.map((hireType) => ({
        empTypeId: hireType.empTypeId,
        typeName: hireType.typeName,
      }));
      setOptionsList(hireTypeArray);
 
  });
  },[])
    return(
        <div className={`hireType-select-menu ${isOpen ? "active" : ""}`}>
        <div className="hireType-select-btn" onClick={toggleOptions}>
          {selectedHireTypeName?(<span className="hireType-sBtn-text">{selectedHireTypeName}</span>):(<span className="hireType-option-text">Select HireType</span>)}
          <i className="bx bx-chevron-down"></i>
        </div>
 
        <ul className="hireType-options">
          <div className="hireType-options-scroll">
          {optionsList.map((option) => (
            <li key={option.empTypeId} className="hireType-option" onClick={(event) => handleOptionClick(event,option)}>
              <span className="hireType-option-text">{option.typeName}</span>
            </li>
          ))}
          </div>
        </ul>
      </div>
    );
}
export default HireTypeFilter;