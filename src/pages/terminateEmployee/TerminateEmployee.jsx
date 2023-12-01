import React, { useState } from "react";
// import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import ApiService from "../../services/ApiService";
import { useEffect } from "react";
function TerminateEmployee() {
  const [data, setData] = useState({});
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");
  const [empTypes, setEmpTypes] = useState(null);
  const [desgs, setDesgs] = useState(null);
  const [Releaseemp, setReleaseemp] = useState(null);
  let type = sessionStorage.getItem("type");
  const handleChange = (e) => {
    let type = sessionStorage.getItem("type");
    const { name, value } = e.target;
    console.log(name, value);
    setData({ ...data, [name]: value });

    if (type === "hr" && name === "Designationid") {
      ApiService.ReleaseEmps(value)
        .then((res) => {
          console.log(res.data);
          setReleaseemp(res.data);
          setMsg("");
        })
        .catch((error) => {
          // console.log(error);
          alert(JSON.stringify(error));
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
  };
  const handleSelectEmployee = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setData({ ...data, [name]: value });
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    setStatus(true);
    console.log(data);
    // setErrors(false);
    ApiService.ReleaseEmpCmps(data.releasedDate, data.lancesoft)
      .then((res) => {
        e.preventDefault();
        e.target.reset();
        console.log(res.data);
        alert("Succesfully Terminated ");
        navigate("/hr/TerminateEmployee");
        setStatus(false);
        // setErrors(false);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error));
        setStatus(false);
        // setErrors(true);
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  };

  useEffect(() => {
    ApiService.getDesignationsesEmployee()
      .then((res) => {
        console.log(res.data);
        setDesgs(res.data);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error));
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  }, []);
  // useEffect(() => {
  //   ApiService.ReleaseEmp()
  //     .then((res) => {
  //       console.log(res.data);
  //       setReleaseemp(res.data);
  //       setMsg("");
  //     })
  //     .catch((error) => {
  //       // console.log(error);
  //       alert(JSON.stringify(error));
  //       setMsg(
  //         error.response.data.errorMessage
  //           ? error.response.data.errorMessage
  //           : error.message
  //       );
  //     });
  // }, []);
  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/${type}`);
  };

  return (
    <>
      <div class="p-3 mb-2 bg-primary text-white" style={{ color: "#1492E6" }}>
        TERMINATE EMPLOYEE
      </div>
      <div className="container-sm ">
        <h1 className="title text-center">Terminate Employee</h1>

        <Form onSubmit={handleSubmit}>
          <div className="form">
            <Form.Group className="mb-3 px-2">
              <Form.Label htmlFor="chooseDesignation">
                Choose designation
                <nobr />
                <span className="text-danger"> *</span>
              </Form.Label>
              <Form.Select
                id="chooseDesignation"
                aria-label="employee Type"
                className="selectInput"
                name="Designationid"
                required
                onChange={handleChange}
              >
                <option value="">{status ? "loading" : "select "}</option>
                {/* <option value="1">N/A</option> */}
                {desgs?.map((type) => (
                  <option key={type.desgNames} value={type.desgId}>
                    {type.desgNames}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 px-2">
              <Form.Label htmlFor="AssignEmp">
                Select Employee
                <nobr />
                <span className="text-danger"> *</span>
              </Form.Label>
              <Form.Select
                id="AssignEmp"
                aria-label="employee Type"
                className="selectInput"
                name="lancesoft"
                required
                onChange={handleSelectEmployee}
              >
                <option value="">{status ? "loading" : "select "}</option>
                {/* <option value="1">N/A</option> */}
                {Releaseemp?.map((type) => (
                  <option key={type.lancesoft} value={type.lancesoft}>
                    {type.lancesoft}
                    {type.firstName}
                    {type.lastName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 px-2" width="50px">
              <Form.Label htmlFor="releasedDate">Released Date</Form.Label>
              <Form.Control
                required={true}
                id="releasedDate"
                type="date"
                max="2022-07-31"
                placeholder="Enter releasedDate"
                name="releasedDate"
                title="enter releasedDate"
                defaultValue={data.releasedDate}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
          <Button type="submit" varient="success" className="submit1">
            submit
          </Button>{" "}
          <Button onClick={handleCancel} variant="danger" className="cancel1">
            Cancel
          </Button>
        </Form>
      </div>
    </>
  );
}

export default TerminateEmployee;
