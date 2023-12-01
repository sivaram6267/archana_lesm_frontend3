import React, { useState ,useEffect} from 'react'
import { Col, Row, Form,Button } from "react-bootstrap"

import ApiService from "../../services/ApiService";
import { useLocation } from "react-router-dom";
import moment from "moment";

import "./UpdateInterviewStatus.css";
const UpdateInterviewStatus = () => {
    const[msg,setMsg]=useState(null)
    const[data,setData]=useState({})
    const[status,setStatus]=useState(false)

    const [idate, setIdate] = useState("");
    const [idate1, setIdate1] = useState("");
    const [idate2, setIdate2] = useState("");
    const [idate3, setIdate3] = useState("");

  

    const formattedDate = moment(idate).format("YYYY-MM-DDTHH:mm:ss")
    
     
      const formattedDate1 = moment(idate1).format("YYYY-MM-DDTHH:mm:ss")
      const formattedDate2 = moment(idate2).format("YYYY-MM-DDTHH:mm:ss") 
   
      const formattedDate3 = moment(idate3).format("YYYY-MM-DDTHH:mm:ss") 
    const handleChange = (e) => {
       
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        console.log(e.target.name, e.target.value);
        if(e.target.name == "l1ScheduleAt")
          setIdate(e.target.value);
          
        else if(e.target.name=="l1PostponedAt")
          setIdate1(e.target.value);
        else if(e.target.name == "l2ScheduleAt")
          setIdate2(e.target.value)
        else if(e.target.name == "l2PostponedAt")
          setIdate3(e.target.value)

        console.log(data);
     
      };
  
      const location = useLocation();

      const handleSubmit = (e) => {
        e.preventDefault();
        setStatus(true);
        // const updatedItems = data.filter(data => data.id !== "recId");
        delete data.recId;
        delete data.jobStringId;
       delete data.statusId;
       delete data.recruiterName;
        // setErrors(false);
        ApiService.interviewStatus(data)
          .then((res) => {
            console.log(res.data); 
            setStatus(false);
            setMsg("");
          })
          .catch((error) => {
            console.log(error);
            setStatus(true);
          
            setMsg(
              error.response.data.errorMessage
                ? error.response.data.errorMessage
                : error.message
            );
          });
      };

   
      useEffect(() => {
     
        console.log(location.state.candidateId);
        console.log(idate.slice(0,19));
    //  if (location.state.candidateId) {
           setStatus(false);
         
    ApiService.scheduleStatus(location.state.candidateId)
             .then((res) => {
               console.log(res.data); 
               setData(res.data);

           

               setIdate(res.data?.l1ScheduleAt);
               setIdate2(res.data?.l2ScheduleAt)
            
               setIdate1(res.data?.l1PostponedAt)
            
              setIdate3(res.data?.l2PostponedAt)
        
              setStatus(true);
               setMsg("");
             })
             .catch((err) => {
               console.log(err);
               setData("");
               setStatus(false);
               setMsg(err.message);
             });
           
           
 }, [location.state.candidateId]);




  return (

        <div id="add-employee" className="container-sm">
         <Form>
         <Row xs="auto">
              <Col>
                <div id="modelSection">
                <div className="mb-3">
          <label htmlFor="condiProfileId">
          Candidate Profile Id:
            </label>
            <input
            className="form-control"
            placeholder="Enter condiProfileId"
            type=""
            name="condiProfileId"
            defaultValue={data.condiProfileId}
            onChange={handleChange}
          />
         </div>
         <div className="mb-3">
          <label htmlFor="candiName">
          Candidate Name:
            </label>
            <input
            className="form-control"
            placeholder="Enter candiName"
            type=""
            name="candiName"
            defaultValue={data.candiName}
            onChange={handleChange}
          />
         </div>
        
         <div className="mb-3">
          <label htmlFor="l1ScheduleAt">
          L1 ScheduleAt:
            </label>
            <br/>
            <input type="datetime-local" 
            id="date-input" 
            name="l1ScheduleAt"
            value={formattedDate}
            onChange={handleChange} />
            </div>
            <div className="mb-3">
          <label htmlFor="l1PostponedAt">
          L1 PostPoned:
            </label>
            <br/>
            <input type="datetime-local" 
            name="l1PostponedAt"
            id="date-input2" 
            value={formattedDate1}
            onChange={handleChange} />
          

            {/* <input type="datetime-local" 
            id="date-input" 
            value={idate.slice(0,16)} 
            // defaultValue= {getdatetime (data?.l1ScheduleAt)}
            onChange={handleChange} /> */}
            {/* <DateTimePicker
                  value={values}
            className="form-control"
            placeholder="Enter l1PostponedAt"
            type=""
            name="l1PostponedAt"
            defaultValue= {getdatetime (data?.l1PostponedAt)}
            onChange={handleChange}
          /> */}
         </div>
         <div className="mb-3">
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="l1Status">
          L1 Status
        
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="l1Status"
            aria-label="l1Status"
            className="selectInput"
            name="l1Status"
            defaultValue= "APPROVE"
            onChange={handleChange}
          >
            <option value="">select</option>
            <option value="APPROVE">APPROVE</option>
            <option value="REJECT">REJECT</option>
        </Form.Select>
        </Form.Group>
        </div>
      
        <div className="mb-3">
          <label htmlFor="l2ScheduleAt">
          L2 ScheduleAt:
            </label>
            <br/>
            <input type="datetime-local" 
            id="date-input"
            name="l2ScheduleAt" 
            value={formattedDate2}
            onChange={handleChange} />
        
         </div>
         <div className="mb-3">
          <label htmlFor="l2PostponedAt">
          L2 PostPoned:
            </label>
            <br/>
            <input type="datetime-local" 
            id="date-input" 
            name="l2PostponedAt"
            value={formattedDate3}
            onChange={handleChange} />
        
        
           
         </div>
        <div className="mb-3">
         <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="l2Status">
          L2 Status:
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="l2Status"
            aria-label="l2Status"
            className="selectInput"
            name="l2Status"
            onChange={handleChange}
            defaultValue= "APPROVE"
          >
            <option value="">select</option>
            <option value="APPROVE">APPROVE</option>
            <option value="REJECT">REJECT</option>
  
          </Form.Select>
        </Form.Group>
         </div>
          </div>
      </Col>
      <Col>
<div id="modelSection">
<div className="mb-3">
         <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="releasedOffer">
          ReleasedOffer
            <nobr />
            
          </Form.Label>
          <Form.Select
            required
            id="releasedOffer"
            aria-label="releasedOffer"
            className="selectInput"
            name="releasedOffer"
            onChange={handleChange}
       
          >
             <option value=""   >select</option>
            <option value={true} selected={data.releasedOffer == true}>YES</option>
            <option value={false} selected={data.releasedOffer == false}>NO</option>
  
          </Form.Select>
        </Form.Group>
         </div>


      {/* <div className="mb-3">
          <label htmlFor="releasedOffer">ReleasedOffer:</label>
          <input
            className="form-control"
            placeholder="Enter releasedOffer"
            type=""
            name="releasedOffer"
            defaultValue="YES"
            
            onChange={handleSelect}
          />
        
        </div> */}
        
<div className="mb-3">
          <label htmlFor="releasedOfferAt:">Released Offer At:</label>
          <input
            className="form-control"
            placeholder="Enter ReleasedOfferAt"
            type="date"
            name="releasedOfferAt"
            defaultValue={data.releasedOfferAt}
            onChange={handleChange}
          />
        
        </div>
        <div className="mb-3">
         <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="joined">
          Joined
            <nobr />
            
          </Form.Label>
          <Form.Select
            required
            id="joined"
            aria-label="joined"
            className="selectInput"
            name="joined"
            onChange={handleChange}
           
            
          >
                <option value=""   >select</option>
            <option value={true} selected={data.releasedOffer == true}>YES</option>
            <option value={false} selected={data.releasedOffer == false}>NO</option>

          </Form.Select>
        </Form.Group>
         </div>

{/*

<div className="mb-3">
            <label htmlFor="joined:">Joined:</label>
            <input
            className="form-control"
            placeholder="Enter joined "
            type=""
            name="joined"
            defaultValue={data.joined}
            onChange={handleChange}
          />
             <option value="">select</option>
            <option value="APPROVE">YES</option>
            <option value="REJECT">NO</option>
          </div>
        */}
        
         </div>
         </Col>
         </Row>
         <Button className="btn-signup px-2" 
        type="submit"
        onClick={handleSubmit}
        
      >
       Save
        </Button>{" "}
<div className="status-profile">
{status && (
          <p className="text-success mb-2">
            Please wait while we are processing your request.
          </p>
        )}
        {<p className="text-black mb-2"> update status  successfully</p>}
        {/* {status && (
          <p className="text-succes mb-2">
            update status  successfully
          </p>
        )} */}
        </div>
   
      </Form>
      <br/>


      </div>
   
  )
}

export default UpdateInterviewStatus