import React, { Fragment } from "react";
import { useState } from "react";
import { Button, Modal, Col, Row, Form, FormGroup } from "react-bootstrap";
// import moment from "moment";
import "./modelComponent.css";
import { useEffect } from "react";
import ApiService from "../services/ApiService";
import SubEmployee from "../components/subEmployee/SubEmployee";

function ModelComponent(props) {
  // console.log(props.data);
  const [data, setData] = useState({});
  const [client, setClient] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(data);
  };

  // const handleEdit = () => {
  //   setDisabled(true);
  // };
  const handleClose = () => {
    props.onHide();
    setData("");
  };

  useEffect(() => {
    if (props.show && props.data) {
      setStatus(true);
      console.log(props);
      console.log(data);
      ApiService.getEmployeeById(props.data)
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

      ApiService.getAllClientsByEmpId(props.data)
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
  }, [props.data, props.show]);

  return (
    <>
      <Modal
        show={props.show}
        size={
          ["lead", "Consultant"].includes(data.detailsResponse?.designation)
            ? "xl"
            : "lg"
        }
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter" className="title">
            Employee Profile
          </Modal.Title>
          <Button className="btnClose" onClick={handleClose}>
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          {status && <p className="text-success mb-1">loading...</p>}
          <p className="text-danger">{msg}</p>
          {!status && (
            <Form onSubmit={handleSubmit}>
              <Row xs="auto">
                <Col>
                  <div id="modelSection">
                    <h5 className="modelHeading">Employee Details</h5>
                    <hr></hr>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="employeeId">
                        <b>Employee ID</b>
                      </Form.Label>
                      <Form.Control
                        name="employeeId"
                        id="employeeId"
                        required
                        disabled={disabled ? "" : "disabled"}
                        type="text"
                        placeholder=""
                        defaultValue={data.detailsResponse?.employeeId}
                        onChange={handleChange}
                      />
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
                        type="date"
                        placeholder=""
                        disabled={disabled ? "" : "disabled"}
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
                        // autoComplete="email"
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
                        type="date"
                        disabled={disabled ? "" : "disabled"}
                        defaultValue={data.detailsResponse?.dob}
                        // moment(
                        //   data.detailsResponse?.dob
                        // ).format("YYYY-MM-DD")
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

                    {/* <Form.Group className="mb-3 checkbox">
                <Form.Label>Gender : </Form.Label>{" "}
                <Form.Check
                  required
                  inline
                  label="Male"
                  name="gender"
                  type="radio"
                  defaultValue={data.gender}
                  onChange={(e) => {
                    data.gender = "Male";
                  }}
                />
                <Form.Check
                  inline
                  label="Female"
                  name="gender"
                  type="radio"
                  defaultValue={data.gender}
                  onChange={(e) => {
                    data.gender = "Female";
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="phone number">Phone Number</Form.Label>
                <Form.Control
                  // required
                  id="phone number"
                  type="tel"
                  disabled={disabled ? "" : "disabled"}
                  // pattern="[+91][0-9]{13}"
                  // pattern="[0-9]{10}"
                  message="please enter correct number"
                  placeholder="please enter phone number"
                  name="phoneNo"
                  // placeholder="+919999999999"
                  // pattern="[+91][0-9].{11}"
                  // maxLength={13}
                  title="enter phone number like +919999999999"
                  defaultValue={data.phoneNo}
                  onChange={handleChange}
                />
              </Form.Group> */}

                    {/* <Form.Group className="mb-3">
                  <Form.Label htmlFor="practice">Practice</Form.Label>
                  <Form.Control
                    required
                    disabled={disabled ? "" : "disabled"}
                    id="practice"
                    type="text"
                    placeholder="please enter practice"
                    name="practice"
                    title="enter salary"
                    defaultValue={data.practice}
                    onChange={handleChange}
                  />
                </Form.Group> */}
                    {/* <Form.Group className="mb-3">
                  <Form.Label htmlFor="designationAtLs">
                    Designation at Lancesoft
                  </Form.Label>
                  <Form.Control
                    required
                    disabled={disabled ? "" : "disabled"}
                    id="designationAtLs"
                    type="text"
                    placeholder="please enter designation at Lancesoft"
                    name="designationAtLs"
                    title="enter designation"
                    defaultValue={data.designationAtLs}
                    onChange={handleChange}
                  />
                </Form.Group> */}

                    {/* <Form.Group className="mb-3">
                  <Form.Label htmlFor="tenure">Tenure</Form.Label>
                  <Form.Control
                    disabled
                    id="tenure"
                    type="text"
                    name="tenure"
                    defaultValue={data.internalExpenses?.tenure}
                    // onChange={handleChange}
                  />
                </Form.Group> */}
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
                    {/* <Form.Group className="mb-3">
                      <Form.Label htmlFor="status">Status</Form.Label>
                      <Form.Control
                        name="status"
                        id="status"
                        required
                        type="text"
                        placeholder="status"
                        disabled={disabled ? "" : "disabled"}
                        defaultValue={data.detailsResponse?.status}
                        onChange={handleChange}
                      />
                    </Form.Group> */}

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
                    {/* <Form.Group className="mb-3">
                      <Form.Label htmlFor="vertical">vertical</Form.Label>
                      <Form.Control
                        name="vertical"
                        id="vertical"
                        required
                        type="text"
                        placeholder="enter vertical"
                        disabled={disabled ? "" : "disabled"}
                        defaultValue={data.detailsResponse?.vertical}
                        onChange={handleChange}
                      />
                    </Form.Group> */}
                  </div>
                </Col>
                <Col>
                  <div id="modelSection">
                    {data.internalExpenses?.map((ip) => (
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="benchTenure">
                          <b>Bench Tenure</b>
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
                        type="number"
                        placeholder=""
                        name="salary"
                        title="enter salary"
                        defaultValue={data.salary}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    {/* <Form.Group className="mb-3">
                      <Form.Label htmlFor="employeeId">
                        Reporting Person
                      </Form.Label>
                      <Form.Control
                        name="reportingperson"
                        id="reportingperson"
                        required
                        disabled={disabled ? "" : "disabled"}
                        type="text"
                        placeholder="Enter reportingperson"
                        defaultValue={
                          data.detailsResponse?.reportingperson
                        }
                        onChange={handleChange}
                      />
                    </Form.Group> */}
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
                    {/* <Form.Group className="mb-3">
                    //   <Form.Label htmlFor="city">city</Form.Label>
                    //   <Form.Control
                    //     disabled
                    //     id="city"
                    //     type="text"
                    //     name="city"
                    //     placeholder="please enter city name"
                    //     // defaultValue={it.city}
                    //     onChange={handleChange}
                    //   />
                    // </Form.Group> */}
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
                    {/* {data.detailsResponse?.map((it) => ( */}
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="status">
                        <b>status</b>
                      </Form.Label>
                      <Form.Control
                        name="status"
                        id="status"
                        required
                        type="text"
                        placeholder=""
                        disabled={disabled ? "" : "disabled"}
                        defaultValue={data.detailsResponse?.status}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    {/* <orm.Group className="mb-3 checkbox">
                <Form.Label>Gender : </Form.Label>{" "}
                <Form.Check
                  required
                  inline
                  label="Male"
                  name="gender"
                  type="radio"
                  defaultValue={data.gender}
                  onChange={(e) => {
                    data.gender = "Male";
                  }}
                />
                <Form.Check
                  inline
                  label="Female"
                  name="gender"
                  type="radio"
                  defaultValue={data.gender}
                  onChange={(e) => {
                    data.gender = "Female";
                  }}
                />
              </orm.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="phone number">Phone Number</Form.Label>
                <Form.Control
                  // required
                  id="phone number"
                  type="tel"
                  disabled={disabled ? "" : "disabled"}
                  // pattern="[+91][0-9]{13}"
                  // pattern="[0-9]{10}"
                  message="please enter correct number"
                  placeholder="please enter phone number"
                  name="phoneNo"
                  // placeholder="+919999999999"
                  // pattern="[+91][0-9].{11}"
                  // maxLength={13}
                  title="enter phone number like +919999999999"
                  defaultValue={data.phoneNo}
                  onChange={handleChange}
                />
              </Form.Group> */}
                    {/* <Form.Group className="mb-3">
                  <Form.Label htmlFor="practice">Practice</Form.Label>
                  <Form.Control
                    required
                    disabled={disabled ? "" : "disabled"}
                    id="practice"
                    type="text"
                    placeholder="please enter practice"
                    name="practice"
                    title="enter salary"
                    defaultValue={data.practice}
                    onChange={handleChange}
                  />
                </Form.Group> */}
                    {/* <Form.Group className="mb-3">
                  <Form.Label htmlFor="designationAtLs">
                    Designation at Lancesoft
                  </Form.Label>
                  <Form.Control
                    required
                    disabled={disabled ? "" : "disabled"}
                    id="designationAtLs"
                    type="text"
                    placeholder="please enter designation at Lancesoft"
                    name="designationAtLs"
                    title="enter designation"
                    defaultValue={data.designationAtLs}
                    onChange={handleChange}
                  />
                </Form.Group> */}
                    {/* <Form.Group className="mb-3">
                  <Form.Label htmlFor="tenure">Tenure</Form.Label>
                  <Form.Control
                    disabled
                    id="tenure"
                    type="text"
                    name="tenure"
                    defaultValue={data.internalExpenses?.tenure}
                    // onChange={handleChange}
                  />

                </Form.Group> */}
                    {/* {data.addres?.map((it) => (
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="addressId">AddressId</Form.Label>
                        <Form.Control
                          name="addressId"
                          id="addressId"
                          required
                          type="text"
                          placeholder="enter addressId "
                          disabled={disabled ? "" : "disabled"}
                          defaultValue={it.addressId}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    ))} */}
                    {/* <Form.Group className="mb-3">
                      <Form.Label htmlFor="designation">
                        Working Internal
                      </Form.Label>
                      <Form.Control
                        name="WorkingInternal"
                        id="WorkingInternal"
                        required
                        type="text"
                        placeholder="status"
                        disabled={disabled ? "" : "disabled"}
                        defaultValue={data.detailsResponse?.WorkingInternal}
                        onChange={handleChange}
                      />
                    </Form.Group> */}
                  </div>
                </Col>

                {/* <Col>
                  <div id="modelSection">
                    <h5 className="modelHeading">Client Details</h5>
                    <hr></hr>
                    {data.employeeAtClientsDetails?.map((ir) => (
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="desgAtClient">
                          Designation at Client
                        </Form.Label>
                        <Form.Control
                          // required
                          id="desgAtClient"
                          type="text"
                          // disabled={disabled ? "" : "disabled"}
                          placeholder="please enter designation at Client"
                          name="desgAtClient"
                          title="enter designation"
                          defaultValue={ir.desgAtClient}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    ))}
                    {data.employeeAtClientsDetails?.map((ir) => (
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="clientsNames">
                          Client Name
                        </Form.Label>
                        <Form.Control
                          // required
                          id="clientsNames"
                          // disabled={disabled ? "" : "disabled"}
                          type="text"
                          placeholder="please enter Client name"
                          name="clientsNames"
                          title="enter client name"
                          defaultValue={ir.clients.clientsNames}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    ))}
                    {data.employeeAtClientsDetails?.map((ir) => (
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="clientSalary">
                          Client Salary
                        </Form.Label>
                        <Form.Control
                          // required
                          id="clientSalary"
                          type="number"
                          // disabled={disabled ? "" : "disabled"}
                          placeholder="please enter Client salary"
                          name="totalEarningAtclient"
                          title="enter Total Client billing"
                          defaultValue={ir.clientSalary}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    ))}
                    {data.employeeAtClientsDetails?.map((ir) => (
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="poEdate">PO Start date</Form.Label>
                        <Form.Control
                          // required
                          id="poSdate"
                          // disabled=""
                          type="text"
                          placeholder="Present"
                          name="poSdate"
                          title="enter PO start date"
                          defaultValue={ir.posdate}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    ))}
                    {data.employeeAtClientsDetails?.map((ir) => (
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="poEdate">PO End date</Form.Label>
                        <Form.Control
                          // required
                          id="poEdate"
                          // disabled={disabled ? "" : "disabled"}
                          type="text"
                          placeholder="Present"
                          name="poEdate"
                          title="enter PO End date"
                          defaultValue={ir.poedate}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    ))}
                    {data.employeeAtClientsDetails?.map((ir) => (
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="totalEarningAtclient">
                          Client email
                        </Form.Label>
                        <Form.Control
                          // required
                          id="clientEmail"
                          type="email"
                          // disabled={disabled ? "" : "disabled"}
                          placeholder="please enter Client mail"
                          name="clientEmail"
                          title="enter client mail"
                          defaultValue={ir.clientEmail}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    ))}
                    {data.employeeAtClientsDetails?.map((ir) => (
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="totalEarningAtclient">
                          Client Manager Name
                        </Form.Label>
                        <Form.Control
                          // required
                          id="clientManagerName"
                          type="email"
                          // disabled={disabled ? "" : "disabled"}
                          placeholder="please enter client Manager Name"
                          name="clientManagerName"
                          title="enter client Manager Name"
                          defaultValue={ir.clientManagerName}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    ))}
                  </div>
                </Col> */}

                <Col>
                  {/* {["lead", "Consultant"].includes( */}
                  {/* data.employeeDetailsResponse?.designation
                  ) && ( */}
                  {/* <> */}
                  {data.employeeAtClientsDetails?.map((client, index) => (
                    <div
                      id="modelSection"
                      key={index}
                      className="container-sm "
                    >
                      <h5 className="modelHeading">Client {index + 1}</h5>
                      <hr></hr>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="desgAtClient">
                          <b>Designation at Client</b>
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
                        <Form.Label htmlFor="clientsNames">
                          <b>Client Name</b>
                        </Form.Label>
                        <Form.Control
                          // required
                          id="clientsNames"
                          disabled={disabled ? "" : "disabled"}
                          type="text"
                          placeholder=""
                          name="clientsNames"
                          title="enter client name"
                          defaultValue={client.clients?.clientsNames}
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
                          type="number"
                          disabled={disabled ? "" : "disabled"}
                          placeholder=""
                          name="totalEarningAtclient"
                          title="enter Total Client billing"
                          defaultValue={client.clientSalary}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="totalEarningAtclient">
                          <b>Total Billing at Client</b>
                        </Form.Label>
                        <Form.Control
                          // required
                          id="totalEarningAtclient"
                          type="number"
                          disabled={disabled ? "" : "disabled"}
                          placeholder=""
                          name="totalEarningAtclient"
                          title="enter Total Client billing"
                          defaultValue={client.totalEarningAtclient}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="poSdate">
                          <b>PO Start date</b>
                        </Form.Label>
                        <Form.Control
                          // required
                          id="poSdate"
                          type="date"
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
                          <b>PO end date</b>
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
                    </div>
                  ))}
                  {/* </> */}
                  {/* )}
                  </div> */}
                </Col>

                <Col
                // className={
                //   ["lead", "Consultant"].includes(
                //     data.detailsResponse?.designation
                //   )
                //     ? "break"
                //     : ""
                // }
                >
                  {/* {["lead", "Consultant"].includes(
                  data.detailsResponse?.designation
                ) && (

                )} */}
                  <div id="modelSection" className="container-sm ">
                    <h5 className="modelHeading">Bill</h5>
                    <hr></hr>
                    {/* <Form.Group className="mb-3">
                      <Form.Label htmlFor="paidTillNow">
                        Total salary paid till now
                      </Form.Label>
                      <Form.Control
                        disabled
                        id="paidTillNow"
                        type="text"
                        name="paidTillNow"
                        defaultValue={
                          data.internalExpenses?.totalSalPaidTillNow
                        }
                        onChange={handleChange}
                      />
                    </Form.Group> */}

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

                    {/* <Form.Group className="mb-3">
                      <Form.Label htmlFor="cubicleCost">
                        Cubical cost
                      </Form.Label>
                      <Form.Control
                        required
                        disabled={disabled ? "" : "disabled"}
                        id="cubicleCost"
                        type="number"
                        placeholder="please enter cubical cost"
                        name="cubicleCost"
                        title="enter Cubical cost"
                        defaultValue={data.internalExpenses?.cubicleCost}
                        onChange={handleChange}
                      />
                    </Form.Group> */}
                    {/* <Form.Group className="mb-3">
                      <Form.Label htmlFor="foodCost">Food Cost</Form.Label>
                      <Form.Control
                        required
                        id="foodCost"
                        disabled={disabled ? "" : "disabled"}
                        type="number"
                        placeholder="please enter food Cost"
                        name="foodCost"
                        title="enter food Cost"
                        defaultValue={data.internalExpenses?.foodCost}
                        onChange={handleChange}
                      />
                    </Form.Group> */}
                    {/* <Form.Group className="mb-3">
                      <Form.Label htmlFor="transportationCost">
                        Transport Cost
                      </Form.Label>
                      <Form.Control
                        required
                        id="transportationCost"
                        type="number"
                        disabled={disabled ? "" : "disabled"}
                        placeholder="please enter Transport Cost"
                        name="transportationCost"
                        title="enter Transport Cost"
                        defaultValue={data.internalExpenses?.transportationCost}
                        onChange={handleChange}
                      />
                    </Form.Group> */}
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

                    {/* {disabled ? (
                  <Button className="btn-signup" type="submit">
                    Submit
                  </Button>
                ) : ["md"].includes(props.type) ? (
                  <Button className="btn-signup" type="submit">
                    Transfer
                  </Button>
                ) : (//

                  <Button
                    className="btn-signup"
                    onClick={handleEdit}
                     type="submit"
                  >
                    Edit
                  </Button>
                  //
                )}{" "}
                <Button variant="danger" onClick={() => setDisabled(false)}>
                  Cancel
                </Button> */}

                    <SubEmployee id={props.data} />
                  </div>
                </Col>
              </Row>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModelComponent;
