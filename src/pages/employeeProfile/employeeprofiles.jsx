import React, { Fragment } from "react";
import { useState } from "react";
import { Button, Modal, Col, Row, Form, FormGroup } from "react-bootstrap";
// import moment from "moment";
import "./EmployeeProfile.css";
import { useEffect } from "react";
import ApiService from "../../services/ApiService";
import SubEmployee from "../../components/subEmployee/SubEmployee";
import { useLocation } from "react-router-dom";
import FileSaver from "file-saver";

function EmployeeProfile() {
  // console.log(props.data);
  const [data, setData] = useState({});
  const [client, setClient] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");
  const [fName, setFName] = useState("");
  const [allowanceData, setAllowanceData] = useState();

  const location = useLocation();
  const [enhancedFields, setEnhancedFields] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

  return (
    <>
      <div id="" className="container-sm">
        <div
          class="p-3 mb-2 bg-primary text-white"
          style={{ color: "#1492E6" }}
        >
          EMPLOYEE PROFILE
        </div>

        {status && <p className="text-success mb-1">loading...</p>}
        <p className="text-danger">{msg}</p>
        {!status && (
          <Form onSubmit={handleSubmit}>
            <Row xs="auto">
              {/* <Col>
                <div id="">
                

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="employeeId">
                      <b>Employee ID</b>
                    </Form.Label>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="firstName">
                      <b>First Name</b>
                    </Form.Label>
                    <Form.Control
                      name="firstName"
                      id="firstName"
                      required
                      type="text"
                      placeholder=""
                      disabled={disabled ? "" : "disabled"}
                      defaultValue={data.detailsResponse?.firstName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="lastName">
                      <b>Last Name</b>
                    </Form.Label>
                    <Form.Control
                      name="lastName"
                      id="lastName"
                      required
                      type="text"
                      placeholder=""
                      disabled={disabled ? "" : "disabled"}
                      defaultValue={data.detailsResponse?.lastName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="joiningDate">
                      <b>Joining Date</b>
                    </Form.Label>
                    <Form.Control
                      name="joiningDate"
                      id="joiningDate"
                      required
                      type="text"
                      placeholder=""
                      disabled={disabled ? "" : "disabled"}
                      setClient
                      defaultValue={data.detailsResponse?.joiningDate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="email">
                      <b>Email</b>
                    </Form.Label>
                    <Form.Control
                      name="email"
                      id="email"
                    
                      required
                      type="email"
                      placeholder=""
                      disabled={disabled ? "" : "disabled"}
                      defaultValue={data.detailsResponse?.email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="dateOfBirth">
                      <b>Date Of Birth</b>
                    </Form.Label>
                    <Form.Control
                      name="dob"
                      id="dateOfBirth"
                      required
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      defaultValue={data.detailsResponse?.dob}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="gender">
                      <b>Gender</b>
                    </Form.Label>
                    <Form.Control
                      name="gender"
                      id="gender"
                      required
                      type="text"
                      placeholder=""
                      disabled={disabled ? "" : "disabled"}
                      defaultValue={data.detailsResponse?.gender}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="employeeType">
                      <b>Employee Type</b>
                    </Form.Label>
                    <Form.Control
                      name="employeeType"
                      id="employeeType"
                      required
                      type="text"
                      placeholder=""
                      disabled={disabled ? "" : "disabled"}
                      defaultValue={data.detailsResponse?.employeeType}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="location">
                      <b>Location</b>
                    </Form.Label>
                    <Form.Control
                      name="location"
                      id="location"
                      required
                      type="text"
                      placeholder=""
                      disabled={disabled ? "" : "disabled"}
                      defaultValue={data.detailsResponse?.location}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="subDepartName">
                      <b>Sub Department Name</b>
                    </Form.Label>
                    <Form.Control
                      name="subDepartName"
                      id="subDepartName"
                      required
                      type="text"
                      placeholder=""
                      disabled={disabled ? "" : "disabled"}
                      defaultValue={data.detailsResponse?.subDepartName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="designation">
                      <b>Designation</b>
                    </Form.Label>
                    <Form.Control
                      name="designation"
                      id="designation"
                      required
                      type="text"
                      placeholder=""
                      disabled={disabled ? "" : "disabled"}
                      defaultValue={data.detailsResponse?.designation}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="location">
                      <b>Department</b>
                    </Form.Label>
                    <Form.Control
                      name="depart"
                      id="depart"
                      required
                      type="text"
                      placeholder=""
                      disabled={disabled ? "" : "disabled"}
                      defaultValue={data.detailsResponse?.department}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
              </Col> */}
              {/* <Col>
                <div id="modelSection">
                  {data.internalExpenses?.map((ip) => (
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="benchTenure">
                        <b>Total No Of Days</b>
                      </Form.Label>
                      <Form.Control
                        disabled
                        id="benchTenure"
                        type="number"
                        name="benchTenure"
                        defaultValue={ip.benchTenure}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  ))}
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="phone number">
                      <b>Phone Number</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="phone number"
                      type="tel"
                      disabled={disabled ? "" : "disabled"}
                      // pattern="[+91][0-9]{13}"
                      // pattern="[0-9]{10}"
                      message="please enter correct number"
                      placeholder=""
                      name="phoneNo"
                      title="enter phone number like +919999999999"
                      defaultValue={data.detailsResponse?.phoneNo}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="salary">
                      <b>Salary</b>
                    </Form.Label>
                    <Form.Control
                      required
                      disabled={disabled ? "" : "enabled"}
                      id="salary"
                      type="text"
                      placeholder=""
                      name="salary"
                      title="enter salary"
                      defaultValue={data.salary}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  {data.addres?.map((it) => (
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="firstName">
                        <b>Country</b>
                      </Form.Label>
                      <Form.Control
                        name="country"
                        id="country"
                        required
                        type="text"
                        placeholder=""
                        disabled={disabled ? "" : "disabled"}
                        defaultValue={it.country}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  ))}
                  {data.addres?.map((it) => (
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="state">
                        <b>State</b>
                      </Form.Label>
                      <Form.Control
                        name="state"
                        id="state "
                        required
                        type="text"
                        placeholder=""
                        disabled={disabled ? "" : "disabled"}
                        onChange={handleChange}
                        defaultValue={it.state}
                      />
                    </Form.Group>
                  ))}{" "}
                  {data.addres?.map((it) => (
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="city">
                        <b>City</b>
                      </Form.Label>
                      <Form.Control
                        disabled
                        id="city"
                        type="text"
                        name="city"
                        placeholder=""
                        // disabled={disabled ? "" : "disabled"}
                        defaultValue={it.city}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    // {it.city}
                  ))}
                  {data.addres?.map((it) => (
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="street">
                        <b>Street</b>
                      </Form.Label>
                      <Form.Control
                        name="street"
                        id="street"
                        enable
                        required
                        type="text"
                        placeholder=""
                        disabled={disabled ? "" : "disabled"}
                        defaultValue={it.street}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  ))}
                  {data.addres?.map((it) => (
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="zipCode">
                        <b>Pincode</b>
                      </Form.Label>
                      <Form.Control
                        name="zipCod"
                        id="zipCod"
                        required
                        type="number"
                        placeholder=""
                        disabled={disabled ? "" : "disabled"}
                        defaultValue={it.zipCod}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  ))}
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="lastStatus">
                      <b>Last Status</b>
                    </Form.Label>
                    <Form.Control
                      required
                      disabled={disabled ? "" : "enabled"}
                      id="lastStatus"
                      type="text"
                      placeholder="Enter Status"
                      name="lastStatus"
                      title="enter lastStatus"
                      defaultValue={data.lastStatus}
                      // onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="releasedDate">
                      <b>Released Date</b>
                    </Form.Label>
                    <Form.Control
                      required
                      disabled={disabled ? "" : "enabled"}
                      id="releasedDate"
                      type="text"
                      placeholder="Enter releasedDate"
                      name="releasedDate"
                      title="enter releasedDate"
                      defaultValue={data.releasedDate}
                      // onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="releasedDate">
                      <b>Exit Type</b>
                    </Form.Label>
                    <Form.Control
                      required
                      disabled={disabled ? "" : "enabled"}
                      id="exitType"
                      type="text"
                      placeholder="Enter exitType"
                      name="exitType"
                      title="enter exitType"
                      defaultValue={data.exitType}
                      // onChange={handleChange}
                    />
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="releasedDate">
                        <b>Technology1</b>
                      </Form.Label>
                      <Form.Control
                        required
                        disabled={disabled ? "" : "enabled"}
                        id="technology"
                        type="text"
                        placeholder="Enter technology"
                        name="technology"
                        title="enter technology"
                        defaultValue={data.detailsResponse?.technology1}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="technology2">
                        <b>Technology2</b>
                      </Form.Label>
                      <Form.Control
                        required
                        disabled={disabled ? "" : "enabled"}
                        id="technology2"
                        type="text"
                        placeholder="Enter technology"
                        name="technology2"
                        title="enter technology2"
                        defaultValue={data.detailsResponse?.technology2}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <br />

                    <b>Resume Download</b>
                    <br />
                    <button className="buttonDownload" onClick={handleResume}>
                      <a className="button" href="" download={fName}>
                        Download Resume
                      </a>
                    </button>
                  </Form.Group>
                </div>
              </Col> */}
              <Col>
                {/* <div id="modelSection" className="container-sm ">
                  
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="BrInr">
                      <b>BR INR</b>
                    </Form.Label>
                    <Form.Control
                      disabled
                      id="BrInr"
                      type="number"
                      name="BrInr"
                      // defaultValue={ipt.br_INR}
                      defaultValue={enhancedFields?.br_INR}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="BrUsd">
                      <b>BR USD</b>
                    </Form.Label>
                    <Form.Control
                      disabled
                      id="BrUsd"
                      type="text"
                      name="BrUsd"
                      defaultValue={enhancedFields?.br_USD}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="PrInr">
                      <b>PR INR</b>
                    </Form.Label>
                    <Form.Control
                      disabled
                      id="PrInr"
                      type="text"
                      name="PrInr"
                      defaultValue={enhancedFields?.pr_INR}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="PrUsd">
                      <b>PR USD</b>
                    </Form.Label>
                    <Form.Control
                      disabled
                      id="PrUsd"
                      type="text"
                      name="PrUsd"
                      defaultValue={enhancedFields?.pr_USD}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="GpmInr">
                      <b>GPM INR</b>
                    </Form.Label>
                    <Form.Control
                      disabled
                      id="GpmInr"
                      type="text"
                      name="GpmInr"
                      defaultValue={enhancedFields?.gpm_USD}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="GpmUsd">
                      <b>GPM USD</b>
                    </Form.Label>
                    <Form.Control
                      disabled
                      id="GpmUsd"
                      type="text"
                      name="GpmUsd"
                      defaultValue={enhancedFields?.gpm_USD}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="GM">
                      <b>GM</b>
                    </Form.Label>
                    <Form.Control
                      disabled
                      id="gm"
                      type="text"
                      name="gm"
                      defaultValue={enhancedFields?.gm}
                    />
                  </Form.Group>
                </div> */}
              </Col>
              <Col>
                {/* <div id="modelSection" className="container-sm ">
                  <h5 className="modelHeading">Bill</h5>
                  <hr></hr>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="profitOrLoss">
                      <b>AllClientsEarning</b>
                    </Form.Label>
                    <Form.Control
                      disabled
                      id="allClientsEarning"
                      type="text"
                      name="allClientsEarning"
                      defaultValue={data.allClientsEarning}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="benchTillNow">
                      <b>Bench Salary Paid Till Now</b>
                    </Form.Label>
                    <Form.Control
                      name="benchTillNow"
                      id="benchTillNow"
                      required
                      type="text"
                      placeholder=""
                      disabled
                      defaultValue={enhancedFields?.benchPay}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="daysonbench">
                      <b>Days on Bench</b>
                    </Form.Label>
                    <Form.Control
                      name="daysonbench"
                      id="daysonbench"
                      required
                      type="text"
                      placeholder=""
                      disabled
                      defaultValue={enhancedFields?.daysOnBench}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  {data.internalExpenses?.map((ip) => (
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="paidTillNow">
                        <b>Total Salary Paid Till Now</b>
                      </Form.Label>
                      <Form.Control
                        name="paidTillNow"
                        id="paidTillNow"
                        required
                        type="text"
                        placeholder=""
                        disabled
                        defaultValue={ip.totalSalPaidTillNow}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  ))}

                  {data.internalExpenses?.map((ip) => (
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="totalExpenses">
                        <b>Total Expences</b>
                      </Form.Label>
                      <Form.Control
                        disabled
                        id="totalExpenses"
                        type="text"
                        name="totalExpenses"
                        placeholder=""
                        defaultValue={ip.totalExpenses}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  ))}
                  {data.internalExpenses?.map((ip) => (
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="profitOrLoss">
                        <b>Profit/Loss</b>
                      </Form.Label>
                      <Form.Control
                        disabled
                        id="profitOrLoss"
                        type="text"
                        name="profitOrLoss"
                        defaultValue={ip.profitOrLoss}
                      />
                    </Form.Group>
                  ))}
                 
                  <SubEmployee id={location.state.empId} />
                </div> */}
                {/* <Row xs="auto">
                  <Col>
                    {data.atClientAllowances?.map((allowanceData, index) => (
                      <div id="modelSection" key={index} className="container ">
                        <h5 className="modelHeading">Allowance {index + 1}</h5>
                        <hr></hr>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="ShiftAllowance">
                            <b>Shift Allowance</b>
                          </Form.Label>
                          <Form.Control
                            // required
                            id="ShiftAllowance"
                            type="text"
                            disabled={disabled ? "" : "disabled"}
                            placeholder=""
                            name="ShiftAllowance"
                            title="enter Total ShiftAllowance"
                            defaultValue={allowanceData.shiftAllowance}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="workMode">
                            <b>Special Allowance</b>
                          </Form.Label>
                          <Form.Control
                            // required
                            id="specialAllowance"
                            type="text"
                            disabled={disabled ? "" : "disabled"}
                            placeholder=""
                            name="specialAllowance"
                            title="enter specialAllowance"
                            defaultValue={allowanceData.specialAllowance}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="joingBonus">
                            <b>Joining Bonus</b>
                          </Form.Label>
                          <Form.Control
                            // required
                            id="joingBonus"
                            type="text"
                            disabled={disabled ? "" : "disabled"}
                            placeholder=""
                            name="joingBonus"
                            title="enter joingBonus"
                            defaultValue={allowanceData.joingBonus}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="joiningBonusTenure">
                            <b>Joining Bonus Tenure</b>
                          </Form.Label>
                          <Form.Control
                            // required
                            id="joiningBonusTenure"
                            type="text"
                            disabled={disabled ? "" : "disabled"}
                            placeholder=""
                            name="joiningBonusTenure"
                            title="enter joiningBonusTenure"
                            defaultValue={allowanceData.joiningBonusTenure}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="deputationAllowances">
                            <b>Deputation Allowances</b>
                          </Form.Label>
                          <Form.Control
                            // required
                            id="deputationAllowances "
                            type="text"
                            disabled={disabled ? "" : "disabled"}
                            placeholder=""
                            name="deputationAllowances "
                            title="enter deputationAllowances"
                            defaultValue={allowanceData.deputationAllowances}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="extraAllowance">
                            <b>Extra Allowance</b>
                          </Form.Label>
                          <Form.Control
                            // required
                            id="extraAllowance"
                            type="text"
                            disabled={disabled ? "" : "disabled"}
                            placeholder=""
                            name="extraAllowance"
                            title="enter extraAllowance"
                            defaultValue={allowanceData.extraAllowance}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </div>
                    ))}
                  </Col>
                </Row> */}
              </Col>
            </Row>

            {/* <Row xs="auto">
              {data.employeeAtClientsDetails?.map((client, index) => (
                <div id="modelSection" key={index} className="container ">
                  <h5 className="modelHeading">Client {index + 1}</h5>
                  <hr></hr>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="clientsNames">
                      <b>Client Name</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="clients"
                      disabled={disabled ? "" : "disabled"}
                      type="text"
                      placeholder=""
                      name="clients"
                      title="enter client name"
                      defaultValue={client.clients}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="clientLocation">
                      <b>Client Location</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="clientLocation"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="clientLocation"
                      title="enter clientLocation"
                      defaultValue={client.clientLocation}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="workMode">
                      <b>Work Mode</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="workMode"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="workMode"
                      title="enter workMode"
                      defaultValue={client.workMode}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="totalEarningAtclient">
                      <b>Client Email</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="clientEmail"
                      type="email"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="clientEmail"
                      title="enter client mail"
                      defaultValue={client.clientEmail}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="totalEarningAtclient">
                      <b>Client Manager Name</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="clientManagerName"
                      type="email"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="clientManagerName"
                      title="enter client Manager Name"
                      defaultValue={client.clientManagerName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="clientSalary">
                      <b>Client Salary</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="clientSalary"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="totalEarningAtclient"
                      title="enter Total Client billing"
                      defaultValue={client.clientSalary}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="podate">
                      <b>PO Date</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="podate"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="podate"
                      title="enter podate"
                      defaultValue={client.podate}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="poSdate">
                      <b>PO Start Date</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="poSdate"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="poSdate"
                      title="enter PO Start date"
                      defaultValue={client.posdate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="poEdate">
                      <b>PO End Date</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="poEdate"
                      disabled={disabled ? "" : "disabled"}
                      type="text"
                      placeholder=""
                      name="poEdate"
                      title=""
                      defaultValue={client.poedate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="offerReleaseDate">
                      <b>Offer Release Date</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="offerReleaseDate "
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="offerReleaseDate "
                      title="enter offerReleaseDate "
                      defaultValue={client.offerReleaseDate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="clientJoiningDate">
                      <b>Client Joining Date</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="clientJoiningDate "
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="clientJoiningDate "
                      title="enter clientJoiningDate "
                      defaultValue={client.clientJoiningDate}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="desgAtClient">
                      <b>Designation At Client</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="desgAtClient"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="desgAtClient"
                      title="enter designation"
                      defaultValue={client.desgAtClient}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="skillSet">
                      <b>Skill Set</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="skillSet"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="skillSet"
                      title="enter skillSet"
                      defaultValue={client.skillSet}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="subcontractor">
                      <b>SubContractor</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="subcontractor"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="subcontractor"
                      title="enter subcontractor"
                      defaultValue={client.subContractor}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="towerHead">
                      <b>Tower Head</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="towerHead"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="towerHead"
                      title="enter towerHead"
                      defaultValue={client.towerHead}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="towerLead">
                      <b>Tower Lead</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="towerLead"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="towerLead"
                      title="enter towerLead"
                      defaultValue={client.towerLead}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="recruiter">
                      <b>Recruiter</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="recruiter"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="recruiter"
                      title="enter recruiter"
                      defaultValue={client.recruiter}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="ClientLastWorkingDate">
                      <b>Client Last Working Date</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="clientLastWorkingDate "
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="clientLastWorkingDate "
                      title="enter clientLastWorkingDate "
                      defaultValue={client.clientLastWorkingDate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="lancesoftLastWorkingDate">
                      <b>Lancesoft Last Working Date</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="lancesoftLastWorkingDate "
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="lancesoftLastWorkingDate "
                      title="enter lancesoftLastWorkingDate "
                      defaultValue={client.lancesoftLastWorkingDate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="totalEarningAtclient">
                      <b>Client Tenure</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="clientTenure"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="clientTenure"
                      title="enter clientTenure"
                      defaultValue={client.clientTenure}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="totalEarningAtclient">
                      <b>Total Billing At Client</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="totalEarningAtClient"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="totalEarningAtClient"
                      title="enter Total Client billing"
                      defaultValue={client.totalEarningAtClient}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="povalue">
                      <b>PO Value</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="povalue"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="povalue"
                      title="enter povalue"
                      defaultValue={client.povalue}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="ponumber">
                      <b>PO Number</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="ponumber"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="ponumber"
                      title="enter ponumber"
                      defaultValue={client.ponumber}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="totalEarningAtclient">
                      <b>IGST</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="igst"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="igst"
                      title="enter igst number"
                      defaultValue={client.igst}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="cgst">
                      <b>CGST</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="cgst"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="cgst"
                      title="enter cgst number"
                      defaultValue={client.cgst}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="totalEarningAtclient">
                      <b>SGST</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="sgst"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="sgst"
                      title="enter sgst number"
                      defaultValue={client.sgst}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="totalTax">
                      <b>Total Tax</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="totalTax"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="totalTax"
                      title="enter totalTax"
                      defaultValue={client.totalTax}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
              ))}
            </Row> */}
          </Form>
        )}
      </div>
    </>
  );
}
export default EmployeeProfile;
