import React, { Fragment, useState } from "react";

import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FormInputs } from "../../components/formInputs/FormInputs";

import ApiService from "../../services/ApiService";
import { useEffect } from "react";
import "./EditClientDetails.css";
function EditClientDetails() {
  const [data, setData] = useState({});
  const [dataone, setDataone] = useState({});
  const [status, setStatus] = useState(false);
  const [clients, setClients] = useState(null);
  const [emp, setEmp] = useState(null);
  const [empId, setEmpId] = useState(null);
  const [empdetail, setEmpDetail] = useState(null);
  const [clientnames, setClientnames] = useState(null);

  const [practice, setPractice] = useState(null);
  const [towerhead, setTowerhead] = useState(null);
  const [towerlead, setTowerlead] = useState(null);
  const [recruiter, setRecruiter] = useState(null);
  const [emplo, setEmplo] = useState(null);
  const [practiceno, setPracticeno] = useState(null);
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState(false);
  const navigate = useNavigate();
  let type = sessionStorage.getItem("type");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataone({ ...dataone, [name]: value });
    console.log(name + " " + value);
    if (dataone.lancesoftId === undefined) dataone.lancesoftId = "";
    if (type === "hr") {
      console.log(practiceno);
      ApiService.getEmploys(value, practiceno) //2
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

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(name + " " + value);
  };
  const handleClients = (e) => {
    const { name, value } = e.target;
    //setData({ ...data, [name]: value });
    console.log(value);

    ApiService.getEmpdetail(value) //3
      .then((res) => {
        console.log(res.data);
        setEmpDetail(res.data);
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

  const handlePractice = (e) => {
    const { name, value } = e.target;
    console.log(name + " " + value);
    setPracticeno(value);

    ApiService.getClients()
      .then((res) => {
        console.log(data);
        setClients(res.data);
        setStatus(false);
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
  };

  const handleClientDetail = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    // console.log(lientsId);
    setEmpId(value);
    console.log(value);

    ApiService.getClientDetail(value) //4
      .then((res) => {
        //let id = res.data;
        setStatus(false);
        console.log(res.data);
        // setMsg("");
        setData(res.data);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(true);
    // setErrors(false);
    console.log(data);
    ApiService.addClientDetails2(empId, data)
      .then((res) => {
        console.log(res.data);
        alert("successfull");
        navigate(`/${type}`);
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
  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/${type}`);
  };
  const handleclientManagerEmail = (e) => {
    const { name, value } = e.target;
    console.log(name + " " + value);
    setData({ ...data, [name]: value });
  };
  useEffect(() => {
    ApiService.getSelectEmp()
      .then((res) => {
        //  console.log(res.data);
        setEmp(res.data);
        setMsg("");
        console.log(emp);
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
    if (type === "hr") {
      ApiService.selectPractices() //1
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
    // if (data === "towerhead") {

    // }

    ApiService.EmployeeByResponsibilites()
      .then((res) => {
        console.log(res.data);
        setTowerhead(res.data);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error));
        setTowerhead(null);
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
    ApiService.EmployeeByResponsibilites1()
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
    ApiService.GetAllSubClients()
      .then((res) => {
        console.log(res.data);
        setClientnames(res.data);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error));
        setClientnames(null);
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
    ApiService.EmployeeByResponsibilites2()
      .then((res) => {
        console.log(res.data);
        setRecruiter(res.data);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error));
        setTowerhead(null);
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
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
      name: "lancesoftId",
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
            id="employeeID"
            aria-label="Client Name"
            className="selectInput"
            name="employeeID"
            // defaultValue={data.clients}
            // onChange={handleData}
            onChange={handleClients}
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
      id: "ClientDetails",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="ClientDetails">
            Select Client Details
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="ClientDetails"
            aria-label="Client Name"
            className="selectInput"
            name="clientId"
            // onChange={handleClientDetail}
            onChange={handleClientDetail}
          >
            <option value="">{status ? "loading..." : "select "}</option>
            {empdetail?.map((type, index) => (
              <option key={index} value={type.clientId}>
                {type.clientName} {type.poSDate}({type.poEDate})
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },
    {
      id: "clientEmail",
      title: "Client Manager Email",
      name: "clientEmail",
      type: "email",
      placeholder: "Enter client email",
      required: true,
      defaultValue: data.clientEmail,
      handleChange: handleclientManagerEmail,
    },
    {
      id: "clientManagerName",
      title: "Client Manager Name",
      name: "clientManagerName",
      type: "text",
      placeholder: "Enter client Manager Name",
      required: true,
      defaultValue: data.clientManagerName,
      handleChange: handleDataChange,
    },
    {
      id: "clientsId",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="clientsId">
            Clients
            <nobr />
            {/* <span className="text-danger"> *</span> */}
          </Form.Label>
          <Form.Select
            required
            id="clientsId"
            aria-label="Client Name"
            className="selectInput"
            name="clients"

            //onChange={handleDataChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {clients?.map((type, index) => (
              <option
                key={"clientsId" + index}
                value={type.clientsId}
                selected={type.clientsId === data.clients}
                //  selected={type.empId === data.clientsId}
              >
                {type.clientsNames}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },

    {
      id: "clientLocation",
      title: "Client Location",
      name: "clientLocation",

      type: "text",
      placeholder: "Enter client Location",
      required: true,
      defaultValue: data.clientLocation,
      handleChange: handleDataChange,
    },
    {
      id: "skillset",
      data: (
        <div className="mb-3">
          <label htmlFor="email">Skill Set </label>
          <textarea
            id="fore"
            className=""
            placeholder="text"
            type="text"
            name="skillset"
            noValidate
            defaultValue={data.skillSet}
            onChange={handleDataChange}
          />
        </div>
      ),
    },
    {
      id: "clientsId",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="subContractor">
            SubContractor
            <nobr />
            {/* <span className="text-danger"> *</span> */}
          </Form.Label>
          <Form.Select
            required
            id="subContractor"
            aria-label="Client Name"
            className="selectInput"
            name="subContractor"

            //onChange={handleDataChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {clientnames?.map((type, index) => (
              <option
                key={"clientsId" + index}
                value={type.clientsId}
                selected={type.clientsId === data.subContractor}
                //  selected={type.empId === data.clientsId}
              >
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
      handleChange: handleDataChange,
    },
    {
      id: "desgAtClient",
      title: "Desgination At Client",
      name: "desgAtClient",
      type: "text",
      placeholder: "Enter designation at client",
      required: true,
      defaultValue: data.desgAtClient,
      handleChange: handleDataChange,
    },
    {
      id: "cgst",
      title: "CGST",
      name: "cgst",
      type: "number",
      // pattern: "[0-9]{10}",

      placeholder: "Enter cgst number",

      defaultValue: data.cgst,
      handleChange: handleDataChange,
    },
    {
      id: "igst",
      title: "IGST",
      name: "igst",
      type: "number",
      // pattern: "[0-9]{10}",

      placeholder: "Enter igst number",

      defaultValue: data.igst,
      handleChange: handleDataChange,
    },
    {
      id: "sgst",
      title: "SGST",
      name: "sgst",
      type: "number",
      // pattern: "[0-9]{10}",

      placeholder: "Enter sgst number",

      defaultValue: data.sgst,
      handleChange: handleDataChange,
    },

    {
      id: "povalue",
      title: "PO Value",
      name: "povalue",
      type: "number",
      // pattern: "[0-9]{10}",

      placeholder: "Enter povalue",
      // required: true,
      defaultValue: data.povalue,
      handleChange: handleDataChange,
    },
    {
      id: "towerhead",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor=" Tower-Head">
            Tower Head
            <nobr />
            {/* <span className="text-danger"> *</span> */}
          </Form.Label>
          <Form.Select
            // required
            id="towerHead"
            aria-label="Tower-Head"
            className="selectInput"
            //defaultValue={data.towerHead}
            name="towerhead"
            // onChange={handleResponse}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {towerhead?.map((type, index) => (
              <option
                key={"towerhead" + index}
                value={type.lancesoftId}
                selected={type.empId === data.towerHead}
              >
                {type.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },
    {
      id: "towerLead",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor=" Tower-lead">
            Tower Lead
            <nobr />
            {/* <span className="text-danger"> *</span> */}
          </Form.Label>
          <Form.Select
            // required
            id="towerLead"
            aria-label="Tower-Lead"
            className="selectInput"
            // defaultValue={data.towerLead}
            name=" towerlead"
            //onChange={handleDataChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {towerlead?.map((type, index) => (
              <option
                key={"towerlead" + index}
                value={type.lancesoftId}
                selected={type.empId === data.towerLead}
              >
                {type.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },

    {
      id: "recruiter",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor=" recruiter">
            Recruiter
            <nobr />
            {/* <span className="text-danger"> *</span> */}
          </Form.Label>
          <Form.Select
            // required
            id=" recruiter"
            aria-label="Recruiter"
            className="selectInput"
            defaultValue={data.recruiter}
            name=" recruiter"
            //onChange={handleDataChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {recruiter?.map((type, index) => (
              <option
                key={"recruiter" + index}
                value={type.recruiter}
                selected={type.empId === data.recruiter}
              >
                {type.name}
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
            {/* <span className="text-danger"> *</span> */}
          </Form.Label>
          <Form.Select
            // required
            id="workMode"
            aria-label="Client Name"
            className="selectInput"
            name="workMode"
            // defaultValue={data.workMode}
            //onChange={handleDataChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {workmodes?.map((type, index) => (
              <option
                key={"workMode" + index}
                value={type.workMode}
                selected={type === data.workMode}
              >
                {type}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },

    {
      id: "ponumber",
      title: "PO Number",
      name: "ponumber",
      type: "text",
      // pattern: "[0-9]{10}",

      placeholder: "enter ponumber",
      required: true,
      defaultValue: data.ponumber,
      handleChange: handleDataChange,
    },

    {
      id: "clientJoiningDate",
      title: "Client Joining Date",
      name: "clientJoiningDate",
      type: "date",
      placeholder: "",
      required: true,
      defaultValue: data.clientJoiningDate,
      handleChange: handleDataChange,
    },
    {
      id: "clientLastWorkingDate",
      title: "Client Last Working Date",
      name: "clientLastWorkingDate",
      type: "date",
      placeholder: "",
      // required: true,
      defaultValue: data.clientLastWorkingDate,
      handleChange: handleDataChange,
    },
    {
      id: "lancesoftLastWorkingDate",
      title: "Lancesoft Last Working Date",
      name: "lancesoftLastWorkingDate",
      type: "date",
      placeholder: "",
      // required: true,
      defaultValue: data.lancesoftLastWorkingDate,
      handleChange: handleDataChange,
    },
    {
      id: "offerReleaseDate",
      title: "Offer Release Date",
      name: "offerReleaseDate",
      type: "date",
      placeholder: "",
      // required: true,
      defaultValue: data.offerReleaseDate,
      handleChange: handleDataChange,
    },
    {
      id: "podate",
      title: "PO Date",
      name: "podate",
      type: "date",
      // pattern: "[0-9]{10}",

      placeholder: "",
      required: true,
      defaultValue: data.podate,
      handleChange: handleDataChange,
    },
    {
      id: "posdate",
      title: "POS Date",
      name: "posdate",
      type: "date",
      placeholder: "Enter POS Date",
      required: true,
      defaultValue: data.posdate,
      handleChange: handleDataChange,
    },
    {
      id: "Poedate",
      title: "POE Date",
      name: "poedate",
      type: "date",
      placeholder: "Enter POE Date",
      required: false,
      defaultValue: data.poedate,
      handleChange: handleDataChange,
    },
  ];
  return (
    <div className="container-large">
    <div id="" className="container-sm ">
      <h1 className="title text-left">Edit Client Details</h1>

      <Form onSubmit={handleSubmit}>
        <h4>Employee Details</h4>
        {errors && (
          <p className="text-danger mb-2">Network problem please try again</p>
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
                    max={item.max}
                    maxLength={item.maxLength}
                  />
                )}
              </Fragment>
            ))}
          </div>
        )}
        <Button variant="primary" type="submit" className="submit3">
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
  );
}

export default EditClientDetails;
