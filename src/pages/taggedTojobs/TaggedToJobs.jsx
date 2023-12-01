import React from 'react'
import { Button, Form } from "react-bootstrap"
import Table from 'react-bootstrap/Table';
import "./TaggedToJobs.css";
import { useNavigate } from "react-router-dom";
const TaggedToJobs = (props) => {
  const navigate = useNavigate();
  const handleProfile= (id) => {
    console.log(id);
    navigate("/hr/sendProfile", { state: { jobStringId: id } });
  };
  const handleViewProfile= (id) => {
    console.log(id);
    navigate("/hr/getViewProfile", { state: { jobStringId: id } });
  };
  
  return (
    <>
   
    <div>
     
         
      <div class="card-deck">
      <div class="card">
      
        <div class="card-body">
          <h6 class="card-title">TaggedJobs</h6>
          <ul class="list-group">
            <li class="list-group-item list-group-item-success"><b>Job Description</b> :{props?.data?.jd}</li>
            <li class="list-group-item list-group-item-success"><b> Total Position</b>:{props?.data?.totalPosition}</li>
            <li class="list-group-item list-group-item-success">  <b> String Created By</b>:{props?.data?.stringCreatedBy}</li>
            <li class="list-group-item list-group-item-success"> <b>Budget</b> :{props?.data?.budget}</li>
            <li class="list-group-item list-group-item-success"> <b>Open Date</b>:{props?.data?.openDate}</li>
            <li class="list-group-item list-group-item-success"> <b>Close Date</b>:{props?.data?.closeDate}</li>
            <li class="list-group-item list-group-item-success"> <b>Created At</b>:{props?.data?.createdAt}</li>

            <li class="list-group-item list-group-item-success"> <b>Client Name</b>:{props?.data?.clientName}</li>
            <li class="list-group-item list-group-item-success"><i class="fa fa-ticket" aria-hidden="true"></i><b>JobString Ticket</b>:{props?.data?.jobStringTicket}</li>
            <div className="sampleresume"><b>Sample Resume:</b></div>
<button className="resume-btn">
  <a
     className="resume-btn"
     href={props?.data?.sampleResume}
   >
    DownloadResume
  </a>
</button>
<br/>
<div className="view-buttons">

        <Button className="btn-signup px-2" 
        type="submit"
        onClick={(e) => {
          e.stopPropagation();
          handleProfile(props?.data?.jobStringId);
          //console.log("emp1");
        }}
        >
              Create Profile
       
        </Button>{" "}
        <Button className="px-2" type="submit"

         onClick={(e) => {
  e.stopPropagation();
  handleViewProfile(props?.data?.jobStringId);
  //console.log("emp1");
}}
>
    ViewProfile
          
        </Button>
         </div>
<label htmlFor="TaggedEmployees">
          <b>Tagged Employees:</b>
           <nobr />
           <span className="text-danger"> *</span>
         </label>
              
               <Table responsive>
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>LancesoftId</th>
         </tr>
      </thead>
      <tbody>
      {props?.data?.taggedEmployees?.map((type,index) => (
              <tr data-index={index}>
               
                <td><p>{type.employeeName}</p></td>
                <td><p>{type.lancesoftId}</p></td>
               
              </tr>
            ))}
    
      </tbody>
    
    </Table>
          </ul>
        


          
        </div>
      
      </div>
    </div>
    </div>
    </>
  )
}

export default TaggedToJobs