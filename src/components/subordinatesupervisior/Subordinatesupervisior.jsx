import React, { Fragment, useState } from "react";

import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FormInputs } from "../../components/formInputs/FormInputs";
import Modal from "react-bootstrap/Modal";
import ApiService from "../../services/ApiService";
import { useEffect } from "react";
import "./subordinatesupervisior.css";

function Subordinatesupervisior() {
  const [data, setData] = useState({});
  const [status, setStatus] = useState(false);
  const [clients, setClients] = useState(null);
  const [emp, setEmp] = useState(null);
  const [practice, setPractice] = useState(null);
  const [selempdeg, setSelempdeg] = useState(null);
  const [Selmanager, setSelmanager] = useState(null);
  const [Selmanager2, setSelmanager2] = useState(null);
  const [selectemployer, setSelectemployer] = useState(null);
  const [second, setSecond] = useState(null);
  const [emplo, setEmplo] = useState(null);
  const [secondary, setSecondary] = useState(null);
  const [secondaryManager, setSecondaryManager] = useState(null);
  const [preemp, setpreemp] = useState(null);
  const [msg, setMsg] = useState("");
  const [client, setClient] = useState({});
  const [disabled, setDisabled] = useState(false);
  let type = sessionStorage.getItem("type");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(name + " " + value);

    if (data.lancesoftId === undefined) data.lancesoftId = "";
    if (type === "hr" && name === "lancesoftIds") {
      console.log(preemp); //preemp - designation
      ApiService.selectempdesgns(preemp, value)
        .then((res) => {
          console.log(res.data);
          setSelectemployer(res.data);
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
    if (type === "hr" && name === "lancesoft") {
      ApiService.selectmanager(secondary, value)
        .then((res) => {
          console.log(res.data);
          setSelmanager2(res.data);
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

  const handledesgination = (e) => {
    const { name, value } = e.target;
    console.log(name + " " + value);
    setpreemp(value);
  };

  const handlesecondary = (e) => {
    const { name, value } = e.target;
    console.log(name + " " + value);
    setSecondary(value);

    if (type === "hr" && name === "SelectSecondary") {
      ApiService.secondarymanager(value)
        .then((res) => {
          console.log(res.data);
          setSelmanager2(res.data);
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

  const handleDatas = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setSecond(value);

    ApiService.secondarymanager(preemp)
      .then((res) => {
        console.log(res.data);
        setSecondaryManager(res.data);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error));
        setSecondaryManager(null);
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  };
  console.log(second);
  console.log(secondary);
  // eslint-disable-next-line  no-unused-vars
  const [errors, setErrors] = useState(false);
  // eslint-disable-next-line
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(true);
    // setErrors(false);
    ApiService.setsecondarymanager(second, secondary)
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
    // ApiService.setsecondaryfor(second, secondary)
    //   .then((res) => {
    //     console.log(res.data);
    //     // alert("successfull");
    //     navigate(`/${type}`);
    //     setStatus(false);
    //     setMsg("");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setStatus(true);
    //     setErrors(false);
    //     // alert(JSON.stringify(error));
    //     setMsg(
    //       error.response.data.errorMessage
    //         ? error.response.data.errorMessage
    //         : error.message
    //     );
    //   });
    // ApiService.setsecondaryfor(second, secondary)
    //   .then((res) => {
    //     console.log(res.data);
    //     // alert("successfull");
    //     navigate(`/${type}`);
    //     setStatus(false);
    //     setMsg("");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setStatus(true);
    //     setErrors(false);
    //     // alert(JSON.stringify(error));
    //     setMsg(
    //       error.response.data.errorMessage
    //         ? error.response.data.errorMessage
    //         : error.message
    //     );
    //   });
  };

  const handleok = (e) => {
    e.preventDefault();
    setStatus(true);
    // setErrors(false);
    ApiService.setsecondaryfor(second, secondary)
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
    ApiService.getAllClients()
      .then((res) => {
        // console.log(res.data);
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

    // if (type === "hr") {
    ApiService.selectempdesgination()
      .then((res) => {
        console.log(res.data);
        setSelempdeg(res.data);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error));
        // alert(JSON.stringify(error));
        setSelempdeg(null);
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
    // }

    // ApiService.secondarymanager(secondary)
    //   .then((res) => {
    //     console.log(res.data);
    //     setSecondaryManager(res.data);
    //     setMsg("");
    //   })
    //   .catch((error) => {
    //     // console.log(error);
    //     alert(JSON.stringify(error));
    //     setSecondaryManager(null);
    //     setMsg(
    //       error.response.data.errorMessage
    //         ? error.response.data.errorMessage
    //         : error.message
    //     );
    //   });
  }, []);

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/${type}`);
    //
  };

  const formData = [
    {
      id: "Employeedesgs",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="SelectPractice">
            Select Employee Designation
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="Employeedesgs"
            aria-label="Client Name"
            className="selectInput"
            name="Employeedesgs"
            // disabled={disabled ? "" : "disabled"}
            onChange={handledesgination}
          >
            <option value="">{status ? "loading..." : "select "}</option>
            {selempdeg?.map((type, index) => (
              <option key={index} value={type.desigId}>
                {type.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },

    {
      id: "lancesoftId",
      title: "Type name or lancesoftid",
      name: "lancesoftIds",
      type: "text",
      placeholder: "Enter search",
      required: true,
      defaultValue: data.lancesoftId,
      // disabled: { disabled },
      disabled: true,
      handleChange: handleChange,
    },
    {
      id: "employeeIDs",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="employeeID">
            Select Employee
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="employeeIDs"
            aria-label="Client Name"
            className="selectInput"
            name="employeeIDs"
            // disabled={disabled ? "" : "disabled"}
            onChange={handleDatas}
          >
            <option value="">{status ? "loading..." : "select "}</option>
            {selectemployer?.map((type, index) => (
              <option key={index} value={type.empId}>
                {type.name}({type.lancesoftId})
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },
    {
      id: "Secondarymanager",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="SelectPractice" style={{ marginTop: "-23px" }}>
            Secondary Manager Designation
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="Secondarymanager"
            aria-label="Client Name"
            className="selectInput"
            name="SelectSecondary"
            // disabled={disabled ? "" : "disabled"}
            onChange={handlesecondary}
          >
            <option value="">{status ? "loading..." : "select "}</option>
            {secondaryManager?.map((type, index) => (
              <option key={index} value={type.desgId}>
                {type.name}
                {type.desgNames}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },
    {
      id: "lancesoft",
      title: "Type name or lancesoftid",
      name: "lancesoft",
      type: "text",
      placeholder: "Enter search",
      // required: true,
      disabled: true,
      // disabled: disabled,
      defaultValue: data.lancesoftId,
      handleChange: handleChange,
    },
    {
      id: "employeeid",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="employeeID">
            Select Employee
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            isInvalid={errors}
            id="employeeid"
            aria-label="Client Name"
            className="selectInput"
            name="employeeID"
            // disabled={disabled ? "" : "disabled"}
            onChange={handlesecondary}
          >
            <option value="">{status ? "loading..." : "select "}</option>
            {Selmanager2?.map((type, index) => (
              <option key={index} value={type.empId}>
                {type.name} {type.lastName} {type.lancesoftId}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },
    // {
    //   id: "clientEmail",
    //   title: "client email",
    //   name: "clientEmail",
    //   type: "email",
    //   placeholder: "Enter client email",
    //   required: true,
    //   defaultValue: data.clientEmail,
    //   handleChange: handleData,
    // },
    // {
    //   id: "clientManagerName",
    //   title: "Client Manager Name",
    //   name: "clientManagerName",
    //   type: "text",
    //   placeholder: "Enter client Manager Name",
    //   required: true,
    //   defaultValue: data.clientManagerName,
    //   handleChange: handleData,
    // },
    // {
    //   id: "clientsId",
    //   data: (
    //     <Form.Group className="mb-3 px-2">
    //       <Form.Label htmlFor="clientsId">
    //         Client Name
    //         <nobr />
    //         <span className="text-danger"> *</span>
    //       </Form.Label>
    //       <Form.Select
    //         required
    //         id="clientsId"
    //         aria-label="Client Name"
    //         className="selectInput"
    //         name="clientsId"
    //         onChange={handleData}
    //       >
    //         <option value="">{status ? "loading" : "select "}</option>
    //         {clients?.map((type, index) => (
    //           <option key={"clientsId" + index} value={type.clientsId}>
    //             {type.clientsNames}
    //           </option>
    //         ))}
    //       </Form.Select>
    //     </Form.Group>
    //   ),
    // },
    // // {
    // //   id: "clientName",
    // //   title: "Client Name",
    // //   name: "clientName",
    // //   type: "text",
    // //   placeholder: "Enter client name",
    // //   required: true,
    // //   defaultValue: data.clientName,
    // //   handleChange: handleChange,
    // // },
    // {
    //   id: "clientSalary",
    //   title: "Client billing",
    //   name: "clientSalary",
    //   type: "text",
    //   placeholder: "Enter client billing",
    //   required: true,
    //   defaultValue: data.clientSalary,
    //   handleChange: handleData,
    // },
    // {
    //   id: "desgAtClient",
    //   title: "Desgination at client",
    //   name: "desgAtClient",
    //   type: "number",
    //   // pattern: "[0-9]{10}",
    //   pattern: "[+91][0-9]{13}",
    //   placeholder: "Enter designation at client",
    //   required: true,
    //   defaultValue: data.desgAtClient,
    //   handleChange: handleData,
    // },
    // {
    //   id: "Posdate",
    //   title: "POS Date",
    //   name: "posdate",
    //   type: "date",
    //   placeholder: "Enter POS Date",
    //   required: true,
    //   defaultValue: data.posdate,
    //   handleChange: handleData,
    // },
    // {
    //   id: "Poedate",
    //   title: "POE Date",
    //   name: "poedate",
    //   type: "date",
    //   placeholder: "Enter POE Date",
    //   required: false,
    //   defaultValue: data.poedate,
    //   handleChange: handleData,
    // },
  ];
  return (
    <>
      <div class="p-3 mb-2 bg-primary text-white" style={{ color: "#1492E6" }}>
        SECONDARY MANAGER
      </div>
      <div id="transfer-employee" className="container-sm ">
        <h1 className="title text-center">Assign Secondary Employee</h1>

        <Form onSubmit={handleSubmit} style={{ marginTop: "60px" }}>
          <div className="formsec">
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
                        disabled={item.disabled}
                        defaultValue={item.defaultValue}
                        handleChange={item.handleChange}
                      />
                    )}
                  </Fragment>
                ))}
              </div>
            )}
          </div>
          <Button
            variant="primary"
            type="submit"
            onClick={handleShow}
            className="submit1"
          >
            submit
          </Button>{" "}
          {/* {data.response.errorMessage?.map((it) => (
          <Button
            className="btn-signup px-2"  
            type="submit"
            onClick={handleShow}
            defaultValue={it.response}
          >
            Submit
          </Button>
        ))} */}
          {/* alert(" resume upload successfull"); */}
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
          </Modal>
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
        {
          // <p className="text-danger mb-2" onClick={handleShow}>
          //   {msg}{" "}
          // </p>
        }
      </div>
    </>
  );
}

export default Subordinatesupervisior;
