import React from "react";
import { useState } from "react";
import { Button, Modal, Col, Row, Form } from "react-bootstrap";

import "./modelComponent.css";
import { useEffect } from "react";
import ApiService from "../../services/ApiService";
import SubEmployee from "../subEmployee/SubEmployee";

function EditComponent(props) {
 
  const [data, setData] = useState({});
  const [client, setClient] = useState({});
  const [enable, setenable] = useState(false);
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

  
  const handleClose = () => {
    props.onHide();
    setData("");
  };

  useEffect(() => {
    if (props.show && props.data) {
      setStatus(true);
      console.log(props);
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
                      <Form.Label htmlFor="employeeId">EmployeeID</Form.Label>
                      <Form.Control
                        name="employeeId"
                        id="employeeId"
                        required
                        enable={enable ? "" : "enable"}
                        type="text"
                        placeholder="Enter employeeId"
                        defaultValue={data.detailsResponse?.employeeId}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="firstName">
                        Employee first name
                      </Form.Label>
                      <Form.Control
                        name="firstName"
                        id="firstName"
                        required
                        type="text"
                        placeholder="enter firstName name"
                        enable={enable ? "" : "enable"}
                        defaultValue={data.detailsResponse?.firstName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="lastName">
                        Employee last name
                      </Form.Label>
                      <Form.Control
                        name="lastName"
                        id="lastName"
                        required
                        type="text"
                        placeholder="enter last name"
                        enable={enable ? "" : "enable"}
                        defaultValue={data.detailsResponse?.lastName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="joiningDate">
                        Joining date
                      </Form.Label>
                      <Form.Control
                        name="joiningDate"
                        id="joiningDate"
                        required
                        type="date"
                        placeholder="Enter joining Date"
                        enable={enable ? "" : "enable"}
                        defaultValue={data.detailsResponse?.joiningDate}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="email">Email</Form.Label>
                      <Form.Control
                        name="email"
                        id="email"
                        // autoComplete="email"
                        required
                        type="email"
                        placeholder="name@gmail.com"
                        enable={enable ? "" : "enable"}
                        defaultValue={data.detailsResponse?.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="dateOfBirth">
                        Date of Birth
                      </Form.Label>
                      <Form.Control
                        name="dob"
                        id="dateOfBirth"
                        required
                        type="date"
                        enable={enable ? "" : "enable"}
                        defaultValue={data.detailsResponse?.dob}
                        // moment(
                        //   data.detailsResponse?.dob
                        // ).format("YYYY-MM-DD")
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="gender">Gender</Form.Label>
                      <Form.Control
                        name="gender"
                        id="gender"
                        required
                        type="text"
                        placeholder="enter gender"
                        enable={enable ? "" : "enable"}
                        defaultValue={data.detailsResponse?.gender}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="employeeType">
                        Employee type
                      </Form.Label>
                      <Form.Control
                        name="employeeType"
                        id="employeeType"
                        required
                        type="text"
                        placeholder="enter employeeType"
                        enable={enable ? "" : "enable"}
                        defaultValue={data.detailsResponse?.employeeType}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="location">Location</Form.Label>
                      <Form.Control
                        name="location"
                        id="location"
                        required
                        type="text"
                        placeholder="enter location"
                        enable={enable ? "" : "enable"}
                        defaultValue={data.detailsResponse?.location}
                        onChange={handleChange}
                      />
                    </Form.Group>

                  
                  </div>
                </Col>
                <Col>
                  <div id="modelSection">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="benchTenure">
                        Bench Tenure
                      </Form.Label>
                      <Form.Control
                        enable
                        id="benchTenure"
                        type="text"
                        name="benchTenure"
                        defaultValue={data.internalExpenses?.benchTenure}
                        // onChange={handleChange}
                      />
                    </Form.Group>
                 
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="salary">Salary</Form.Label>
                      <Form.Control
                        required
                        enable={enable ? "" : "enabled"}
                        id="salary"
                        type="number"
                        placeholder="please enter salary"
                        name="salary"
                        title="enter salary"
                        defaultValue={data.salary}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  
                    {data.addres?.map((it) => (
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="firstName">Country</Form.Label>
                        <Form.Control
                          name="country"
                          id="country"
                          required
                          type="text"
                          placeholder="enter Country name"
                          enable={enable ? "" : "enable"}
                          defaultValue={it.country}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    ))}
                    {data.addres?.map((it) => (
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="state">state</Form.Label>
                        <Form.Control
                          name="state"
                          id="state "
                          required
                          type="text"
                          placeholder=""
                          enable={enable ? "" : "enable"}
                          onChange={handleChange}
                          defaultValue={it.state}
                        />
                      </Form.Group>
                    ))}{" "}
                   
                    {data.addres?.map((it) => (
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="city">city</Form.Label>
                        <Form.Control
                          enable
                          id="city"
                          type="text"
                          name="city"
                          placeholder="please enter city name"
                          // enable={enable ? "" : "enable"}
                          defaultValue={it.city}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      // {it.city}
                    ))}
                    {data.addres?.map((it) => (
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="employeeType">Street</Form.Label>
                        <Form.Control
                          name="street"
                          id="street"
                          enable
                          required
                          type="text"
                          placeholder=""
                          //   enable={enable ? "" : "enable"}
                          defaultValue={it.street}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    ))}
                    {data.addres?.map((it) => (
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="zipCode">zipCode</Form.Label>
                        <Form.Control
                          name="zipCod"
                          id="zipCod"
                          required
                          type="number"
                          placeholder="enter Zipcode"
                          enable={enable ? "" : "enable"}
                          defaultValue={it.zipCod}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    ))}
                   
                    {data.addres?.map((it) => (
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="addressId">AddressId</Form.Label>
                        <Form.Control
                          name="addressId"
                          id="addressId"
                          required
                          type="text"
                          placeholder="enter addressId "
                          enable={enable ? "" : "enable"}
                          defaultValue={it.addressId}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    ))}
                  
                  </div>
                </Col>
                <Col>
                  {["lead", "Consultant"].includes(
                    data.employeeDetailsResponse?.designation
                  ) && (
                    <>
                      {client?.map((client, index) => (
                        <div
                          id="modelSection"
                          key={index}
                          className="container-sm "
                        >
                          <h5 className="modelHeading">Client {index + 1}</h5>
                          <hr></hr>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="desgAtClient">
                              Designation at Client
                            </Form.Label>
                            <Form.Control
                              // required
                              id="desgAtClient"
                              type="text"
                              enable={enable ? "" : "enable"}
                              placeholder="please enter designation at Client"
                              name="desgAtClient"
                              title="enter designation"
                              defaultValue={client?.desgAtClient}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="clientsNames">
                              Client Name
                            </Form.Label>
                            <Form.Control
                              // required
                              id="clientsNames"
                              enable={enable ? "" : "enable"}
                              type="text"
                              placeholder="please enter Client name"
                              name="clientsNames"
                              title="enter client name"
                              defaultValue={client?.clients?.clientsNames}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="clientSalary">
                              Client Salary
                            </Form.Label>
                            <Form.Control
                              // required
                              id="clientSalary"
                              type="number"
                              enable={enable ? "" : "enable"}
                              placeholder="please enter Client salary"
                              name="totalEarningAtclient"
                              title="enter Total Client billing"
                              defaultValue={client?.clientSalary}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="totalEarningAtclient">
                              Total Billing at Client
                            </Form.Label>
                            <Form.Control
                              // required
                              id="totalEarningAtclient"
                              type="number"
                              enable={enable ? "" : "enable"}
                              placeholder="please enter Client salary"
                              name="totalEarningAtclient"
                              title="enter Total Client billing"
                              defaultValue={client?.totalEarningAtclient}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="poSdate">
                              PO Start date
                            </Form.Label>
                            <Form.Control
                              // required
                              id="poSdate"
                              type="date"
                              enable={enable ? "" : "enable"}
                              placeholder="please enter PO Start date"
                              name="poSdate"
                              title="enter PO Start date"
                              defaultValue={client?.posdate}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="poEdate">
                              PO end date
                            </Form.Label>
                            <Form.Control
                              // required
                              id="poEdate"
                              enable={enable ? "" : "enable"}
                              type="text"
                              placeholder="Present"
                              name="poEdate"
                              title="enter PO end date"
                              defaultValue={client?.poedate}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="totalEarningAtclient">
                              Client email
                            </Form.Label>
                            <Form.Control
                              // required
                              id="clientEmail"
                              type="email"
                              enable={enable ? "" : "enable"}
                              placeholder="please enter Client mail"
                              name="clientEmail"
                              title="enter client mail"
                              defaultValue={client?.clientEmail}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="totalEarningAtclient">
                              Client Manager Name
                            </Form.Label>
                            <Form.Control
                              // required
                              id="clientManagerName"
                              type="email"
                              enable={enable ? "" : "enable"}
                              placeholder="please enter client Manager Name"
                              name="clientManagerName"
                              title="enter client Manager Name"
                              defaultValue={client?.clientManagerName}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </div>
                      ))}
                    </>
                  )}
                  {/* </div> */}
                </Col>
                <Col
               >
                 
                  <div id="modelSection" className="container-sm ">
                    <h5 className="modelHeading">Bill</h5>
                    <hr></hr>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="paidTillNow">
                        Total salary paid till now
                      </Form.Label>
                      <Form.Control
                        enable
                        id="paidTillNow"
                        type="text"
                        name="paidTillNow"
                        defaultValue={
                          data.internalExpenses?.totalSalPaidTillNow
                        }
                        // onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="totalExpenses">
                        Total Expences
                      </Form.Label>
                      <Form.Control
                        enable
                        id="totalExpenses"
                        type="text"
                        name="totalExpenses"
                        // placeholder="please enter cubical cost"
                        defaultValue={data.internalExpenses?.totalExpenses}
                        // onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="cubicleCost">
                        Cubical cost
                      </Form.Label>
                      <Form.Control
                        required
                        enable={enable ? "" : "enable"}
                        id="cubicleCost"
                        type="number"
                        // placeholder="please enter cubical cost"
                        name="cubicleCost"
                        title="enter Cubical cost"
                        defaultValue={data.internalExpenses?.cubicleCost}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="foodCost">Food Cost</Form.Label>
                      <Form.Control
                        required
                        id="foodCost"
                        enable={enable ? "" : "enable"}
                        type="number"
                        // placeholder="please enter food Cost"
                        name="foodCost"
                        title="enter food Cost"
                        defaultValue="" //{data.internalExpenses?.foodCost}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="transportationCost">
                        Transport Cost
                      </Form.Label>
                      <Form.Control
                        required
                        id="transportationCost"
                        type="number"
                        enable={enable ? "" : "enable"}
                        // placeholder="please enter Transport Cost"
                        name="transportationCost"
                        title="enter Transport Cost"
                        defaultValue="" //{data.internalExpenses?.transportationCost}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="profitOrLoss">
                        Profit/Loss
                      </Form.Label>
                      <Form.Control
                        enable
                        id="profitOrLoss"
                        type="text"
                        name="profitOrLoss"
                        defaultValue={data.internalExpenses?.profitOrLoss}
                      />
                    </Form.Group>
                    
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

export default EditComponent;
