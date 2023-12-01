import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import ApiService from "../../services/ApiService";
import laptop from "../../images/laptop.gif";
export default function UpdateSupervisor() {
  const [selectedLsid, setSelectedLsid] = useState("");
  const [selectedEmpId, setSelectedEmpId] = useState();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");
  const [supData, setSupData] = useState(null);
  const [emp, setEmp] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    ApiService.getEmpIdForSupervisor()
      .then((res) => {
        // console.log(res.data);
        setEmp(res.data);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error));
        setEmp(null);
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  }, []);

  const handleChange = (e) => {
    setLoading(true);
    const value = JSON.parse(e.target.value);
    setSelectedLsid(value.lancesoftId);
    ApiService.supervisorId(value.desgId)
      .then((res) => {
        // console.log(res.data);
        setSupData(res.data);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error));
        setSupData(null);
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(true);
    setMsg("");
    ApiService.updateSupervisorId(selectedLsid, selectedEmpId)
      .then((res) => {
        // console.log(res.data);
        navigate("/hr");
        setStatus(false);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        setStatus(false);
        alert(JSON.stringify(error));
        setMsg(
          error.response.data?.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  };

  return (
    <>
      <div class="p-3 mb-2 bg-primary text-white" style={{ color: "#1492E6" }}>
        UPDATE SUPERVISOR
      </div>
      <div id="" className="container-sm ">
        <h1 className="title text-center">Update Supervisor</h1>
        <Form onSubmit={handleSubmit}>
          {/* <div className="form"> */}
          <Form.Group className="mb-3 px-2">
            <Form.Label htmlFor="employeeID">
              <b>Employee ID</b>
              <nobr />
              <span className="text-danger"> *</span>
            </Form.Label>
            <Form.Select
              required
              id="employeeID"
              aria-label="Client Name"
              className="selectInput"
              name="employeeID"
              onChange={handleChange}
            >
              <option>{status ? "loading" : "select "}</option>
              {emp?.map((type, index) => (
                <option key={index} value={JSON.stringify(type)}>
                  {type.firstName} {type.lastName}({type.lancesoftId})
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {loading ? (
            <div>loading supervisor data</div>
          ) : (
            selectedLsid && (
              <Form.Group className="mb-3 px-2">
                <Form.Label htmlFor="supervisorId">
                  {/* Supervisor */}
                  Reporting person
                  <nobr />
                  <span className="text-danger"> *</span>
                </Form.Label>
                <Form.Select
                  required
                  id="supervisorId"
                  aria-label="Supervisor Id"
                  className="selectInput"
                  name="supervisorId"
                  onChange={(e) => setSelectedEmpId(e.target.value)}
                >
                  <option value="">{status ? "loading" : "select "}</option>
                  {supData?.map((type) => (
                    <option key={type.lancesoftId} value={type.empId}>
                      {type.firstName} {type.lastName} ({type.lancesoftId})(
                      {type.desgName})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )
          )}
          {/* </div> */}
          <Button className="btn-signup px-2 exrc" type="submit">
            Submit
          </Button>{" "}
          <Button as={Link} to="/hr" variant="danger" className="px-2 ere">
            Cancel
          </Button>
          {status && (
            <p className="text-success mb-2">
              Please wait while we are processing your request.
            </p>
          )}
          {<p className="text-danger mb-2">{msg}</p>}
          <img src={laptop} alt="loading..." className="working" />
        </Form>
      </div>
    </>
  );
}
