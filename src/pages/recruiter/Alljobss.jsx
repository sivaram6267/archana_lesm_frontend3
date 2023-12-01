// import React, { useEffect } from "react";

import React, { useEffect, useState } from "react";

import { FormInputs } from "../../components/formInputs/FormInputs";
import ApiService from "../../services/ApiService";



import "./Recruiter.css";
import Jobs from "../jobNotifications/Jobs";
function AllJobs() {
  const[data,setData]=useState({})
;
  
  const[msg,setMsg]=useState(null)

  function handleToggle(e) {
   
    const { name, value } = e.target

    console.log(name,value);
    ApiService.getPostedJobs(value) //get all employeess for selected designation
    .then((res) => {
      // console.log(res.data);
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
    
    

  <nav className="Navitems"><h1>Posted Jobs</h1>
  
  </nav>
 <div  className="radio-btn">
  <input
  className="radio-input"
  type="radio"
  name="status"
  onChange={handleToggle}
  defaultChecked="true"
  value="true"

/> OpenJobs
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<input
className="radio-input"
  type="radio"
  name="status"
  onChange={handleToggle}
  value="false"

/> ClosedJobs
</div>
 
 
  
 
<div style={{display:"flex", flexWrap:"wrap", gap:"20px"}}>
        {data?.length>0 && data.map(it=> <Jobs data={it}/>)}
      </div>
      </div>
   
  );
}

export default AllJobs;

