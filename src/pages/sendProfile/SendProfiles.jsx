import React, { useState } from 'react'
import {  Form ,Button} from "react-bootstrap";
import { FormInputs } from "../../components/formInputs/FormInputs";
import ApiService from "../../services/ApiService";
import "./SendProfiles.css";
import { useLocation } from "react-router-dom";
const SendProfiles = () => {
    const[file,setFile]=useState("")
    const[status,setStatus]=useState(false)
    const [jobdata, setJobdata] = useState(null);
    const location = useLocation();

    const handleChange = (e) => {
        const { name, value } = e.target;
     setJobdata({ ...jobdata, [name]: value });
         
      };


      const handleSubmit = (e) => {
        e.preventDefault();
        setStatus(true);
const dataString = encodeURIComponent(JSON.stringify(jobdata));
     
    
        ApiService.sendProfiles(location.state.jobStringId,dataString,  file);

        setStatus(false);
      };


  return (
    <div id="add-employee" className="container-sm ">
        <h1 className="title text-center">Send Profiles</h1>
     <Form >
        <div className="mb-3">
          <label htmlFor="candidateName">Candidate Name:</label>
          <input
            className="form-control"
            placeholder="Enter candidate name"
            type=""
            name="candidateName"
            onChange={handleChange}
          />
        
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email Id:</label>
          <input
            className="form-control"
            placeholder="Enter EmailId"
            type=""
            name="emailId"
            onChange={handleChange}
          />
        
        </div>
        <div className="mb-3">
          <label htmlFor="mobile No:">
          Mobile No:
           
            </label>
            <input
            className="form-control"
            placeholder="Enter mobile No:"
            type=""
            name="mobileNo"
            onChange={handleChange}
          />
            </div>
        <div className="mb-3">
          <label htmlFor="Current CTC:">Current CTC:</label>
          <input
            className="form-control"
            placeholder="Enter current CTC"
            type=""
            name="currentCTC"
            onChange={handleChange}
          />
        
        </div>
        <div className="mb-3">
            <label htmlFor="Expected CTC:">Expected CTC:</label>
            <input
            className="form-control"
            placeholder="Enter expected CTC"
            type=""
            name="expectedCTC"
            onChange={handleChange}
          />
           
          </div>
          <div className="mb-3">
            <label htmlFor="lastName">Relevant Exp:</label>
            <input
            className="form-control"
            placeholder="Enter Relevant EXP"
            type=""
            name="relevantExp"
            onChange={handleChange}
          />
         </div>
  
       
      
        <div className="mb-3">
          <label htmlFor="totalExp">
            Total Exp:
           </label>
           <input
            className="form-control"
            placeholder="Enter totalExp"
            type=""
            name="totalExp"
            onChange={handleChange}
          />
             </div>
        <div className="mb-3">
          <label htmlFor="currentOrg">
         Current Org:
            </label>
            <input
            className="form-control"
            placeholder="Enter currentOrg"
            type=""
            name="currentOrg"
            onChange={handleChange}
          />
         </div>
        <FormInputs
          id="pdfFile"
          title="Sample Resume"
          name="resume"
          type="file"
          // required={true}
          accept=".pdf"
          defaultValue={file}
          handleChange={(e) => {
           setFile(e.target.files[0]);
          }}
        />
        <Button variant="primary" type="submit" onClick={handleSubmit} >
          send Profiles
        </Button>{" "}
      </Form>

    </div>
  )
}

export default SendProfiles