import React, { Fragment, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FormInputs } from "../../components/formInputs/FormInputs";
import ApiService from "../../services/ApiService";
import "./addSubDepartment.css";
import laptop from "../../images/laptop.gif";
export function AddSubDepartment() {
  const [data, setData] = useState({});
  const [status, setStatus] = useState(false);
  const [departs, setDeparts] = useState([]);
  const [msg, setMsg] = useState("");
  //   const [errors, setErrors] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const formData = [
    {
      id: "subDepartmentNames",
      title: "Sub department name",
      name: "subDepartmentNames",
      type: "text",
      placeholder: "Enter sub department name",
      required: true,
      defaultValue: data.subDepartmentNames,
      handleChange: handleChange,
    },
    {
      id: "departId",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="departId">
            Department
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="departId"
            aria-label="Department"
            className="selectInput"
            name="departId"
            onChange={handleChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {/* <option value="0">N/A</option> */}
            {departs?.map((type) => (
              <option key={type.depart} value={type.departId}>
                {type.depart}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },
  ];
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(true);
    // setErrors(false);
    ApiService.addSubDepart(data, data.departId)
      .then((res) => {
        // console.log(res.data);
        alert("successfull");
        navigate("/hr");
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
    ApiService.getAllDepart()
      .then((res) => {
        // console.log(res.data);
        setDeparts(res.data);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error));
        setDeparts(null);
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
        ADD SUB DEPARTMENT
      </div>
      <div id="" className="container-sm ">
        <h1 className="title text-center">Add Sub Department</h1>
        <Form onSubmit={handleSubmit}>
          <div className="form">
            {formData.map((item) => (
              <Fragment key={item.id}>
                {item?.data ? (
                  item.data
                ) : (
                  <FormInputs
                    id={item.id}
                    title={item.title}
                    name={item.name}
                    type={item.type}
                    placeholder={item.placeholder}
                    required={item.required}
                    defaultValue={item.defaultValue}
                    handleChange={item.handleChange}
                    pattern={item.pattern}
                    message={item.message}
                  />
                )}
              </Fragment>
            ))}
          </div>
          <Button className="btn-signup px-2 exrc" type="submit">
            Submit
          </Button>{" "}
          {""}
          <Button as={Link} to="/hr" variant="danger" className="px-2 ere">
            Cancel
          </Button>
          {/* </Col> */}
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
