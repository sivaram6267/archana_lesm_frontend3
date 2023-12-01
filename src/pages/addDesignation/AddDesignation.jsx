import React, { Fragment, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FormInputs } from "../../components/formInputs/FormInputs";
import ApiService from "../../services/ApiService";
import laptop from "../../images/laptop.gif";
export function AddDesignation() {
  const [id, setId] = useState();
  const [name, setName] = useState("");

  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");
  const [desgs, setDesgs] = useState(null);

  // };
  const formData = [
    {
      id: "desgNames",
      title: "Designation",
      name: "desgNames",
      type: "text",
      placeholder: "Enter designation",
      required: true,
      defaultValue: name,
      handleChange: (e) => {
        setName(e.target.value);
      },
    },
    {
      id: "desgId",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="departId">
            Reporting person
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="desgId"
            aria-label="Department"
            className="selectInput"
            name="desgId"
            onChange={(e) => {
              setId(e.target.value);
            }}
          >
            <option value="">{status ? "loading..." : "select "}</option>
            <option value="0">N/A</option>
            {desgs?.map((type) => (
              <option key={type.desgId} value={type.desgId}>
                {type.desgNames}
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
    ApiService.addDesg({ desgNames: name }, id)
      .then((res) => {
        // console.log(res.data);
        setMsg("");

        navigate("/hr");
        setStatus(false);
        // setErrors(false);
      })
      .catch((error) => {
        // console.log(error);
        setStatus(false);
        // setErrors(true);
        alert(JSON.stringify(error));
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  };

  useEffect(() => {
    ApiService.getAllDesg()
      .then((res) => {
        // console.log(res.data);
        setDesgs(res.data);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error));
        setDesgs(null);
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
        ADD DESIGNATION
      </div>
      <div id="" className="container-sm ">
        <h1 className="title text-center">Add designation</h1>
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
