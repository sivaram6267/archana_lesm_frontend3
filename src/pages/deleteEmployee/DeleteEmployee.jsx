import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import ApiService from "../../services/ApiService";

function DeleteEmployee() {
  const [status, setStatus] = useState(false);
  const [desgination, setDesgination] = useState(null);
  const [data, setData] = useState({});
  const [emp, setEmp] = useState(null);
  const [deleteto, setDeleteto] = useState(null);
  const [msg, setMsg] = useState(null);
  const [errors, setErrors] = useState(false);
  const [desgs, setDesgs] = useState(null);
  const [selemp, setSelemp] = useState(null);

  const navigate = useNavigate();
  let type = sessionStorage.getItem("type");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    if (name === "Designationid" && value !== "") {
      ApiService.ShowEmployeesToDelete(value) //get all employeess for selected designation
        .then((res) => {
          console.log(res.data);
          setDeleteto(res.data);
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

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/${type}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(true);
    // setErrors(false);
    ApiService.deleteEmployee(data.selectEmp)
      .then((res) => {
        console.log(data.selectEmp);
        // alert("successfull");
        navigate(`/${type}`);
        setStatus(false);
        setMsg("");
      })
      .catch((error) => {
        console.log(error);
        setStatus(true);
        setErrors(false);
        // alert(JSON.stringify(error));
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  };
  const handleok = (e) => {
    e.preventDefault();
    setStatus(true);
    // setErrors(false);
    ApiService.deleteEmployeefor(data.selectEmp)
      .then((res) => {
        console.log(res.data);
        // alert("successfull");
        navigate(`/${type}`);
        setStatus(false);
        setMsg("");
      })
      .catch((error) => {
        console.log(error);
        setStatus(true);
        setErrors(false);
        // alert(JSON.stringify(error));
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  };

  useEffect(() => {
    ApiService.DesinationsForDeleteModule()
      .then((res) => {
        //  console.log(res.data);
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
        DELETE EMPLOYEE
      </div>
      <div id="tranfer-employee" className="container-sm ">
        <h1 className="title text-center">Delete Employee</h1>
        <Form onSubmit={handleSubmit}>
          <div className="form">
            <Form.Group className="mb-3 px-2">
              <Form.Label htmlFor="chooseDesignation">
                Present Designation
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
                {deleteto?.map((type) => (
                  <option key={type.empId} value={type.empId}>
                    {type.lancesoft}
                    {type.firstName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
          <Button
            variant="primary"
            type="submit"
            onClick={handleShow}
            className="submit1"
          >
            submit
          </Button>{" "}
          <Modal show={show} onHide={handleClose} onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Update Message</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <p className="text-danger mb-2" onClick={handleShow}>
                {msg}{" "}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="success"
                onClick={handleok}
                // onclick={handleSubmit}
                onSubmit={handleSubmit}
                type="submit"
              >
                yes
              </Button>

              <Button
                variant="primary"
                onClick={handleCancel}
                // onClick={handleClose}
              >
                No
              </Button>
            </Modal.Footer>
          </Modal>{" "}
          <Button variant="danger" onClick={handleCancel} className="cancel1">
            Cancel
          </Button>
          {/* {status && (
          <p className="text-success mb-2">
            Please wait while we are processing your request.
          </p>
        )}
        {<p className="text-danger mb-2">{msg}</p>} */}
        </Form>

        {status && (
          <p className="text-success mb-2">
            Please wait while we are processing your request.
          </p>
        )}
      </div>
    </>
  );
}
export default DeleteEmployee;
