import React, { Fragment, useState } from "react";
// import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FormInputs } from "../../components/formInputs/FormInputs";
import ApiService from "../../services/ApiService";
import { useEffect } from "react";
import "./Transferemployee.css";

export default function TransferEmployee() {
  const [data, setData] = useState({});
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");
  // eslint-disable-next-line
  const [empTypes, setEmpTypes] = useState(null);
  const [promdesg, setPromdesg] = useState(null);
  const [genManagerTransfer, setGenManagerTransfer] = useState(null);
  const [genmanagerEmp, setGenmanagerEmp] = useState(null);
  const [selectempprom, setSelectempprom] = useState(null);
  const [assigntoprom, setAssigntoprom] = useState(null);
  const [generalAssignEmp, setGeneralassignEmp] = useState(null);

  const [relEmpProm, setRelEmpProm] = useState(null);
  const [secondarytransfer, setSecondarytransfer] = useState(null);
  const [repoEmp, setrepoEmp] = useState(null);
  const [empID, setEmpID] = useState(null);
  const [relgeneralManger, setrelGeneralmanager] = useState(null);

  //   const [departs, setDeparts] = useState(null);
  //   const [subDep, setSubDep] = useState(null);
  // eslint-disable-next-line
  const [supId, setSupId] = useState(null);
  let type = sessionStorage.getItem("type");
  console.log(type);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(data);
    if (name === "Designationid" && value !== "") {
      ApiService.selectEmployeeprom(value)
        .then((res) => {
          console.log(res.data);
          setSelectempprom(res.data);
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
    if (name === "selectEmployeeprom" && value !== "") {
      setEmpID(value);
      ApiService.ReleaseEmpprom(value)
        .then((res) => {
          console.log(res.data);
          setRelEmpProm(res.data);
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
    if (name === "Reportsto" && value !== "") {
      console.log(empID);

      ApiService.secondarymanagertransfer(empID, value)
        .then((res) => {
          console.log(res.data);
          setSecondarytransfer(res.data);
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

    // const handleChange = (e) => {
    //   const { name, value } = e.target;
    //   setData({ ...data, [name]: value });
    if (name === "employee" && value !== "") {
      // ApiService.generalSelectEmploye(value)
      //   .then((res) => {
      //     console.log(data);
      //     setGeneralassignEmp(res.data);
      //   })

      //   .catch((error) => {
      //     alert(JSON.stringify(error));
      //     setMsg(
      //       error.response.data.errorMessage
      //         ? error.response.data.errorMessage
      //         : error.message
      //     );
      //   });

      ApiService.ReleaseEmployee(value)
        .then((res) => {
          console.log(res.data);
          setrepoEmp(res.data);
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

  // };

  // console.log(releaseempprom);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(true);
    console.log(data);
    // ApiService.AssigntransferEmp(data.selectEmployeeprom, data.AssignToprom)
    //   .then((res) => {
    //     console.log(res.data);
    //     alert("assigntransferemp is successfully ");
    //     setMsg("");
    if (type === "hr") {
      if (data.salary === undefined) data.salary = 0;
      if (data.secondaryLancesoftId === undefined)
        data.secondaryLancesoftId = null;
      if (data.location === undefined) data.location = null;
      ApiService.promotetransferEmp(
        data.selectEmployeeprom,
        data.Reportsto,
        data.secondarymanager,
        data.location,
        data.salary
      )
        .then((res) => {
          e.preventDefault();
          e.target.reset();
          console.log(res);
          alert("promte transfer emp is successfully");
          navigate("/TransferEmployee");
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

    // .catch((error) => {
    //   alert(JSON.stringify(error));
    //   setMsg(
    //     error.response.data.errorMessage
    //       ? error.response.data.errorMessage
    //       : error.message
    //   );
    // });
    if (type === "manager") {
      console.log(data);

      // ApiService.TransferEmplo(data.employee, data.AssignToprom)
      //   .then((res) => {
      //     console.log(res);
      //     console.log(res.data);
      //     alert("transfer emp is successfully");
      //     setMsg("");
      if (data.salary === undefined) data.salary = 0;
      if (data.location === undefined) data.location = null;
      ApiService.transferEmpgeneral(
        data.employee,
        data.reportsTo,
        data.salary,
        data.location
      )
        .then((res) => {
          console.log(res);
          alert("promte transfer emp is successfully");
          navigate("/hr");
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
    if (type === "ch") {
      console.log(data);

      // ApiService.TransferEmplo(data.employee, data.AssignToprom)
      //   .then((res) => {
      //     console.log(res);
      //     console.log(res.data);
      //     alert("transfer emp is successfully");
      //     setMsg("");
      if (data.salary === undefined) data.salary = 0;
      if (data.location === undefined) data.location = null;
      ApiService.transferEmpgeneral(
        data.employee,
        data.reportsTo,
        data.salary,
        data.location
      )
        .then((res) => {
          console.log(res);
          alert("promte transfer emp is successfully");
          navigate("/hr");
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
    if (type === "md") {
      console.log(data);

      // ApiService.TransferEmplo(data.employee, data.AssignToprom)
      //   .then((res) => {
      //     console.log(res);
      //     console.log(res.data);
      //     alert("transfer emp is successfully");
      //     setMsg("");
      if (data.salary === undefined) data.salary = 0;
      if (data.location === undefined) data.location = null;
      ApiService.transferEmpgeneral(
        data.employee,
        data.reportsTo,
        data.salary,
        data.location
      )
        .then((res) => {
          console.log(res);
          alert("promte transfer emp is successfully");
          navigate("/hr");
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
    if (type === "general_manager") {
      console.log(data);

      // ApiService.TransferEmplo(data.employee, data.AssignToprom)
      //   .then((res) => {
      //     console.log(res);
      //     console.log(res.data);
      //     alert("transfer emp is successfully");
      //     setMsg("");
      if (data.salary === undefined) data.salary = 0;
      if (data.location === undefined) data.location = null;
      ApiService.transferEmpgeneral(
        data.employee,
        data.reportsTo,
        data.salary,
        data.location
      )
        .then((res) => {
          console.log(res);
          alert("promte transfer emp is successfully");
          navigate("/hr");
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
  // })
  // .catch((error) => {
  //   console.log(error);
  //   alert(JSON.stringify(error));
  //   setMsg(
  //     error.response.data.errorMessage
  //       ? error.response.data.errorMessage
  //       : error.message
  //   );
  // });

  // };

  useEffect(() => {
    ApiService.getPromDesignations()
      .then((res) => {
        console.log(res.data);
        setPromdesg(res.data);
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

  useEffect(() => {
    if (type === "manager") {
      ApiService.generalTransferEmplloyee(sessionStorage.getItem("firstName"))

        .then((res) => {
          console.log(res.data);
          console.log(data);
          setGenManagerTransfer(res.data);
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
  }, []);

  const navigate = useNavigate();
  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/${type}`);
    //
  };

  let formData = [];
  if (type === "hr") {
    formData = [
      {
        id: "designationId",
        data: (
          <Form.Group className="mb-3 px-2">
            <Form.Label htmlFor="designationId">
              Choose designation <nobr />
              <span className="text-danger"> *</span>
            </Form.Label>
            <Form.Select
              id="empTypeId"
              aria-label="employee Type"
              className="selectInput"
              name="Designationid"
              onChange={handleChange}
            >
              <option value="">{status ? "loading" : "select "}</option>

              {promdesg?.map((type) => (
                <option key={type.typeName} value={type.desgId}>
                  {type.desgNames}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        ),
      },

      {
        id: "emp",
        data: (
          <Form.Group className="mb-3 px-2">
            <Form.Label htmlFor="emp">
              Select Employee
              <nobr />
              <span className="text-danger"> *</span>
            </Form.Label>
            <Form.Select
              id="emp"
              aria-label="employee Type"
              className="selectInput"
              name="selectEmployeeprom"
              onChange={handleChange}
            >
              <option value="">{status ? "loading" : "select "}</option>

              {selectempprom?.map((type) => (
                <option key={type.empId} value={type.lancesoft}>
                  {type.firstName}
                  {type.lancesoft}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        ),
      },
      // {
      //   id: "AssignEmp",
      //   data: (
      //     <Form.Group className="mb-3 px-2">
      //       <Form.Label htmlFor="AssignEmp">
      //         Assign Employee To
      //         <nobr />
      //       </Form.Label>
      //       <Form.Select
      //         id="AssignEmp"
      //         aria-label="employee Type"
      //         className="selectInput"
      //         name="AssignToprom"
      //         onChange={handleChange}
      //       >
      //         <option value="">{status ? "loading" : "select "}</option>
      //         {/* <option value="1">N/A</option> */}
      //         {assigntoprom?.map((type) => (
      //           <option key={type.typeName} value={type.lancesoft}>
      //             {type.firstName} {type.lastName}
      //             {type.lancesoft}
      //           </option>
      //         ))}
      //       </Form.Select>
      //     </Form.Group>
      //   ),
      // },
      {
        id: "location",
        title: "Location",
        name: "location",
        type: "text",
        placeholder: "Enter location",
        // required: true,
        defaultValue: data?.location,
        handleChange: handleChange,
      },
      {
        id: "salary",
        title: "Salary",
        name: "salary",
        type: "number",
        placeholder: "Enter salary",
        // required: true,
        defaultValue: data?.salary,
        handleChange: handleChange,
      },
      {
        id: "newSupervisor",
        data: (
          <Form.Group className="mb-3 px-2">
            <Form.Label htmlFor="emp">
              Primary Manager
              <nobr />
              <span className="text-danger"> *</span>
            </Form.Label>
            <Form.Select
              required
              id="newSupervisor"
              aria-label="newSupervisor"
              className="selectInput"
              name="Reportsto"
              onChange={handleChange}
            >
              <option value="">{status ? "loading" : "select "}</option>
              {/* <option value="1">N/A</option> */}
              {relEmpProm?.map((type) => (
                <option key={type.empId} value={type.lancesoft}>
                  {type.firstName} {type.lastName} {type.lancesoft}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        ),
      },
      {
        id: "secondarymanager",
        data: (
          <Form.Group className="mb-3 px-2">
            <Form.Label htmlFor="emp">
              Seconadary Manager
              <nobr />
              {/* <span className="text-danger"> *</span> */}
            </Form.Label>
            <Form.Select
              id="secondarymanager"
              aria-label="secondarymanager"
              className="selectInput"
              name="secondarymanager"
              onChange={handleChange}
            >
              <option value="">{status ? "loading" : "select "}</option>
              {/* <option value="1">N/A</option> */}
              {secondarytransfer?.map((type) => (
                <option key={type.empId} value={type.lancesoft}>
                  {type.firstName} {type.lastName} {type.lancesoft}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        ),
      },
    ];
  } else {
    formData = [
      // {
      //   id: "designationIdS",
      //   data: (
      //     <Form.Group className="mb-3 px-2">
      //       <Form.Label htmlFor="designationId">
      //         Choose designation <nobr />
      //         <span className="text-danger"> *</span>
      //       </Form.Label>
      //       <Form.Select
      //         required
      //         id="empTypeId"
      //         aria-label="employee Type"
      //         className="selectInput"
      //         name="empTypeId"
      //         onChange={handleChange}
      //       >
      //         <option value="">{status ? "loading" : "select "}</option>

      //         {genManagerTransfer?.map((type) => (
      //           <option key={type.typeName} value={type.desgId}>
      //             {type.desgNames}
      //             {/* {type.lancesoft} */}
      //             {type.desgNames}
      //           </option>
      //         ))}
      //       </Form.Select>
      //     </Form.Group>
      //   ),
      // },

      {
        id: "emp",
        data: (
          <Form.Group className="mb-3 px-2">
            <Form.Label htmlFor="emp">
              Select Employee
              <nobr />
              <span className="text-danger"> *</span>
            </Form.Label>
            <Form.Select
              required
              id="emp"
              aria-label="employee Type"
              className="selectInput"
              name="employee"
              onChange={handleChange}
            >
              <option value="">{status ? "loading" : "select "}</option>

              {genManagerTransfer?.map((type) => (
                <option key={type.empId} value={type.lancesoft}>
                  {type.firstName}
                  {type.lancesoft}
                  {type.desgNames}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        ),
      },

      // {
      //   id: "AssignEmp",
      //   data: (
      //     <Form.Group className="mb-3 px-2">
      //       <Form.Label htmlFor="AssignEmp">
      //         Assign Employee To
      //         <nobr />
      //       </Form.Label>
      //       <Form.Select
      //         id="AssignEmp"
      //         aria-label="employee Type"
      //         className="selectInput"
      //         name="AssignToprom"
      //         onChange={handleChange}
      //       >
      //         <option value="">{status ? "loading" : "select "}</option>
      //         {/* <option value="1">N/A</option> */}
      //         {generalAssignEmp?.map((type) => (
      //           <option key={type.typeName} value={type.lancesoft}>
      //             {type.firstName} {type.lastName}
      //             {type.lancesoft}
      //           </option>
      //         ))}
      //       </Form.Select>
      //     </Form.Group>
      //   ),
      // },
      {
        id: "location",
        title: "Location",
        name: "location",
        type: "text",
        placeholder: "Enter location",
        // required: true,
        defaultValue: data?.location,
        handleChange: handleChange,
      },
      {
        id: "salary",
        title: "Salary",
        name: "salary",
        type: "number",
        placeholder: "Enter salary",
        // required: true,
        defaultValue: data?.salary,
        handleChange: handleChange,
      },
      {
        id: "reportsToprom",
        data: (
          <Form.Group className="mb-3 px-2">
            <Form.Label htmlFor="reportsTo">
              Reports to
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

              {repoEmp?.map((type) => (
                <option key={type.empId} value={type.lancesoft}>
                  {type.firstName} {type.lastName} {type.lancesoft}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        ),
      },
    ];
  }
  return (
    <>
      <div class="p-3 mb-2 bg-primary text-white" style={{ color: "#1492E6" }}>
        TRANSFER EMPLOYEE
      </div>
      <div className="container-sm ">
        <h1 className="title text-center">Transfer Employee</h1>

        <Form onSubmit={handleSubmit}>
          <div className="transferform">
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
                    max={item.max}
                    maxLength={item.maxLength}
                    // min={item.min}
                  />
                )}
              </Fragment>
            ))}
          </div>
          <Button className="submit1" type="submit">
            Submit
          </Button>{" "}
          <Button variant="danger" onClick={handleCancel} className="cancel1">
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
      </div>
    </>
  );
}
