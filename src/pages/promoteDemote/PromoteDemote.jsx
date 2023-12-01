import React, { useEffect, useState } from "react";
import { type } from "@testing-library/user-event/dist/type";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";

import { Button, Form } from "react-bootstrap";
function PromoteDemote() {
  const [status, setStatus] = useState(false);
  const [desgs, setDesgs] = useState(null);
  const [emp, setEmp] = useState(null);
  const [desgination, setDesgination] = useState(null);
  const [desgId, setDesgId] = useState(0);
  const [demoteto2, setDemotesto2] = useState(null);
  const [demoteto1, setDemotesto1] = useState(null);
  const [desgn, setDesgn] = useState(null);
  const [data, setData] = useState({});

  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  let type = sessionStorage.getItem("type");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    if (name === "Designationid" && value !== "") {
      setDesgId(value);
      ApiService.getAllDesignationEmployeess(value) //2 get all employeess for selected designation
        .then((res) => {
          console.log(res.data);
          setDesgination(res.data);
        })

        .catch((error) => {
          alert(JSON.stringify(error));
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
    // if (name === "selectEmp" && value !== "") {
    //   console.log(value);
    //   setEmp(value);
    //   ApiService.addSupervisor(value)
    //     .then((res) => {
    //       console.log(res.data);
    //       setDemotesto(res.data);
    //     })
    //     .catch((error) => {
    //       alert(JSON.stringify(error));
    //       setMsg(
    //         error.response.data.errorMessage
    //           ? error.response.data.errorMessage
    //           : error.message
    //       );
    //     });
    // }
    if (name === "selectEmp" && value !== "") {
      setEmp(value);
      console.log(data);
      ApiService.choosedesgination(desgId) //3 get all employeess for selected designation
        .then((res) => {
          console.log(res.data);
          setDesgn(res.data);
        })

        .catch((error) => {
          alert(JSON.stringify(error));
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
    if (name === "Designationids" && value !== "") {
      console.log(data);
      setEmp(value);
      ApiService.newprimarymanager(value, data.selectEmp) //4 get all employeess for selected designation
        .then((res) => {
          console.log(res.data);
          setDemotesto2(res.data);
        })
        .catch((error) => {
          alert(JSON.stringify(error));
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
    if (name === "reportsTo" && value !== "") {
      console.log(emp, value);
      if (data.newSecondarySupervisor === undefined)
        data.newSecondarySupervisor = 0;
      ApiService.newSecondarySupervisor(emp, value, null)
        .then((res) => {
          console.log(res.data);
          setDemotesto1(res.data);
        })
        .catch((error) => {
          alert(JSON.stringify(error));
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    setStatus(true);
    console.log(data);
    // ApiService.AssignEmp(data.selectEmp, data.AssignTo)
    //   .then((res) => {
    //     console.log(res);
    //     alert("assignemp is successfully ");
    //     setMsg("");
    // if (data.salary === undefined) data.salary = 0;
    if (data.secondManager === undefined) data.secondManager = null;
    ApiService.promotedemoteEmp(
      data.salary,
      data.selectEmp,
      data.reportsTo,
      // data.newSecondarySupervisor,
      data.secondManager,
      data.releasedDate,
      data.Designationids
    )
      .then((res) => {
        e.preventDefault();
        e.target.reset();
        console.log(res.data);
        alert(res.data);
        navigate("/hr/PromoteDemote");
        // alert("Demote and promote emp is successfully");
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

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/${type}`);
  };

  // useEffect (() => {
  //     ApiService.getAllDemoteDesignation()
  //     .then((res) => {
  //       console.log(res.data);
  //         setDesgs(res.data);
  //         setMsg("");
  //     })
  //     .catch((error) => {
  //         alert(JSON.stringify(error));
  //         setMsg(
  //           error.response.data.errorMessage
  //             ? error.response.data.errorMessage
  //             : error.message
  //         );
  //     });
  // },[]);

  useEffect(() => {
    ApiService.getAllDemoteDesignation()
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
  return (
    <>
      <div class="p-3 mb-2 bg-primary text-white" style={{ color: "#1492E6" }}>
        PROMOTE/DEMOTE EMPLOYEE
      </div>
      <div id="update-salary" className="container-sm">
        <h1 className="title text-center">Promote/Demote</h1>
        <Form onSubmit={handleSubmit}>
          <div className="form1">
            <Form.Group className="mb-3 px-2">
              <Form.Label htmlFor="chooseDesignation">
                Select Designation
                <nobr />
                <span className="text-danger"> *</span>
              </Form.Label>
              {/* <Form.Select
            id="chooseDesignation"
            aria-label="employee Type"
            className="selectInput"
            name="Designationid"
            required
            onChange={handleChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
     
            {desgs?.map((type) => (
              <option key={type.desgNames} value={type.desgId}>
                {type.desgNames}
              </option>
            ))}
          </Form.Select> */}
              <Form.Select
                id="empTypeId"
                aria-label="employee Type"
                className="selectInput"
                name="Designationid"
                onChange={handleChange}
              >
                <option value="">{status ? "loading" : "select "}</option>

                {desgs?.map((type) => (
                  <option key={type.typeName} value={type.desgId}>
                    {type.desgNames}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 px-2">
              <Form.Label htmlFor="SelectEmp">
                Select Employee
                <nobr />
                <span className="text-danger"> *</span>
              </Form.Label>
              <Form.Select
                id="SelectEmp"
                aria-label="employee Type"
                className="selectInput"
                name="selectEmp"
                required
                onChange={handleChange}
              >
                <option value="">{status ? "loading" : "select "}</option>
                {/* <option value="1">N/A</option> */}
                {desgination?.map((type) => (
                  <option key={type.empId} value={type.lancesoft}>
                    {type.firstName} {type.lastName} {type.lancesoft}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 px-2">
              <Form.Label htmlFor="chooseDesignation">
                Choose New Designation
                <nobr />
                <span className="text-danger"> *</span>
              </Form.Label>
              <Form.Select
                id="empTypeId"
                aria-label="employee Type"
                className="selectInput"
                name="Designationids"
                onChange={handleChange}
              >
                <option value="">{status ? "loading" : "select "}</option>

                {desgn?.map((type) => (
                  <option key={type.typeName} value={type.desgId}>
                    {type.desgNames}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 px-2">
              <Form.Label htmlFor="salary">Salary</Form.Label>
              <Form.Control
                name="salary"
                id="salary"
                required
                type=""
                placeholder="Enter salary"
                defaultValue={data.salary}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 px-2">
              <Form.Label htmlFor="reportsTo">
                New Primary Manager
                <nobr />
                <span className="text-danger"> *</span>
              </Form.Label>
              <Form.Select
                id="reportsTo"
                aria-label="employee Type"
                className="selectInput"
                name="reportsTo"
                required
                onChange={handleChange}
              >
                <option value="">{status ? "loading" : "select "}</option>
                <option value="1">N/A</option>
                {demoteto2?.map((type) => (
                  <option key={type.typeName} value={type.lancesoft}>
                    {type.firstName} {type.lastName} {type.lancesoft}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 px-2">
              <Form.Label htmlFor="secondManager">
                New Secondary Manager
                <nobr />
                {/* <span className="text-danger"> *</span> */}
              </Form.Label>
              <Form.Select
                id="secondManager"
                aria-label="employee Type"
                className="selectInput"
                name="secondManager"
                onChange={handleChange}
              >
                <option value="">{status ? "loading" : "select "}</option>
                <option value="1">N/A</option>
                {demoteto1?.map((type) => (
                  <option key={type.empId} value={type.lancesoft}>
                    {type.firstName} {type.lastName} {type.lancesoft}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 px-2" width="50px">
              <Form.Label htmlFor="releaseDate">Choose Date</Form.Label>
              <Form.Control
                required={true}
                id="releaseDate"
                type="date"
                placeholder="Enter releaseDate"
                name="releasedDate"
                title="enter releaseDate"
                defaultValue={data.releaseDate}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
          <Button variant="primary" type="submit" className="submit2">
            Submit
          </Button>{" "}
          <Button onClick={handleCancel} variant="danger" className="cancel2">
            Cancel
          </Button>
        </Form>
      </div>
    </>
  );
}

export default PromoteDemote;
