import React, { useEffect, useState } from "react";
import { Table, Form ,Col,Row,Button} from "react-bootstrap";
import ApiService from "../../services/ApiService";
import { useLocation, useNavigate } from "react-router-dom";
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import interview2 from "../../images/interview2.svg";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import moment from "moment";
import Lottie1, { LottiePlayer } from 'lottie-react';
import animationData from "./2649.json";


import "./JobProfiles.css";
const JobProfiles = (props) => {
  const [status1, setStatus1] = useState(true);

  const [interviewStatus1, setInterviewStatus1] = useState(null);
  const [isApproved, setIsApproved] = useState(false);
  const [interviewStatus, setInterviewStatus] = useState(false);
  const [interviewUpdateStatus, setInterviewUpdateStatus] = useState(false);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [profile, setProfile] = useState("");
  const [data, setData] = useState({});
  const [status2, setStatus2] = useState(null);
  const [updateData, setUpdateData] = useState({});
  const location = useLocation();

  const handleBackButton=()=>{
    navigate("/recruiter");
  }
  useEffect(() => {
    console.log(location.state.jobStringId);

    if (location.state.jobStringId) {
      setStatus2(true);
      //console.log(props)
      console.log(data);
      ApiService.profiletracking(location.state.jobStringId)
        .then((res) => {
          console.log(res.data);
          setProfile(res.data);
          // setSelectedCandidate(res,data[0])

          console.log(data);

          setMsg("");
        })
        .catch((err) => {
          console.log(err);
          setProfile("");

          setMsg(err.message);
        });
    }
  }, [location.state.jobStringId]);
  const handleViewProfile = (id) => {
    console.log(id);
    setInterviewUpdateStatus(true, {
      state: { candidateId: updateData.candidateId },
    });
    setStatus1(false);
    setInterviewStatus(false);
    setIdate(updateData?.l1ScheduleAt);
    setIdate2(updateData?.l2ScheduleAt);

    setIdate1(updateData?.l1PostponedAt);

    setIdate3(updateData?.l2PostponedAt);
  };
  const [idate, setIdate] = useState("");
  const [idate1, setIdate1] = useState("");
  const [idate2, setIdate2] = useState("");
  const [idate3, setIdate3] = useState("");
  const [status4, setStatus4] = useState(false);

  const formattedDate = moment(idate).format("YYYY-MM-DDTHH:mm:ss");

  const formattedDate1 = moment(idate1).format("YYYY-MM-DDTHH:mm:ss");
  const formattedDate2 = moment(idate2).format("YYYY-MM-DDTHH:mm:ss");

  const formattedDate3 = moment(idate3).format("YYYY-MM-DDTHH:mm:ss");
  const handleClick = (candidate) => {
    console.log(candidate)
    setSelectedCandidate(candidate);
    // reset interview status states when changing profile
    setStatus1(true);
    setInterviewStatus(false);
    setInterviewUpdateStatus(false);
    setShowSaveForm(false);
    setScheduleButton(false);
  };
  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
    console.log(e.target.name, e.target.value);
    if (e.target.name == "l1ScheduleAt") setIdate(e.target.value);
    else if (e.target.name == "l1PostponedAt") setIdate1(e.target.value);
    else if (e.target.name == "l2ScheduleAt") setIdate2(e.target.value);
    else if (e.target.name == "l2PostponedAt") setIdate3(e.target.value);

    console.log(data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(true);
    // const updatedItems = data.filter(data => data.id !== "recId");
    delete updateData.recId;
    delete updateData.jobStringId;
    delete updateData.statusId;
    delete updateData.recruiterName;
    // setErrors(false);
    setInterviewStatus(false);
    setStatus1(false);
    setInterviewUpdateStatus(false);
    setShowSaveForm(true);
    ApiService.interviewStatus(updateData)
      .then((res) => {
        console.log(res.data);
        setStatus4(false);
        setMsg("");
      })
      .catch((error) => {
        console.log(error);
        setStatus4(true);

        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(data);
  };
  const handileInterview = (id) => {
    ApiService.scheduleStatus(id)
      .then((res) => {
        console.log(res.data);
        // navigate("/hr/GetInterviewStatus", { state: { candidateId: id } });
        setStatus(false);
        setInterviewStatus(true); // Set the interviewStatus state to true
        setUpdateData(res.data);
        console.log(updateData);
        setInterviewUpdateStatus(false);
        setStatus1(false);
        setShowSaveForm(false);
      })
      .catch((err) => {
        console.log(err);

        setStatus(true);
        setMsg(err.message);
      });

    console.log(id);
  };

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [scheduleButton,setScheduleButton]=useState(false);
    const[approve,setApprove]=useState(props?.profiles?.managerApproval)
    const[msg,setMsg]=useState(null)
    const[reject,setReject]=useState(null)
    const[status,setStatus]=useState(false)
    const navigate = useNavigate();



    useEffect(() => {
     
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

    const handleInterview= (id) => {

      ApiService.scheduleStatus(id)
             .then((res) => {
            //    console.log(res.data); 
            navigate("/hr/GetInterviewStatus", { state: { candidateId: id } });
            setStatus(false);

             })
             .catch((err) => {
               console.log(err);
               
               setStatus(true);
               setMsg(err.message);


             });
           

      console.log(id);
      
    };
    //console.log(props)
    const handleScheduleButton=()=>{
      setScheduleButton(true);
        }
    const handleApproval = (id) => {
      if(selectedCandidate.managerApproval!=="REJECT")    
        setScheduleButton(true);    
      
let status=[
  {
    "id": id,
    "status": "APPROVE"
  }
]


      console.log(id);
      // console.log('value is:', e.target.value);

  
      // if (name === "APPROVE") {
        ApiService.ApproveProfiles(status)
          .then((res) => {
             console.log(res.data);
            
          })
  
          .catch((error) => {
            alert(JSON.stringify(error))
            setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
          })
      
  
    
    }
    const handleReject = (id) => {
      console.log(id)
  
      let status1=[
        {
          "id": id,
          "status": "REJECT"
        }
      ]
      // if (name === "REJECT") {
        ApiService.ApproveProfiles(status1)
          .then((res) => {
         
            setReject(res.data)
          })
  
          .catch((error) => {
            alert(JSON.stringify(error))
            setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
          })
      
    
    }
   
    return (
//       <div id="add-employee" className="card">

            
//      <Form >
               
//      <h1 className="title text-center">Profiles</h1>
//                        <hr></hr>
       
// <div>  <b>Candidate Id:</b><p>{props?.profiles?.candidateId}</p></div>
// <div>  <b>Candidate Name:</b><p>{props?.profiles?.candidateName}</p></div>
// <div>  <b>Email Id:</b><p>{props?.profiles?.emailId}</p></div>
// <div>  <b>Mobile No:</b><p>{props?.profiles?.mobileNo}</p></div>
// <div>  <b>Current CTC:</b><p>{props?.profiles?.currentCTC}</p></div>
// <div>  <b>Relevant Exp:</b><p>{props?.profiles?.relevantExp}</p></div>
// <div>  <b>Expected CTC:</b><p>{props?.profiles?.expectedCTC}</p></div>
// <div>  <b>SentBy:</b><p>{props?.profiles?.sentBy}</p></div>
// <div>  <b>Total Exp:</b><p>{props?.profiles?.totalExp}</p></div>
// <div>  <b>Current Org:</b><p>{props?.profiles?.currentOrg}</p></div>
// <div>  <b>Sent At:</b><p>{props?.profiles?.sentAt}</p></div>
// <div>  <b>Manager Approval:</b><p>{approve}</p></div>
// <div>  <b>Approve At:</b><p>{props?.profiles?.approveAt}</p></div>
// <div>  <b>Ticket Name:</b><p>{props?.profiles?.ticketName}</p></div>
// <div><b>Candidate Resume:</b></div>
//                           <button className="button">
//                             <a
//                               className="button"
//                               href={props?.profiles?.candiResume}
                            
//                               >
//                               Download Resume:
//                             </a>
//                           </button>


//                 </Form>
//                 <br/>
//                 <Button
               
//         className="card-btn1"
//         onClick={(e) => {
//           e.stopPropagation();
//           handleInterview(props?.profiles?.candidateId);
//           //console.log("emp1");
//         }}
//       >
//         GetInterviewStatus
//       </Button>
// <br/>
// <div className="view-buttons">

//         <Button className="btn-signup px-2" 
//         type="submit"
//         name="APPROVE"
//         onClick={(e) => {
//           e.stopPropagation();
//           handleApproval(props?.profiles?.candidateId);
//           //console.log("emp1");
//         }}
//         >
//               Approve
       
//         </Button>{" "}
//         <Button className="px-2" type="submit"

// onClick={(e) => {
//   e.stopPropagation();
//   handleReject(props?.profiles?.candidateId);
//   //console.log("emp1");
// }}
// >
// Reject
          
//         </Button>
//         </div>



//                 {/* <Button
//                 name="APPROVE"
//         className="card-btn"
//         onClick={(e) => {
//           e.stopPropagation();
//           handleApproval(props?.profiles?.candidateId);
//           //console.log("emp1");
//         }}
//       >
    
//       </Button> */}
//     {/* <br/> */}
      
//       {/* <Button
//       name="REJECT"
//         className="card-btn"
//         onClick={(e) => {
//           e.stopPropagation();
//           handleReject(props?.profiles?.candidateId);
//           //console.log("emp1");
//         }}
//       >
//       Reject
//       </Button> */}
      
//                 </div>
            
            
    <>
    <div className="containerTagged">
      <div id="viewprofile">View Profile</div>

      <div id="sidebar12">
        <div className="listContainer1">
          <ul className="row14">
            <li>Results</li>
          </ul>
          <ul className="row15">
            <li style={{ marginLeft: "70px" }}>{data.length} Profiles</li>
          </ul>
        </div>
        <hr className="line" />
        <div className="scrollbar12">
        
          {data?.length > 0 &&
            data.map((it) => (
              <div className="cardemployee1" >
                <ul className=" row11">
                  <li>Candidate Name</li>
                </ul>
                <ul className=" row21">
                  <li>{it.candidateName}&nbsp;</li>
                </ul>
                <div className="listContainer1">
                  <ul className="row31">
                    <li style={{ color: " #1492E6" }}>Relevant Exp</li>

                    <li>{it.relevantExp}&nbsp;</li>
                    <li style={{ color: " #1492E6" }}>Current CTC</li>
                    <li>{it.currentCTC}&nbsp;</li>
                  </ul>
                  <ul className="row41">
                    <li style={{ color: " #1492E6" }}>Total Exp</li>
                    <li>{it.totalExp}&nbsp;</li>
                    <li style={{ color: " #1492E6" }}>Expected CTC</li>

                    <li>{it.expectedCTC}&nbsp;</li>
                  </ul>
                </div>

                <div>
                  <button
                    className="profilebutton"
                    onClick={() => {handleClick(it)}}
                  >
                    View Profile
                  </button>
                </div>
              </div>
             ))} 
        </div>
      </div>
      
          <div id="empdetails">
           {selectedCandidate && ( 
        <>
            <div className="listContainer">
              <ul className="list1">
                <li>Manager Approval</li>
                <li>{selectedCandidate.managerApproval}</li>
                <li>Approve Date</li>
                <li>{selectedCandidate.approveAt}&nbsp;</li>
              </ul>

              <ul className="list2">
                <li>Candidate Resume</li>
                <li>
                  <Button className="dlButton1">
                    <a
                      style={{ color: "black", textDecoration: "none" }}
                      href={selectedCandidate.candiResume}
                    >
                      <VerticalAlignBottomIcon />
                      Download Resume
                    </a>
                  </Button>
                </li>
              </ul>
            </div>
            <hr className="line" />
            <div className="listContainer">
              <ul className="list1">
                <li>Candidate Id</li>
                <li>{selectedCandidate.candidateId}&nbsp;</li>
              </ul>

              <ul className="list2">
                <li> Sent Date</li>
                <li>{selectedCandidate.sentAt}&nbsp;</li>
              </ul>
            </div>

            <hr className="line" />
            <div className="listContainer">
              <ul className="list1">
                <li> Candidate Name</li>
                <li>{selectedCandidate.candidateName}&nbsp;</li>
                <li> Email Id</li>
                <li>{selectedCandidate.emailId}&nbsp;</li>
              </ul>

              <ul className="list2">
                <li> &nbsp;</li>
                <li>&nbsp;</li>
                <li> Mobile No</li>
                <li>{selectedCandidate.mobileNo}&nbsp;</li>
              </ul>
            </div>

            <hr className="line" />

            <div className="listContainer">
              <ul className="list1">
                <li> Relevant Exp</li>
                <li>{selectedCandidate.relevantExp}&nbsp;</li>
                <li> Current CTC</li>
                <li>{selectedCandidate.currentCTC}&nbsp;</li>
              </ul>

              <ul className="list2">
                <li> Total Exp</li>
                <li>{selectedCandidate.totalExp}&nbsp;</li>
                <li> Expected CTC</li>
                <li>{selectedCandidate.expectedCTC}&nbsp;</li>
              </ul>
            </div>

            <div className="listContainer">
              <ul className="list1" style={{ marginTop: "-15px" }}>
                <li>Current Org</li>
                <li>{selectedCandidate.currentOrg}&nbsp;</li>
                <li>Sent By</li>
                <li>{selectedCandidate.sentBy}&nbsp;</li>
              </ul>

              <ul className="list2">
                <li>
                  <Button
                  className="btn btn-success"
                  
                  onClick={  ()=>{handleApproval(selectedCandidate.candidateId)}}
                  
                  >Approve</Button>
                </li>
             {scheduleButton&&  <li>
                  {/* {selectedCandidate.managerApproval === "APPROVE" && ( */}
                    <Button
                      variant="contained"
                      size="medium"
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        fontSize: "10px",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                         handileInterview(selectedCandidate.candidateId);
                      }}
                    >
                     Get Interview Status
                    </Button>
                   {/* )}  */}
                </li>}
                <li>
                <Button
                  className="btn btn-danger"
                  onClick={(e) => {
                              e.stopPropagation();
                              handleReject(selectedCandidate.candidateId);
                               //console.log("emp1");
                             }}
                  >Reject</Button>
              
                  {/* {selectedCandidate.managerApproval === "REJECTED" ||
                    (selectedCandidate.managerApproval === "PENDING" && ( */}
                      {/* <p className="text-danger mb-2">
                        The profile is Rejected or Pending....
                      </p> */}
                    {/* ))} */}
                </li>
              </ul>
            </div>
            </>
            )} 
          </div>
          <div id="ticket">
        
            <>
            <div className="listContainer1">
              <ul className="ticket1">
                <li>Ticket No # &nbsp;&nbsp;</li>
              </ul>
              {selectedCandidate && (
              <ul className="ticket2">
                <li>{selectedCandidate.ticketName}</li>

              </ul>
               )}
            </div>
            </>
         
          </div>
    
     
      <div id="interview">
        {interviewStatus && (
          <>
            <div className="listContainer1">
              <ul className="row14">
                <li>Interview Status</li>
              </ul>
              <ul className="row15">
                <li>
                  <Button
                    className="updateinterview"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewProfile(updateData.candidateId);
                      console.log("emp1");
                    }}
                  >
                    Update Interview Status
                  </Button>
                </li>
              </ul>
            </div>
            <hr className="line" />

            <Form
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <div className="formupdate">
                <Form.Group
                  className="updategroup"
                  style={{ padding: "0px 40px 0px 40px" }}
                >
                  <Form.Label className="updateint">
                    Candidate Profile Id
                  </Form.Label>
                  <Form.Control
                    className="updateInput1"
                    placeholder="Enter condiProfileId"
                    type=""
                    name="condiProfileId"
                    defaultValue={updateData.condiProfileId}
                    onChange={handleChange}
                  ></Form.Control>
                  <Form.Label className="updateint">
                    L1 Schedule Date
                  </Form.Label>

{console.log(updateData?.l1ScheduleAt)}

                  <Form.Control
                    className="updateInput1"
                    placeholder="Enter l1ScheduleAt"
                    type=""
                    name="l1ScheduleAt"
                    // defaultValue= {getdatetime (data?.l1ScheduleAt)}
                    defaultValue={updateData?.l1ScheduleAt?.replace("T", " ")}
                    onChange={handleChange}
                  ></Form.Control>

                  <Form.Label className="updateint">
                    L1 PostPoned Date
                  </Form.Label>
                  <Form.Control
                    className="updateInput1"
                    placeholder="Enter l1PostponedAt"
                    type=""
                    name="l1PostponedAt"
                    // defaultValue= {getdatetime (data?.l1PostponedAt)}
                    defaultValue={updateData?.l1PostponedAt?.replace(
                      "T",
                      " "
                    )}
                    onChange={handleChange}
                  ></Form.Control>

                  <Form.Label className="updateint">L1 Status</Form.Label>
                  <Form.Control
                    className="updateInput1"
                    placeholder="Enter l1Status"
                    type=""
                    name="l1Status"
                    // defaultValue= {getdatetime (data?.l2PostponedAt)}
                    defaultValue={updateData?.l1Status}
                    onChange={handleChange}
                  ></Form.Control>

                 
                  <Form.Label className="updateint">
                    Released Offer Date
                  </Form.Label>
                  <Form.Control
                    className="updateInput1"
                    placeholder="Enter ReleasedOfferAt"
                    type="date"
                    name="releasedOfferAt"
                    defaultValue={updateData.releasedOfferAt}
                    onChange={handleChange}
                  ></Form.Control>

                  <Form.Label className="updateint">Joined</Form.Label>
                  <Form.Control
                    className="updateInput1"
                    placeholder="Enter joined "
                    type=""
                    name="joined"
                    defaultValue={updateData.joined}
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="updategroup">
                  <Form.Label className="updateint">
                    Candidate Name
                  </Form.Label>
                  <Form.Control
                    className="updateInput1"
                    placeholder="Enter candiName"
                    type=""
                    name="candiName"
                    defaultValue={updateData.candiName}
                    onChange={handleChange}
                  ></Form.Control>
                   <Form.Label className="updateint">
                    L2 Schedule Date
                  </Form.Label>
                  <Form.Control
                    className="updateInput1"
                    placeholder="Enter l2ScheduleAt"
                    type=""
                    name="l2ScheduleAt"
                    // defaultValue= {getdatetime (data?.l2ScheduleAt)}
                    defaultValue={updateData?.l2ScheduleAt?.replace("T", " ")}
                    onChange={handleChange}
                  ></Form.Control>
                  <Form.Label className="updateint">
                    L2 PostPoned Date
                  </Form.Label>
                  <Form.Control
                    className="updateInput1"
                    placeholder="Enter l2PostponedAt"
                    type=""
                    name="l2PostponedAt"
                    // defaultValue= {getdatetime (data?.l2PostponedAt)}
                    defaultValue={updateData?.l2PostponedAt?.replace(
                      "T",
                      " "
                    )}
                    onChange={handleChange}
                  ></Form.Control>

                  <Form.Label className="updateint">L2 Status</Form.Label>
                  <Form.Control
                    className="updateInput1"
                    placeholder="Enter l2Status"
                    type=""
                    name="l2Status"
                    // defaultValue= {getdatetime (data?.l2PostponedAt)}
                    defaultValue={updateData?.l2Status}
                    onChange={handleChange}
                  ></Form.Control>

                  

                  <Form.Label className="updateint">
                    Released Offer
                  </Form.Label>
                  <Form.Control
                    className="updateInput1"
                    placeholder="Enter releasedOffer"
                    type=""
                    name="releasedOffer"
                    defaultValue={updateData.releasedOffer}
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>
              </div>
            </Form>
          </>
        )}
        {status1 && (
          <div className="idetails">
            <img className="interviewimg" src={interview2} />
            <p style={{ textAlign: "center" }}>
              Select an Schedule Interview
            </p>
            <p
              style={{
                textAlign: "center",
                color: "#CFCFD6",
                fontWeight: "normal",
              }}
            >
              Nothing is selected
            </p>
          </div>
        )}

        {interviewUpdateStatus && (
          <>
            <div className="listContainer1">
              <ul className="row14">
                <li>Update Interview Status</li>
              </ul>
              <ul className="row15">
                <li></li>
              </ul>
            </div>
            <hr className="line" />
            <Form
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <div className="formupdate">
                <Form.Group
                  className="updategroup"
                  style={{ padding: "0px 20px 0px 20px" }}
                >
                  <Form.Label className="updateint">
                    Candidate Name
                  </Form.Label>
                  <Form.Control
                    className="updateInput1"
                    placeholder="Enter candiName"
                    type=""
                    name="candiName"
                    defaultValue={updateData.candiName}
                    onChange={handleChange1}
                  ></Form.Control>
                  <Form.Label className="updateint">
                    L1 Schedule Date
                  </Form.Label>
                  <Form.Control
                    className="updateInput1"
                    type="datetime-local"
                    id="date-input"
                    name="l1ScheduleAt"
                    value={formattedDate}
                    onChange={handleChange1}
                  ></Form.Control>

                  <Form.Label className="updateint">
                    L1 PostPoned Date
                  </Form.Label>
                  <Form.Control
                    className="updateInput1"
                    type="datetime-local"
                    name="l1PostponedAt"
                    id="date-input2"
                    value={formattedDate1}
                    onChange={handleChange1}
                  ></Form.Control>

                  <Form.Label className="updateint">L1 Status</Form.Label>
                  <Form.Select
                    required
                    id="l1Status"
                    aria-label="l1Status"
                    className="updateInput1"
                    name="l1Status"
                    defaultValue="APPROVE"
                    onChange={handleChange1}
                  >
                    <option value="">select</option>
                    <option value="APPROVE">APPROVE</option>
                    <option value="REJECT">REJECT</option>
                  </Form.Select>

                  <Form.Label className="updateint">
                    Released Offer
                  </Form.Label>
                  <Form.Select
                    required
                    id="releasedOffer"
                    aria-label="releasedOffer"
                    className="updateInput1"
                    name="releasedOffer"
                    onChange={handleChange1}
                  >
                    <option value="">select</option>
                    <option
                      value={true}
                      selected={updateData.releasedOffer == true}
                    >
                      YES
                    </option>
                    <option
                      value={false}
                      selected={updateData.releasedOffer == false}
                    >
                      NO
                    </option>
                  </Form.Select>
                  <Form.Label className="updateint">Joined</Form.Label>
                  <Form.Select
                    required
                    id="joined"
                    aria-label="joined"
                    className="updateInput1"
                    name="joined"
                    onChange={handleChange}
                  >
                    <option value="">select</option>
                    <option
                      value={true}
                      selected={updateData.releasedOffer == true}
                    >
                      YES
                    </option>
                    <option
                      value={false}
                      selected={updateData.releasedOffer == false}
                    >
                      NO
                    </option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="updategroup">
                  <Form.Label className="updateint">
                    Candidate Profile Id
                  </Form.Label>
                  <Form.Control
                    className="updateInput1"
                    placeholder="Enter condiProfileId"
                    type=""
                    name="condiProfileId"
                    defaultValue={updateData.condiProfileId}
                    onChange={handleChange1}
                  ></Form.Control>

                  <Form.Label className="updateint">
                    L2 Schedule Date
                  </Form.Label>
                  <Form.Control
                    className="updateInput1"
                    type="datetime-local"
                    id="date-input"
                    name="l2ScheduleAt"
                    value={formattedDate2}
                    onChange={handleChange1}
                  ></Form.Control>

                  <Form.Label className="updateint">
                    L2 PostPoned Date
                  </Form.Label>
                  <Form.Control
                    className="updateInput1"
                    type="datetime-local"
                    id="date-input"
                    name="l2PostponedAt"
                    value={formattedDate3}
                    onChange={handleChange1}
                  ></Form.Control>

                  <Form.Label className="updateint">L2 Status</Form.Label>
                  <Form.Select
                    required
                    id="l2Status"
                    aria-label="l2Status"
                    className="updateInput1"
                    name="l2Status"
                    onChange={handleChange1}
                    defaultValue="APPROVE"
                  >
                    <option value="">select</option>
                    <option value="APPROVE">APPROVE</option>
                    <option value="REJECT">REJECT</option>
                  </Form.Select>

                  <Form.Label className="updateint">
                    Released Offer Date
                  </Form.Label>
                  <Form.Control
                    className="updateInput1"
                    placeholder="Enter ReleasedOfferAt"
                    type="date"
                    name="releasedOfferAt"
                    defaultValue={updateData.releasedOfferAt}
                    onChange={handleChange1}
                  ></Form.Control>

                  <Button className="saveInterview" onClick={handleSubmit}>
                    Save
                  </Button>
                </Form.Group>
              </div>
            </Form>
          </>
        )}

        {showSaveForm && (
          <>
            <div>
              <div>
                <Lottie1
                style={{height:"40%"}}
                  animationData={animationData}
                  loop={true}
                  autoplay={true}
                  className="lottie1"
                />
              </div>
              <p className="updatedStatus">
                Updated Interview Status Successfully
              </p>
            </div>
          </>
        )}
      </div>
      <div id="profiletracking">
        <div>
          <Table className="trac">
            <thead>
              <tr>
                <th className="t1">Profile Tracking</th>
                <th className="t2">
                  Rejected&nbsp;&nbsp;&nbsp;{profile.Rejected}
                </th>
                <th className="t3">
                  Pending&nbsp;&nbsp;&nbsp;{profile.Pending}
                </th>
                <th className="t4">
                  Approved&nbsp;&nbsp;&nbsp;{profile.Approved}
                </th>
                <th>
                  <ArrowCircleLeftOutlinedIcon onClick={handleBackButton} style={{ fontSize: 50 }} />
                  &nbsp;&nbsp;
                </th>
              </tr>
            </thead>
          </Table>
        </div>
      </div>
    </div>
  </>
      )
}

export default JobProfiles