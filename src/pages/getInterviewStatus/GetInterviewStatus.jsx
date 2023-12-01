import React, { useState ,useEffect} from 'react'
import { Button, Modal, Col, Row, Form, FormGroup } from "react-bootstrap"
import { FormInputs } from "../../components/formInputs/FormInputs";
import ApiService from "../../services/ApiService";
import { useLocation } from "react-router-dom";
import "./GetInterviewStatus.css";
import { useNavigate } from "react-router-dom";
const GetInterviewStatus = () => {
    const[msg,setMsg]=useState(null)
    const[data,setData]=useState({})
    const[status,setStatus]=useState(false)


    // function getdatetime(datestr) {
    //     if(datestr != null)
    //     {
    //             let date=datestr.substring(0,10);
    //               let time=datestr.substring(12,16)
    //               console.log(date);
    //               console.log(time);
    //               return date+time
    //     }
                  
        
    //   }

    const navigate = useNavigate();
    const handleViewProfile= (id) => {
        console.log(id);
        navigate("/updateInterviewProfile", { state: { candidateId: id } });
      };

    const location = useLocation();

    const handleChange = (e) => {
        const { name, value } = e.target;
     setData({ ...data, [name]: value });
     console.log(data);
         
      };
  

    useEffect(() => {
     
        console.log(location.state.candidateId);
    //  if (location.state.candidateId) {
           setStatus(true);
         
    ApiService.scheduleStatus(location.state.candidateId)
             .then((res) => {
            //    console.log(res.data); 
               setData(res.data);
               console.log(data);
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
    <div id="add-employee"  className="container-sm">
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
                    <input
                    className="form-control"
                    placeholder="Enter l1ScheduleAt"
                    type=""
                    name="l1ScheduleAt"
                    // defaultValue= {getdatetime (data?.l1ScheduleAt)}
                    defaultValue= {data?.l1ScheduleAt?.replace('T', ' ')}
                    onChange={handleChange}
                  />
                </div>
                  <div className="mb-3">
                    <label htmlFor="l1PostponedAt">
                    L1 Postponed:
                      </label>
                      <input
                      className="form-control"
                      placeholder="Enter l1PostponedAt"
                      type=""
                      name="l1PostponedAt"
                      // defaultValue= {getdatetime (data?.l1PostponedAt)}
                      defaultValue= {data?.l1PostponedAt?.replace('T', ' ')}
                      onChange={handleChange}
                    />
                  </div>
                              
                    <div className="mb-3">
                      <label htmlFor="l1Status">
                      L1 Status:
                        </label>
                        <input
                        className="form-control"
                        placeholder="Enter l1Status"
                        type=""
                        name="l1Status"
                        // defaultValue= {getdatetime (data?.l2PostponedAt)}
                        defaultValue={data?.l1Status}
                        onChange={handleChange}
                      />
                    </div>

                      <div className="mb-3">
                        <label htmlFor="l2ScheduleAt">
                        L2 ScheduleAt:
                          </label>
                          <input
                          className="form-control"
                          placeholder="Enter l2ScheduleAt"
                          type=""
                          name="l2ScheduleAt"
                          // defaultValue= {getdatetime (data?.l2ScheduleAt)}
                          defaultValue={data?.l2ScheduleAt?.replace('T', ' ')}
                          onChange={handleChange}
                        />
                      </div>
                        <div className="mb-3">
                          <label htmlFor="l2PostponedAt">
                          L2 PostPoned:
                            </label>
                            <input
                            className="form-control"
                            placeholder="Enter l2PostponedAt"
                            type=""
                            name="l2PostponedAt"
                            // defaultValue= {getdatetime (data?.l2PostponedAt)}
                            defaultValue={data?.l2PostponedAt?.replace('T', ' ')}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="l2Status">
                          L2 Status:
                            </label>
                            <input
                            className="form-control"
                            placeholder="Enter l2Status"
                            type=""
                            name="l2Status"
                            // defaultValue= {getdatetime (data?.l2PostponedAt)}
                            defaultValue={data?.l2Status}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      </Col>
                      <Col>
                      <div id="modelSection">
                      <div className="mb-3">
                          <label htmlFor="releasedOffer">ReleasedOffer:</label>
                          <input
                            className="form-control"
                            placeholder="Enter releasedOffer"
                            type=""
                            name="releasedOffer"
                            defaultValue={data.releasedOffer}
                            onChange={handleChange}
                          />
                          
                        </div>
                        
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
                            <label htmlFor="joined:">Joined:</label>
                            <input
                            className="form-control"
                            placeholder="Enter joined "
                            type=""
                            name="joined"
                            defaultValue={data.joined}
                            onChange={handleChange}
                          />
                          
                          </div>
                      
                        
  
                        
                        </div>
                        </Col>
                        </Row>
                        </Form>
                    <Button className="btn-signup px-2" 
                        type="submit"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewProfile(data.condiProfileId);
                          //console.log("emp1");
                        }}
                        >
                      Edit Profile
                        </Button>{" "}
                    </div>
                  )
                }

export default GetInterviewStatus