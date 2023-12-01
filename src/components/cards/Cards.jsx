import React, { useState } from "react";

import { Link } from "react-router-dom";
import ModelComponent from "../../modelComponent/ModelComponent";
import "./cards.css";

function Cards(props) {
  let type = sessionStorage.getItem("type");

  const [modalShow, setModalShow] = useState(false);

  const [subEmp, setSubEmp] = useState(false);
  const [subEmpId, setSubEmpId] = useState("");
  const [showText, setShowText] = useState(false);
  const showStatus = (status) => {
    if (status === "BENCH") {
      return {
        backgroundColor: "#FF69B4",
        color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "CLIENT") {
      return {
        backgroundColor: "#66BB6A",
        color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "ABSCONDED") {
      return {
        backgroundColor: "#F6C3CC",
        color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "RELEASED") {
      return {
        backgroundColor: "##F6C3CC",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "TERMINATED") {
      return {
        backgroundColor: "#F6C3CC",
        color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "EXIT") {
      return {
        backgroundColor: "#EF5350",
        color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "ACTIVE") {
      return {
        backgroundColor: "#00FF00",
        color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "INTERNAL") {
      return {
        backgroundColor: "#FFEA00",
        color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "MANAGMENT") {
      return {
        backgroundColor: "	#1492E6",
        color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "CLIENT_SIDE") {
      return {
        backgroundColor: "#1492E6",
        color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "C2H") {
      return {
        backgroundColor: "#00FF00",
        color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "HR") {
      return {
        backgroundColor: "#0C0C0F",
        color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    }
  };

  return (
    <>
      <ModelComponent
        data={subEmp ? subEmpId : props?.data?.empId}
        type={type}
        show={modalShow}
        // view={view}
        onHide={() => {
          setModalShow(false);
          // setData({});
        }}
      />

      {/* <Link to="/hr/editEmployee" state={{ empId: props?.data?.empId, name: "" }}> */}
      <Link
        to="/hr/EmployeeProfile"
        state={{ empId: props?.data?.empId, type: type }}
        style={{ textDecoration: "none" }}
      >
        <div className="employee-card">
          <span
            style={showStatus(props?.data?.status)}
            class="dot"
            onMouseEnter={() => setShowText(true)}
            onMouseLeave={() => setShowText(false)}
          >
            {" "}
            {showText && <p className="displaystatus">{props?.data?.status}</p>}
          </span>
          {/* <img src={props?.data?.photo} alt="Profile" /> */}
          <img src={props?.data?.photo} alt= "&emsp;&emsp; &nbsp;&nbsp;ProfilePhoto" />
          <div className="info">
            <h2>{props?.data?.employeeName}</h2>
            {/* <span style={showStatus(props?.data?.status)}>
              {" "}
              {props?.data?.status}
            </span> */}
            <p>
              {" "}
              {props?.data?.lancesoftId}
              {"    "} &nbsp;
              <span className="red">
                {" "}
                &nbsp; &nbsp;{props?.data?.designation}
              </span>
            </p>

            {/* <p>{props?.data?.designation}</p> */}
            <hr></hr>

            <div className="manager primary">
              <div className="title  text-left" style={{ color: "#1492E6" }}>
                Primary Manager
                <div className="name">{props?.data?.managerName} </div>
                {/* <div class="title">{props?.data?.managerName	}</div> */}
              </div>
            </div>
            <div className="manager secondary">
              <div className="title" style={{ color: "#1492E6" }}>
                Secondary Manager
                <div className="name">
                  {props?.data?.subordinateManagerName}{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
export default Cards;
