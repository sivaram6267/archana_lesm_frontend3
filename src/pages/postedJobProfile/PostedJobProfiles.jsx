import React, { useEffect, useState } from "react";
import { Button, Modal, Col, Row, Form, FormGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ApiService from "../../services/ApiService";
import { FormInputs } from "../../components/formInputs/FormInputs";
import "./PostedJobProfile.css";
import JobProfiles from "../jobProfiles/JobProfiles";




const PostedJobProfiles = () => {
    const [data, setData] = useState("");
    const[status,setStatus]=useState(null)
    const[msg,setMsg]=useState(null)
    const location = useLocation();
    const [selectedCandidate, setSelectedCandidate] = useState(null);
 
console.log("posted job check");
    useEffect(() => {
     
      
       console.log(location.state.jobStringId);
    
        if (location.state.jobStringId) {
          setStatus(true);
          //console.log(props)
          console.log(data);
   ApiService.getPostedJobProfiles(location.state.jobStringId)
            .then((res) => {
              console.log(res.data); 
              setSelectedCandidate(res.data[0]);
              setData(res.data);
              console.log(data);
              setStatus(false);
              setMsg("");
            })
            .catch((err) => {
              console.log(err);
              setData("");
              setStatus(false);
              setMsg(err.message);
            });
          }
          
}, []);

  return (


<>
<div style={{display:"flex", flexWrap:"wrap", gap:"20px"}}>
        {<JobProfiles profiles={data}/>}
      </div>
      </>
    
  )}

export default PostedJobProfiles