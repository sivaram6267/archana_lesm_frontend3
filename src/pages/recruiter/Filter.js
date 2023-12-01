import { useEffect, useState } from "react";
import "./filter.css";
import ApiService from "../../services/ApiService";
 
function Filter({ onFilterChange }) {
  const optionsList = ["Today", "Last 7 Days", "Last 14 Days", "Last 30 Days"];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select Date");
  const [selectedDate, setSelectedDate] = useState(null);
 
  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };
 
  const handleOptionClick = (option) => {
    setSelectedOption(option);
 
    // Calculate the selected date based on the option
    const currentDate = new Date();
 
    switch (option) {
      case "Today":
        onFilterChange({date:currentDate.toISOString().split('T')[0]});
        break;
      case "Last 7 Days":
        currentDate.setDate(currentDate.getDate() -1); // 7 days ago
        onFilterChange({date:currentDate.toISOString().split('T')[0]});
     
        break;
      case "Last 14 Days":
        currentDate.setDate(currentDate.getDate() - 10); // 14 days ago
        onFilterChange({date:currentDate.toISOString().split('T')[0]});
        break;
      case "Last 30 Days":
        currentDate.setDate(currentDate.getDate() - 20); // 30 days ago
        onFilterChange({date:currentDate.toISOString().split('T')[0]});
        break;
      default:
        setSelectedDate(null);
    }
 
    setIsOpen(false);
    // Invoke the callback with the selected date
   
 
  };
 
  return (
    <div className={`select-menu ${isOpen ? "active" : ""}`}>
      <div className="select-btn" onClick={toggleOptions}>
        <span className="sBtn-text">{selectedOption}</span>
        <i className="bx bx-chevron-down"></i>
      </div>
 
      <ul className="options">
        {optionsList.map((option, index) => (
          <li key={index} className="option" onClick={() => handleOptionClick(option)}>
            <span className="option-text">{option}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
 
export default Filter;