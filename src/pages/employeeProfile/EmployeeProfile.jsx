import React, { Fragment } from "react";
import { useState } from "react";
import { Button, Modal, Col, Row, Form, FormGroup } from "react-bootstrap";
// import moment from "moment";
import "./EmployeeProfile.css";
import Container from "react-bootstrap/Container";
import ModelComponent from "../../modelComponent/ModelComponent";
import lance_logo from "../../images/lance_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ApiService from "../../services/ApiService";
import SubEmployee from "../../components/subEmployee/SubEmployee";
import { useLocation } from "react-router-dom";
import FileSaver from "file-saver";
import DownloadIcon from "@mui/icons-material/Download";
import SaveAsSharpIcon from "@mui/icons-material/SaveAsSharp";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function EmployeeProfile({ props }) {
  let type = sessionStorage.getItem("type");
  // console.log(props.data);
  const [data, setData] = useState({});
  const [client, setClient] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");
  const [fName, setFName] = useState("");
  const [allowanceData, setAllowanceData] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const [enhancedFields, setEnhancedFields] = useState();
  const [showEmployeeProfile, setShowEmployeeProfile] = useState(true);
  const [showAllowances, setShowAllowances] = useState(false);
  const [showBill, setShowBill] = useState(true);
  const [showClients, setShowClients] = useState(false);
  const [showEmployees, setShowEmployees] = useState(false);
  const [viewEmployee, setViewEmployee] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [subEmp, setSubEmp] = useState(false);
  const [subEmpId, setSubEmpId] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);

  const showColor = (status) => {
    if (status === "BENCH") {
      return {
        backgroundColor: "#FFEB3B",
        // color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "CLIENT") {
      return {
        backgroundColor: "#66BB6A",
        // color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "MANAGMENT") {
      return {
        backgroundColor: "#FFA500",
        // color: "#ffff",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "ABSCONDED") {
      return {
        backgroundColor: "#F6C3CC",
        // color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "RELEASED") {
      return {
        backgroundColor: "#F6C3CC",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "TERMINATED") {
      return {
        backgroundColor: "#F6C3CC",
        // color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "EXIT") {
      return {
        backgroundColor: "#EF5350",
        // color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "ACTIVE") {
      return {
        backgroundColor: "#00FF00",
        // color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "CLIENT_SIDE") {
      return {
        backgroundColor: "#1E90FF",
        // color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "INTERNAL") {
      return {
        backgroundColor: "black",
        // color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    }
  };
  const handleemployeeBackClick = () => {
    if (
      showAllowances == true ||
      showClients == true ||
      showEmployees == true
    ) {
      setShowEmployeeProfile(true);
      setShowAllowances(false);
      setShowClients(false);
      setShowEmployees(false);
      setShowBill(false);
      console.log(setShowEmployeeProfile);
    } else {
      navigate("/hr");
      setShowEmployeeProfile(false);
    }
  };

  const [employeesButtonName, setEmployeesButtonName] =
    useState("View Employees");

  const handleHideBox = () => {
    setShowEmployeeProfile(false);
  };
  // const handleemployeeBackClick = () => {
  //   setShowEmployeeProfile(true);
  // };

  const handleAllowancesButtonClick = () => {
    setShowAllowances(true);
    setShowClients(false);
    setShowEmployees(false);
    setShowBill(true);
    setShowEmployeeProfile(false);
    setEmployeesButtonName("View Employees");
    setShowBackButton(true);
  };

  const handleClientsButtonClick = () => {
    setShowClients(true);
    setShowAllowances(false);
    setShowEmployees(false);
    setShowEmployeeProfile(false);
    setShowBill(true);
    setShowBackButton(true);
    setEmployeesButtonName("View Employees");
  };

  const handleEmployeesButtonClick = () => {
    setShowEmployees(true);
    setShowAllowances(false);
    setShowClients(false);
    setShowEmployeeProfile(false);
    setShowBill(true);
    setEmployeesButtonName();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleClick = (id) => {
    setSubEmpId(id);
    setSubEmp(true);
    setModalShow(true);
    setShowEmployees(true);
    setShowAllowances(false);
    setShowClients(false);
    setShowEmployeeProfile(false);
    setShowBill(true);
    setEmployeesButtonName();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  const handleClose = () => {};
  const extractFileName = (contentDispositionValue) => {
    var filename = "";
    if (
      contentDispositionValue &&
      contentDispositionValue.indexOf("attachment") !== -1
    ) {
      var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      var matches = filenameRegex.exec(contentDispositionValue);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, "");
      }
    }
    return filename;
  };

  const handleResume = async () => {
    const id = data.detailsResponse?.employeeId;
    console.log(id);
    await ApiService.DownloadResume(id)
      .then((res) => {
        console.log(res.data);
        const filename = extractFileName(res.headers["content-disposition"]);
        if (filename !== null) {
          setFName(filename);
          setMsg("");
          console.log("File Name: ", filename);
          var fileDownload = require("js-file-download");
          fileDownload(res.data, filename);
        } else {
          setMsg("resume not found");
        }
      })

      .catch((error) => {
        alert(JSON.stringify(error));

        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  };

  useEffect(() => {
    console.log(location.state.empId);

    if (location.state.empId) {
      setStatus(true);
      //console.log(props)
      console.log(data);

      ApiService.getEmployeeById(location.state.empId)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
          setStatus(false);
          setMsg("");
        })
        .catch((err) => {
          console.log(err);
          setData("");
          setStatus(false);
          setMsg(err.message);
        });
      ApiService.specialallowance(location.state.empId)
        .then((res) => {
          console.log(res.data);
          setAllowanceData(res.data);
          setStatus(false);
          setMsg("");
        })
        .catch((err) => {
          console.log(err);
          setAllowanceData("");
          setStatus(false);
          setMsg(err.message);
        });

      ApiService.getAllClientsByEmpId(location.state.empId)
        .then((res) => {
          console.log(data);
          console.log(res.data.addres);
          setClient(res.data);
          setStatus(false);
        })
        .catch((err) => {
          console.log(err);
          setClient({});
          setStatus(false);
        });
    }
    ApiService.getUnderEmployee(location.state.empId)
      .then((res) => {
        console.log(res.data);
        setEmployee(res.data);
        setSubEmp(true);
      })
      .catch((err) => {
        console.log(err);
        setSubEmp(false);
      });

    ApiService.enhancedFields(location.state.empId)
      .then((res) => {
        console.log(data.enhancedFields);
        console.log(res.data.enhancedFields);
        setEnhancedFields(res.data.enhancedFields);
        setStatus(false);
      })
      .catch((err) => {
        console.log(err);
        setEnhancedFields({});
        setStatus(false);
      });
  }, [location.state.empId]);
  const l = data.detailsResponse?.status;

  return (
    <>
      {/* <div style={showColor(l)}> */}
      <div
        className="p-3 mb-2 bg-primary text-white"
        style={{ color: "#1492E6" }}
      >
        EMPLOYEE PROFILE{" "}
        <ArrowBackIcon
          className="arrow"
          style={{ marginLeft: "1053px" }}
          onClick={handleemployeeBackClick}
        />
      </div>

      {showEmployeeProfile && (
        <>
          <Container fluid>
            {status && <p className="text-success mb-1">loading...</p>}
            <p className="text-danger">{msg}</p>
            {!status && (
              <div onSubmit={handleSubmit}>
                <Row>
                  <div className=" basicbox col-3 col-md-7 col-lg-7 col-xl-7">
                    {/* <Col md={7} className="basicbox"> */}
                    <Row>
                      <p
                        style={{ textDecoration: "underline" }}
                        className="basicdata"
                      >
                        Basic Details
                      </p>
                    </Row>
                    <Row>
                      <Col md={3}>
                        {" "}
                        <img
                          src={data.profile}
                          alt="Profile Photo"
                          className="basicpic"
                        />
                      </Col>
                      <Col md={3}>
                        <p className="basicfields">Firstname</p>
                        <p className="basicdata">
                          {" "}
                          {data.detailsResponse?.firstName}&nbsp;
                        </p>
                      </Col>
                      <Col md={3}>
                        <p className="basicfields">Lastname</p>
                        <p className="basicdata">
                          {" "}
                          {data.detailsResponse?.lastName}&nbsp;
                        </p>
                      </Col>
                      <Col md={3}>
                        <p className="basicfields">Phone Number</p>
                        <p className="basicdata">
                          {" "}
                          {data.detailsResponse?.phoneNo}&nbsp;
                        </p>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col md={3}>
                        <p className="basicfields">Designation</p>
                        <p className="basicdata">
                          {data.detailsResponse?.designation}&nbsp;
                        </p>
                      </Col>
                      <Col md={3}>
                        <p className="basicfields">Gender</p>
                        <p className="basicdata">
                          {" "}
                          {data.detailsResponse?.gender}&nbsp;
                        </p>
                      </Col>
                      <Col md={3}>
                        <p className="basicfields">Date of Birth</p>
                        <p className="basicdata">
                          {data.detailsResponse?.dob}&nbsp;
                        </p>
                      </Col>
                      <Col md={3}>
                        <p className="basicfields">Email</p>
                        <p className="basicdata">
                          {data.detailsResponse?.email}&nbsp;
                        </p>
                      </Col>
                    </Row>
                  </div>
                  <div
                    className=" basicbox col-3 col-md-3 col-lg-3 col-xl-3"
                    style={{ marginLeft: "47px" }}
                  >
                    {/* <Col
                    md={3}
                    className="basicbox"
                    style={{ marginLeft: "13px" }}
                  > */}
                    <Row>
                      <p
                        style={{ textDecoration: "underline" }}
                        className="basicdata"
                      >
                        Address Details
                      </p>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <p className="basicfields">Street</p>
                        {data.addres?.map((it) => (
                          <p className="basicdata">{it.street}&nbsp;</p>
                        ))}
                      </Col>
                      <Col md={4}>
                        <p className="basicfields">City</p>
                        {data.addres?.map((it) => (
                          <p className="basicdata">{it.city}&nbsp;</p>
                        ))}
                      </Col>
                      <Col md={4}>
                        <p className="basicfields">Pincode</p>
                        {data.addres?.map((it) => (
                          <p className="basicdata">{it.zipCod}&nbsp;</p>
                        ))}
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col md={4}>
                        <p className="basicfields">State</p>
                        {data.addres?.map((it) => (
                          <p className="basicdata">{it.state}&nbsp;</p>
                        ))}
                      </Col>
                      <Col md={4}>
                        <p className="basicfields">Country</p>
                        {data.addres?.map((it) => (
                          <p className="basicdata">{it.state}&nbsp;</p>
                        ))}
                      </Col>
                      <Col md={4}>
                        <p className="basicfields">&nbsp;</p>
                        {data.addres?.map((it) => (
                          <p className="basicdata">{it.country}&nbsp;</p>
                        ))}
                      </Col>
                    </Row>
                    {/* </Col> */}
                  </div>
                </Row>
                <Row>
                  <div className=" basicbox col-3 col-md-4 col-lg-4 col-xl-4">
                    {/* <Col md={4} className="basicbox"> */}
                    <Row>
                      <p
                        style={{ textDecoration: "underline" }}
                        className="basicdata"
                      >
                        Internal Details
                      </p>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <p className="basicfields">Employee Id</p>
                        <p className="basicdata">
                          {" "}
                          {data.detailsResponse?.employeeId}&nbsp;
                        </p>
                      </Col>
                      {/* <Col md={4}>
                        <p className="basicfields">Joining Date</p>
                        <p className="basicdata">
                          {" "}
                          {data.detailsResponse?.joiningDate}&nbsp;
                        </p>
                      </Col> */}
                      <Col md={4}>
                        <p className="basicfields">Employment Type</p>
                        <p className="basicdata">
                          {" "}
                          {data.detailsResponse?.employeeType}&nbsp;
                        </p>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col md={4}>
                        <p className="basicfields">Location</p>
                        <p className="basicdata">
                          {" "}
                          {data.detailsResponse?.location}&nbsp;
                        </p>
                      </Col>
                      <Col md={4}>
                        <p className="basicfields">Department</p>
                        <p className="basicdata">
                          {" "}
                          {data.detailsResponse?.department}&nbsp;
                        </p>
                      </Col>
                      <Col md={4}>
                        <p className="basicfields">Sub-Department</p>
                        <p className="basicdata">
                          {" "}
                          {data.detailsResponse?.subDepartName}&nbsp;
                        </p>
                      </Col>
                    </Row>
                    {/* </Col> */}
                  </div>
                  <div
                    className=" basicbox col-3 col-md-4 col-lg-4 col-xl-4"
                    style={{ marginLeft: "22px" }}
                  >
                    {/* <Col
                    md={4}
                    className="basicbox"
                    style={{ marginLeft: "10px" }}
                  > */}
                    <Row>
                      <p
                        style={{ textDecoration: "underline" }}
                        className="basicdata"
                      >
                        Status and Technology Details
                      </p>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <p className="basicfields">Last Status</p>
                        <p className="basicdata">{data.lastStatus}&nbsp;</p>
                      </Col>
                      <Col md={4}>
                        <p className="basicfields">Exit Type</p>
                        <p className="basicdata">{data.exitType}&nbsp;</p>
                      </Col>
                      <Col md={4}>
                        <p className="basicfields">Released Date</p>
                        <p className="basicdata">{data.releasedDate}&nbsp;</p>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col md={4}>
                        <p className="basicfields">Technology-1</p>
                        <p className="basicdata">
                          {" "}
                          {data.detailsResponse?.technology1}&nbsp;
                        </p>
                      </Col>
                      <Col md={4}>
                        <p className="basicfields">Technology-2</p>
                        <p className="basicdata">
                          {" "}
                          {data.detailsResponse?.technology2}&nbsp;
                        </p>
                      </Col>
                      <Col md={4}>
                        <p className="basicfields">Salary</p>
                        <p className="basicdata">{data.salary}&nbsp;</p>
                      </Col>
                    </Row>
                    {/* </Col> */}
                  </div>
                  <div
                    className=" basicbox col-3 col-md-2 col-lg-2 col-xl-2"
                    style={{ marginLeft: "23px" }}
                  >
                    {/* <Col
                    md={2}
                    className="basicbox"
                    style={{ marginLeft: "10px" }}
                  > */}
                    <Row>
                      <p
                        style={{ textDecoration: "underline" }}
                        className="basicdata"
                      >
                        Resume Details
                      </p>
                    </Row>
                    <Row>
                      <Col md={2}></Col>
                      <Col md={8}>
                        <p className="basicfields">Resume Download</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={2}></Col>
                      <Col md={8}>
                        {" "}
                        <Button className="download" onClick={handleResume}>
                          <a className="" href="" download={fName}>
                            <DownloadIcon /> &nbsp;Download Resume
                          </a>
                        </Button>
                      </Col>
                      <Col md={2}></Col>
                    </Row>
                    {/* </Col> */}
                  </div>
                </Row>
                <Row>
                  <div className=" basicbox col-3 col-md-10 col-lg-10 col-xl-10">
                    {/* <Col md={10} className="basicbox"> */}
                    <Row>
                      <p
                        style={{ textDecoration: "underline" }}
                        className="basicdata"
                      >
                        Amount Details
                      </p>
                    </Row>
                    <Row>
                      <Col
                        md={1}
                        style={{
                          borderRight: "1px solid grey",
                          marginLeft: " 50px",
                          height: "77px",
                        }}
                      >
                        <p className="basicfields">BR INR</p>
                        <p className="basicdata">
                          {enhancedFields?.br_INR}&nbsp;
                        </p>
                      </Col>

                      <Col
                        md={1}
                        style={{
                          borderRight: "1px solid grey",
                          marginLeft: " 50px",
                          height: "77px",
                        }}
                      >
                        <p className="basicfields">BR USD</p>
                        <p className="basicdata">
                          {enhancedFields?.br_USD}&nbsp;
                        </p>
                      </Col>
                      <Col
                        md={1}
                        style={{
                          borderRight: "1px solid grey",
                          marginLeft: " 50px",
                          height: "77px",
                        }}
                      >
                        <p className="basicfields">PR INR</p>
                        <p className="basicdata">
                          {enhancedFields?.pr_INR}&nbsp;
                        </p>
                      </Col>
                      <Col
                        md={1}
                        style={{
                          borderRight: "1px solid grey",
                          marginLeft: " 50px",
                          height: "77px",
                        }}
                      >
                        <p className="basicfields">PR USD</p>
                        <p className="basicdata">
                          {enhancedFields?.pr_USD}&nbsp;
                        </p>
                      </Col>
                      <Col
                        md={1}
                        style={{
                          borderRight: "1px solid grey",
                          marginLeft: " 50px",
                          height: "77px",
                        }}
                      >
                        <p className="basicfields">GPM INR</p>
                        <p className="basicdata">
                          {enhancedFields?.gpm_INR}&nbsp;
                        </p>
                      </Col>
                      <Col
                        md={1}
                        style={{
                          borderRight: "1px solid grey",
                          marginLeft: " 60px",
                          height: "77px",
                        }}
                      >
                        <p className="basicfields">GPM USD</p>
                        <p className="basicdata">
                          {enhancedFields?.gpm_USD}&nbsp;
                        </p>
                      </Col>
                      <Col md={1} style={{ marginLeft: "50px" }}>
                        <p className="basicfields">GM</p>
                        <p className="basicdata">{enhancedFields?.gm}&nbsp;</p>
                      </Col>
                    </Row>
                    {/* </Col> */}
                  </div>
                </Row>
              </div>
            )}
          </Container>
        </>
      )}
      {setShowBill && (
        <>
          <Row>
            <div
              className=" basicbox col-3 col-md-5 col-lg-5 col-xl-5"
              style={{ marginLeft: "117px" }}
            >
              {/* <Col md={5} className="basicbox"> */}
              <Row>
                <p
                  style={{ textDecoration: "underline" }}
                  className="basicdata"
                >
                  Bill Details
                </p>
              </Row>
              <Row>
                <Col md={4}>
                  <p className="basicfields">All Clients Earning</p>
                  <p className="basicdata">{data.allClientsEarning}&nbsp;</p>
                </Col>
                <Col md={4}>
                  <p className="basicfields">Bench salary paid till Now</p>
                  <p className="basicdata">{enhancedFields?.benchPay}&nbsp;</p>
                </Col>
                <Col md={4}>
                  <p className="basicfields">Days on Bench</p>
                  <p className="basicdata">
                    {enhancedFields?.daysOnBench}&nbsp;
                  </p>
                </Col>
                <Col md={4}>
                  <p className="basicfields">Total Salary PaidTillNow</p>
                  <p className="basicdata">
                    {enhancedFields?.totalSalPaidTillNow}&nbsp;
                  </p>
                </Col>
                <Col md={4}>
                  <p className="basicfields">TotalExpenses</p>
                  <p className="basicdata">
                    {enhancedFields?.totalExpenses}&nbsp;
                  </p>
                </Col>
                <Col md={4}>
                  <p className="basicfields">Profit Or Loss</p>
                  <p className="basicdata">
                    {enhancedFields?.profitOrLoss}&nbsp;
                  </p>
                </Col>
                <Col md={4}>
                  <p className="basicfields">Total days</p>
                  <p className="basicdata">{enhancedFields?.totalDays}&nbsp;</p>
                </Col>
                <Col md={4}>
                  <p className="basicfields">Total Client days</p>
                  <p className="basicdata">
                    {enhancedFields?.totalDays - enhancedFields?.daysOnBench}
                    &nbsp;
                  </p>
                </Col>
              </Row>
              {/* </Col> */}
            </div>

            <div
              className="  col-12   col-md-6 col-lg-6 col-xl-6"
              style={{ marginLeft: "-23px" }}
            >
              <Row>
                <Col md={4}></Col>
                <Col md={4}></Col>
                <Col md={4}>
                  <Button
                    className="edit1"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/hr/editEmployee", {
                        state: { empId: location.state.empId, name: "" },
                      });
                    }}
                  >
                    &nbsp;&nbsp;&nbsp; <SaveAsSharpIcon />{" "}
                    &nbsp;&nbsp;&nbsp;Edit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  {" "}
                  <Button
                    className="viewallowances"
                    onClick={handleAllowancesButtonClick}
                  >
                    View Allowances
                  </Button>
                </Col>
                <Col md={4}>
                  {" "}
                  <Button
                    className="viewclients"
                    onClick={handleClientsButtonClick}
                  >
                    &nbsp;&nbsp;&nbsp;View Clients &nbsp;&nbsp;&nbsp;
                  </Button>
                </Col>
                <Col md={4} className="viewemployees">
                  <Button
                    className="viewemployees"
                    onClick={handleEmployeesButtonClick}
                  >
                    View Employees
                  </Button>
                </Col>
              </Row>
              {/* </Col> */}
            </div>
          </Row>
        </>
      )}

      {/* {showBackButton &&(
        <>
         <Button
                          className="edit1"
                          onClick={handleemployeeBackClick}
                        >
                         &nbsp;&nbsp;&nbsp;Back
                        </Button>
        </>
      )} */}
      {showAllowances && (
        <>
          {data.atClientAllowances && data.atClientAllowances.length > 0 ? (
            <div
              style={{
                overflowY: "scroll",
                maxHeight: "300px",
                marginTop: "80px",
                marginLeft: "50px",
              }}
            >
              {data.atClientAllowances?.map((allowanceData, index) => (
                <div key={index}>
                  <h5 className="basicdata">Allowance {index + 1}</h5>

                  <div className="basicbox col-12 col-md-8 col-lg-8 col-xl-8">
                    <Row>
                      <Col md={1} style={{ marginLeft: "20px" }}>
                        <p className="basicfields">Shift Allowances</p>
                        <p className="basicdata">
                          {allowanceData.shiftAllowance}&nbsp;
                        </p>
                      </Col>
                      <Col md={1} style={{ marginLeft: " 43px" }}>
                        <p className="basicfields">Special Allowances</p>
                        <p className="basicdata">
                          {allowanceData.specialAllowance}&nbsp;
                        </p>
                      </Col>
                      <Col md={1} style={{ marginLeft: " 50px" }}>
                        <p className="basicfields">Deputation Allowances</p>
                        <p className="basicdata">
                          {allowanceData.deputationAllowances}&nbsp;
                        </p>
                      </Col>
                      <Col md={1} style={{ marginLeft: " 41px" }}>
                        <p className="basicfields">Extra Allowances</p>
                        <p className="basicdata">
                          {allowanceData.extraAllowance}&nbsp;
                        </p>
                      </Col>
                      <Col md={1} style={{ marginLeft: " 46px" }}>
                        <p className="basicfields">Joining Bonus</p>
                        <p className="basicdata">
                          {allowanceData.joingBonus}&nbsp;
                        </p>
                      </Col>

                      <Col md={1} style={{ marginLeft: " 57px" }}>
                        <p className="basicfields">Joining Tenure</p>
                        <p className="basicdata">
                          {allowanceData.joiningBonusTenure}&nbsp;
                        </p>
                      </Col>
                    </Row>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ margin: "118px", color: "red", fontWeight: "bold" }}>
              No Allowances Present
            </p>
          )}
          {/* </div> */}
        </>
      )}

      {showClients && (
        <>
          {data.employeeAtClientsDetails &&
          data.employeeAtClientsDetails.length > 0 ? (
            <div
              style={{
                overflowY: "scroll",
                maxHeight: "400px",
                marginTop: "50px",
                marginLeft: "50px",
              }}
            >
              {data.employeeAtClientsDetails?.map((client, index) => (
                <div key={index}>
                  <h5 className="basicdata">Client {index + 1}</h5>
                  <div className="basicbox col-12 col-md-8 col-lg-10 col-xl-10">
                    <Row>
                      <Col md={2}>
                        <p className="clientfields"> Client Name</p>
                        <p className="clientdata">{client.clients}</p>
                      </Col>
                      <Col md={2}>
                        <p className="clientfields"> Client Location</p>
                        <p className="clientdata"> {client.clientLocation}</p>
                      </Col>
                      <Col md={2}>
                        <p className="clientfields"> Work Mode</p>
                        <p className="clientdata">{client.workMode}</p>
                      </Col>
                      <Col md={2}>
                        <p className="clientfields"> Client Email</p>
                        <p className="clientdata"> {client.clientEmail}</p>
                      </Col>
                      <Col md={2}>
                        <p className="clientfields"> Client Manager Name</p>
                        <p className="clientdata">
                          {client.clientManagerName}&nbsp;
                        </p>
                      </Col>
                      <Col md={2}>
                        <p className="clientfields"> Client Salary</p>
                        <p className="clientdata">
                          {client.clientSalary}&nbsp;
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      {/* <Col md={2}>
                      <p className="clientfields"> PO Date </p>
                      <p className="clientdata"> {client.podate}&nbsp;</p>
                    </Col> */}
                      <Col md={2}>
                        <p className="clientfields"> Client Joining Date</p>
                        <p className="clientdata"> {client.posdate}&nbsp;</p>
                      </Col>
                      <Col md={2}>
                        <p className="clientfields">Client Last Working Day</p>
                        <p className="clientdata"> {client.poedate}&nbsp;</p>
                      </Col>
                      <Col md={2}>
                        <p className="clientfields">Offer Release Date</p>
                        <p className="clientdata">
                          {client.offerReleaseDate}&nbsp;
                        </p>
                      </Col>
{/*                       <Col md={2}>
                        <p className="clientfields"> Joining Date</p>
                        <p className="clientdata">
                          {client.clientJoiningDate}&nbsp;
                        </p>
                      </Col> */}
                      <Col md={2}>
                        <p className="clientfields">Designation at Client </p>
                        <p className="clientdata">
                          {client.desgAtClient}&nbsp;
                        </p>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={2}>
                        <p className="clientfields">Skill Set</p>
                        <p className="clientdata">{client.skillSet}&nbsp;</p>
                      </Col>
                      <Col md={2}>
                        <p className="clientfields">Sub Contractor</p>
                        <p className="clientdata">
                          {client.subContractor}&nbsp;
                        </p>
                      </Col>
                      <Col md={2}>
                        <p className="clientfields">Tower Head</p>
                        <p className="clientdata">{client.towerHead}&nbsp;</p>
                      </Col>
                      <Col md={2}>
                        <p className="clientfields">Tower Lead</p>
                        <p className="clientdata"> {client.towerLead}&nbsp;</p>
                      </Col>
                      <Col md={2}>
                        <p className="clientfields">Recruiter</p>
                        <p className="clientdata">{client.recruiter}&nbsp;</p>
                      </Col>
                      {/* <Col md={2}>
                        <p className="clientfields">Client Last Working Date</p>
                        <p className="clientdata">
                          {client.clientLastWorkingDate}&nbsp;
                        </p>
                      </Col> */}
                    </Row>

                    <Row>
                      <Col md={2}>
                        <p className="clientfields">
                          Lancesoft Last Working Date
                        </p>
                        <p className="clientdata">
                          {client.lancesoftLastWorkingDate}&nbsp;
                        </p>
                      </Col>
                      <Col md={2}>
                        <p className="clientfields"> Client Tenure</p>
                        <p className="clientdata">
                          {client.clientTenure}&nbsp;
                        </p>
                      </Col>
                      <Col md={2}>
                        <p className="clientfields">Total Billing at Client</p>
                        <p className="clientdata">
                          {client.totalEarningAtClient}&nbsp;
                        </p>
                      </Col>
                      {/* <Col md={2}>
                        <p className="clientfields">PO Value</p>
                        <p className="clientdata"> {client.povalue}&nbsp;</p>
                      </Col> */}
                      {/* <Col md={2}>
                        <p className="clientfields">PO Number</p>
                        <p className="clientdata">{client.ponumber}&nbsp;</p>
                      </Col> */}
                      <Col md={2}>
                        <p className="clientfields">IGST</p>
                        <p className="clientdata">{client.igst}&nbsp;</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={2}>
                        <p className="clientfields"> CGST</p>
                        <p className="clientdata">{client.cgst}&nbsp;</p>
                      </Col>
                      <Col md={2}>
                        <p className="clientfields"> SGST</p>
                        <p className="clientdata">{client.sgst}&nbsp;</p>
                      </Col>
                      <Col md={2}>
                        <p className="clientfields"> Total Tax</p>
                        <p className="clientdata">{client.totalTax}&nbsp;</p>
                      </Col>
                      {/* <Col md={2}>
                          <p className="clientfields">&nbsp; </p>
                          <p className="clientdata">&nbsp;</p>
                          </Col>
                        <Col md={2}>
                          <p className="clientfields">&nbsp;</p>
                          <p className="clientdata">&nbsp;</p>
                          </Col>
                        <Col md={2}>
                          <p className="clientfields">&nbsp;</p>
                          <p className="clientdata">&nbsp;</p>
                          </Col> */}
                    </Row>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ margin: "118px", color: "red", fontWeight: "bold" }}>
              No Clients Present
            </p>
          )}
        </>
      )}
      {showEmployees ? (
        employee && employee.length > 0 ? (
          <div
            className="Container"
            style={{
              maxHeight: "400px",

              overflowY: "scroll",
              marginTop: "100px",
              marginLeft: "71px",
            }}
          >
            {employee?.map((emp, index) => (
              <div
                className="basicbox col-12 col-md-8 col-lg-8 col-xl-8"
                key={index}
              >
                <Row>
                  <Col md={1}>
                    <img src="" className="emppic" />
                  </Col>
                  <Col md={2} style={{ marginLeft: "53px", marginTop: "14px" }}>
                    <p className="basicdata">
                      {emp.firstName}
                      {emp.lastName}
                      &nbsp;
                    </p>
                  </Col>
                  <Col md={1} style={{ marginLeft: "53px", marginTop: "14px" }}>
                    <p className="basicdata">{emp.employeeId}&nbsp;</p>
                  </Col>
                  <Col md={1} style={{ marginLeft: "53px", marginTop: "14px" }}>
                    <p className="basicdata">{emp.email}&nbsp;</p>
                  </Col>
                  <Col md={1} style={{ marginLeft: "53px", marginTop: "14px" }}>
                    <p className="basicdata">{emp.phoneNo}&nbsp;</p>
                  </Col>
                  <Col md={2}>
                    <Button className="details">Get Details</Button>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ margin: "118px", color: "red", fontWeight: "bold" }}>
            No Employees Present
          </p>
        )
      ) : null}
      {/* </div> */}
    </>
  );
}

export default EmployeeProfile;
