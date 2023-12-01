import React, { Fragment, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FormInputs } from "../../components/formInputs/FormInputs";
import ApiService from "../../services/ApiService";
import "./AddClientNames.css";
import dell from "../../images/dell.png";
import Amazon  from "../../images/Amazon_logo.svg.png";
import deloitte   from "../../images/deliotte.png";
import verizon from "../../images/verizon.png"
export default function AddClientNames() {
  const [data, setData] = useState({});
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const formData = [
    {
      id: "clientsNames",
      title: "Clients name",
      name: "clientsNames",
      type: "text",
      placeholder: "Enter client name",
      required: true,
      defaultValue: data.clientsNames,
      handleChange: handleChange,
    },
  ];
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(true);
    // setErrors(false);
    ApiService.addClientnames(data)
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
        setStatus(false);
        alert(JSON.stringify(error));
        // setErrors(true);
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  };

  return (
    <div id="" className="container-sm ">
      <h1 className="title text-center">Add Client names</h1>
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
      </Form>
      <p className="good ">
        "Good Service is <br></br>Good Business"
      </p>
      <br></br>
      {/* <img src={dell } alt="loading..." className="dell" /> */}
      <img src={Amazon } alt="loading..." className="dell" />
      <img src={deloitte } alt="loading..." className="dell" />
      <img src={verizon } alt="loading..." className="dell" />
      <img src={dell } alt="loading..." className="dell" />
    </div>
  );
}
