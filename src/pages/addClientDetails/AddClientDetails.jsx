import React, { Fragment, useState } from "react";

import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FormInputs } from "../../components/formInputs/FormInputs";
import "./AddClientDetails.css";
import ApiService from "../../services/ApiService";
import { useEffect } from "react";

function AddClientDetails() {
  const [data, setData] = useState({});
  const [status, setStatus] = useState(false);
  const [clients, setClients] = useState(null);
  const [emp, setEmp] = useState(null);
  const [practice, setPractice] = useState(null);
  const [emplo, setEmplo] = useState(null);
  const [practiceno, setPracticeno] = useState(null);
  const [recuite, setRecuite] = useState(null);
  const [towerheaddrop, setTowerheaddrop] = useState(null);
  const [contract, setContract] = useState(null);
  const [towerlead, setTowerlead] = useState(null);
  const [msg, setMsg] = useState("");
  let type = sessionStorage.getItem("type");
  const handleChange = (e) => {
    const { name, value } = e.target;
    // setData({ ...data, [name]: value });
    console.log(name + " " + value);
    if (data.lancesoftId === undefined) data.lancesoftId = "";
    if (type === "hr") {
      console.log(data);
      ApiService.getEmploy(value, practiceno)
        .then((res) => {
          console.log(res.data);
          setEmplo(res.data);
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
  const handlePractice = (e) => {
    const { name, value } = e.target;
    console.log(name + " " + value);
    setPracticeno(value);
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    console.log(name + " " + value);
    setData({ ...data, [name]: value });
  };
  console.log(data);

  // eslint-disable-next-line  no-unused-vars
  const [errors, setErrors] = useState(false);
  // eslint-disable-next-line
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(true);
    // setErrors(false);
    ApiService.addClientDetails(data, data.clientsId, data.employeeID)
      .then((res) => {
        e.preventDefault();
        e.target.reset();

        // console.log(res.data);
        alert("successfull");
        navigate("/hr");
        // navigate(`/${type}`);
        setStatus(false);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        setStatus(true);
        setErrors(false);
        alert(JSON.stringify(error));

        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  };

  useEffect(() => {
    ApiService.getAllClients()
      .then((res) => {
        console.log(res.data);
        setClients(res.data);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error));
        setClients(null);
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
    ApiService.getEmployeeId()
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

    if (type === "hr") {
      ApiService.selectPractice()
        .then((res) => {
          console.log(res.data);
          setPractice(res.data);
          setMsg("");
        })
        .catch((error) => {
          // console.log(error);
          alert(JSON.stringify(error));
          setPractice(null);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
    // if (id === "recruiter") {
    if (data.lancesoftId === undefined) data.lancesoftId = "";
    ApiService.recuiterdropdown()
      .then((res) => {
        console.log(res.data);
        setRecuite(res.data);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error));
        setRecuite(null);
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
    if (data.lancesoftId === undefined) data.lancesoftId = "";
    ApiService.Towerheaddropdown()
      .then((res) => {
        console.log(res.data);
        setTowerheaddrop(res.data);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error));
        setTowerheaddrop(null);
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
    if (data.lancesoftId === undefined) data.lancesoftId = "";
    ApiService.Towerleaddropdown()
      .then((res) => {
        console.log(res.data);
        setTowerlead(res.data);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error));
        setTowerlead(null);
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
    ApiService.subcontractor()
      .then((res) => {
        console.log(res.data);
        setContract(res.data);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error));
        setTowerlead(null);
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
    // }
  }, []);
  const workmodes = ["WFO", "WFH", "Hybrid", "PWF", "TWH"];

  const formData = [
    {
      id: "SelectPractice",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="SelectPractice">
            Select Practice
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="SelectPractice"
            aria-label="Client Name"
            className="selectInput"
            name="SelectPractice"
            onChange={handlePractice}
          >
            <option value="">{status ? "loading..." : "select "}</option>
            {practice?.map((type, index) => (
              <option key={index} value={type.subDepartId}>
                {type.subDepartmentNames}
                {type.depart}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },
    {
      id: "lancesoftId",
      title: "Lancesoft Id",
      name: "lancesoftId1",
      type: "text",
      placeholder: "Enter search",
      // required: true,
      defaultValue: data.lancesoftId,
      handleChange: handleChange,
    },
    {
      id: "employeeID",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="employeeID">
            Employee ID
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="empId"
            aria-label="Client Name"
            className="selectInput"
            name="empId"
            onChange={handleData}
          >
            <option value="">{status ? "loading..." : "select "}</option>
            {emplo?.map((type, index) => (
              <option key={index} value={type.empId}>
                {type.firstName} {type.name}({type.lancesoftId})
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },
    {
      id: "clientEmail",
      title: "Client Email",
      name: "clientEmail",
      type: "email",
      placeholder: "Enter client email",
      required: true,
      defaultValue: data.clientEmail,
      handleChange: handleData,
    },
    {
      id: "clientManagerName",
      title: "Client Manager Name",
      name: "clientManagerName",
      type: "text",
      placeholder: "Enter client Manager Name",
      required: true,
      defaultValue: data.clientManagerName,
      handleChange: handleData,
    },
    {
      id: "clients",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="ClientName">
            Client Name
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="clients"
            aria-label="Client Name"
            className="selectInput"
            name="clients"
            onChange={handleData}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {clients?.map((type, index) => (
              <option key={"clients" + index} value={type.clientsId}>
                {type.clientsNames}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },

    {
      id: "clientSalary",
      title: "Client Salary",
      name: "clientSalary",
      maxLength: "10",
      pattern: "[0-9]{10}",
      message: "Please enter valid salary",
      type: "Number",
      placeholder: "Enter client billing",
      required: true,
      defaultValue: data.clientSalary,
      handleChange: handleData,
    },
    {
      id: "desgAtClient",
      title: "Desgination At Client",
      name: "desgAtClient",
      type: "text",
      // pattern: "[0-9]{10}",

      placeholder: "Enter designation at client",
      required: true,
      defaultValue: data.desgAtClient,
      handleChange: handleData,
    },

    {
      id: "cgst",
      title: "CGST",
      name: "cgst",
      type: "number",
      // pattern: "[0-9]{10}",

      placeholder: "Enter cgst number",

      defaultValue: data.cgst,
      handleChange: handleData,
    },
    {
      id: "igst",
      title: "IGST",
      name: "igst",
      type: "number",
      // pattern: "[0-9]{10}",

      placeholder: "Enter igst number",

      defaultValue: data.igst,
      handleChange: handleData,
    },
    {
      id: "sgst",
      title: "SGST",
      name: "sgst",
      type: "number",
      // pattern: "[0-9]{10}",

      placeholder: "Enter sgst number",

      defaultValue: data.sgst,
      handleChange: handleData,
    },
    {
      id: "clientLocation",
      title: "Client Location ",
      name: "clientLocation",
      type: "name",
      // pattern: "[0-9]{10}",

      placeholder: "Enter clientLocation",

      defaultValue: data.clientLocation,
      handleChange: handleData,
    },
    // {
    //   id: "podate",
    //   title: "PO Date",
    //   name: "podate",
    //   type: "date",
    //   // pattern: "[0-9]{10}",

    //   placeholder: "Enter podate",
    //   required: true,
    //   defaultValue: data.ClientJoiningDate,
    //   handleChange: handleData,
    // },
    // {
    //   id: "povalue",
    //   title: "PO Value",
    //   name: "povalue",
    //   type: "number",
    //   // pattern: "[0-9]{10}",

    //   placeholder: "Enter povalue",
    //   // required: true,
    //   defaultValue: data.povalue,
    //   handleChange: handleData,
    // },
    {
      id: "skillSet",
      title: "Skill Set",
      name: "skillSet",
      type: "text",
      // pattern: "[0-9]{10}",

      placeholder: "enter skillSet ",
      required: true,
      defaultValue: data.skillSet,
      handleChange: handleData,
    },
    {
      id: "",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="towerHead">
            Sub Contractor
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            id="subContractor"
            aria-label="subContractor"
            className="selectInput"
            name="subContractor"
            onChange={handleData}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {contract?.map((type, index) => (
              <option key={"clientsId" + index} value={type.clientsId}>
                {type.clientsNames}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },
    {
      id: "workMode",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="workMode">
            Work Mode
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="workMode"
            aria-label="Client Name"
            className="selectInput"
            name="workMode"
            onChange={handleData}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {workmodes?.map((type, index) => (
              <option key={"workMode" + index} value={type.workMode}>
                {type}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },

    // {
    //   id: "ponumber",
    //   title: "PO Number",
    //   name: "ponumber",
    //   type: "text",
    //   // pattern: "[0-9]{10}",

    //   placeholder: "enter ponumber",
    //   required: true,
    //   defaultValue: data.ponumber,
    //   handleChange: handleData,
    // },

    {
      id: "",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor=" recruiter">
            Recruiter
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            id="recruiter"
            aria-label="recruiter"
            className="selectInput"
            name="recruiter"
            onChange={handleData}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {recuite?.map((type, index) => (
              <option key={"empId" + index} value={type.empId}>
                {type.name} {type.lancesoftId}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },

    {
      id: "",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="towerHead">
            Tower Head
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            id="towerHead"
            aria-label="towerHead"
            className="selectInput"
            name="towerHead"
            onChange={handleData}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {towerheaddrop?.map((type, index) => (
              <option key={"empId" + index} value={type.empId}>
                {type.name} {type.lancesoftId}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },

    {
      id: "",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor=" towerLead">
            Tower Lead
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            id="recruiter"
            aria-label="towerLead"
            className="selectInput"
            name="towerLead"
            onChange={handleData}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {towerlead?.map((type, index) => (
              <option key={"empId" + index} value={type.empId}>
                {type.name} {type.lancesoftId}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },

    {
      id: "offerReleaseDate",
      title: "Offer Release Date",
      name: "offerReleaseDate",
      type: "date",
      // pattern: "[0-9]{10}",

      placeholder: "",
      // required: true,
      defaultValue: data.offerReleaseDate,
      handleChange: handleData,
    },
    {
      id: "lancesoftLastWorkingDate",
      title: "Lancesoft last working  Date",
      name: "lancesoftLastWorkingDate",
      type: "date",
      placeholder: "Enter Client Joining Date",
      required: false,
      defaultValue: data.lancesoftLastWorkingDate,
      handleChange: handleData,
    },

    // {
    //   id: "clientLastWorkingDate",
    //   title: "Client Last Working Date",
    //   name: "clientLastWorkingDate",
    //   type: "date",
    //   placeholder: "Enter clientLastWorkingDate",

    //   defaultValue: data.clientLastWorkingDate,
    //   handleChange: handleData,
    // },
    // {
    //   id: " lancesoftLastWorkingDate",
    //   title: "Lancesoft Last Working Date ",
    //   name: "lancesoftLastWorkingDate",
    //   type: "date",
    //   placeholder: "Enter lancesoftLastWorkingDate ",

    //   defaultValue: data.lancesoftLastWorkingDate,
    //   handleChange: handleData,
    // },
    {
      id: "Posdate",
      title: "Client Joining date",
      name: "posdate",
      type: "date",
      placeholder: "Enter POS Date",
      required: true,
      defaultValue: data.posdate,
      handleChange: handleData,
    },
    {
      id: "Poedate",
      title: "Client Last Working Date",
      name: "poedate",
      type: "date",
      placeholder: "Enter POE Date",
      required: false,
      defaultValue: data.poedate,
      handleChange: handleData,
    },
  ];
  return (
    <>
      {/* <div class="p-3 mb-2 bg-primary text-white" style={{ color: "#1492E6" }}>
        Add client details
      </div> */}
      <div className="container-large">
        <div id="" className=" sind container-sm ">
          <div className=" container title text-left">
            <h1 style={{ color: "#ffffff" }}>Add Client Details</h1>
          </div>

          <Form onSubmit={handleSubmit}>
            <h4 className="text-center">Employee Details</h4>
            {errors && (
              <p className="text-danger mb-2">
                Network problem please try again
              </p>
            )}
            {!errors && (
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
                      />
                    )}
                  </Fragment>
                ))}
              </div>
            )}
            <Button className="submit3" variant="primary" type="submit">
              Submit
            </Button>{" "}
            <Button onClick={handleCancel} variant="danger" className="cancel3">
              Cancel
            </Button>
            {status && (
              <p className="text-success mb-2">
                Please wait while we are processing your request.
              </p>
            )}
            {<p className="text-danger mb-2">{msg}</p>}
          </Form>
        </div>
      </div>
    </>
  );
}

export default AddClientDetails;
