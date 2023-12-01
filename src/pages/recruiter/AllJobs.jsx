// import React, { useEffect } from "react";
 
import React, { useEffect, useState } from "react";
 
import ApiService from "../../services/ApiService";
 
import ring from "../../images/ring.png";
import { Button, Form } from "react-bootstrap";
 
import Jobs from "../jobNotifications/Jobs";
import bgImage from "../../images/Rectangle 62.png"
import "./AllJobs.css"
import Filter from "./Filter";
import JobRoleFilter from "./JobRoleFilter";
import HireTypeFilter from "./HireTypeFilter";
import JobsPost from "./JobsPost";
 
function AllJobs() {
  const[data,setData]=useState({})
  ;
    
    const[msg,setMsg]=useState(null)
  const [selectedFilters, setSelectedFilters] = useState({});
  const[jobStrings, setJobStrings]=useState([]);
  function handleToggle(e) {
   
    const { name, value } = e.target

    console.log(name,value);
    
    ApiService.getPostedJobs(value) //get all employeess for selected designation
    .then((res) => {
       console.log(res.data);
      setData(res.data)
    })

    .catch((error) => {
      alert(JSON.stringify(error));
      setMsg(
        error.response.data.errorMessage
          ? error.response.data.errorMessage
          : error.message
      );
    });
 
  }
  const handleFilterChange = (selectedOptions) => {
   // Merge the selected options with the existing state
   const newFilters = { ...selectedFilters, ...selectedOptions };
   setSelectedFilters(newFilters);
 
   // Assuming ApiService has a method for fetching data based on filters
   ApiService.PostedJobsFilter(newFilters)
     .then((response) => {
       // Handle the response from the API call
     
       setJobStrings(response.data);
     
     })
     .catch((error) => {
       // Handle errors
       console.error("API Error:", error);
     });
  };

  // useEffect(()=>{
  //   ApiService.getPostedJobs(true) //get all employeess for selected designation
  //   .then((res) => {
  //     // console.log(res.data);
  //     setData(res.data)
  //   })

  //   .catch((error) => {
  //     alert(JSON.stringify(error));
  //     setMsg(
  //       error.response.data.errorMessage
  //         ? error.response.data.errorMessage
  //         : error.message
  //     );
  //   });
  // },[])
 

 
  return (
 
    <div>
      <div className="imgNav">
        <img src={bgImage} style={{ width: '100%' }} alt="Background" />
        <h5 >Jobs</h5>
        <div className="radio-labels">
          <label>
          <input
className="radio-input"
  type="radio"
  name="status"
  onChange={handleToggle}
  value="true"

/>
            <h6>Open Jobs</h6>
          </label>
          <label>
         <input
className="radio-input"
  type="radio"
  name="status"
  onChange={handleToggle}
  value="false"

/> <h6>Closed Jobs</h6>
          </label>
        </div>
      </div>
 
      <div className="grid-container">
        <div className="jobsFilter">
          <div className="filter">
            <div className="fRow1">
              <h6>Filter</h6>
              <h6>Clear All</h6>
            </div>
            <div className="divider"></div>
 
            <div className="fRow2">
              <label>Date Post</label>
              <Filter onFilterChange={handleFilterChange} className="dataPostFilter"></Filter>
            </div>
            <div className="divider"></div>
 
            <div className="fRow3">
              <label>Client </label>
              <JobRoleFilter onFilterChange={handleFilterChange}></JobRoleFilter>
            </div>
            <div className="divider"></div>
            <div className="fRow4">
              <label>Hire type</label>
              <HireTypeFilter onFilterChange={handleFilterChange}></HireTypeFilter>
            </div>
          </div>
        </div>
 
        <div className="jobPost">
 
          <div className="jobsPostCard-scroll-container">
          <JobsPost jobStrings={jobStrings} />
           
           
 
          </div>
 
 
        </div>
 
      </div>
 
 
    </div>
 
 
 
 
  )
}
 
export default AllJobs;