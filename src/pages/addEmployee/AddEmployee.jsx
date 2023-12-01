import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FormInputs } from "../../components/formInputs/FormInputs";

import ApiService from "../../services/ApiService";

import "./addEmployee.css";

const AddEmployee = () => {
  const [data, setData] = useState({});
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");
  const [empTypes, setEmpTypes] = useState(null);
  const [desgs, setDesgs] = useState(null);
  const [addTypes, setAddTypes] = useState(null);
  const [departs, setDeparts] = useState(null);
  const [subDep, setSubDep] = useState(null);
  const [supId, setSupId] = useState(null);
  const [file, setFile] = useState("");
  const [primarydesg, setPrimarydesg] = useState(null);
  const [primaryMgr, setPrimaryMgr] = useState(null);
  const [pic, setPic] = useState("");

  const [technology, setTechnology] = useState(null);

  // const [errors, setErrors] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    if (value > 0 && name === "desgId") {
      ApiService.supervisorId(value)
        .then((res) => {
          console.log(res.data);
          setSupId(res.data);
          setMsg("");
        })
        .catch((error) => {
          // console.log(error);
          alert(JSON.stringify(error));
          setSupId(null);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
    if (value > 0 && name === "supervisorId") {
      // primary manager
      console.log(value);

      ApiService.primarydesgs(value)
        .then((res) => {
          console.log(res.data);
          setPrimarydesg(res.data);
          setMsg("");
        })
        .catch((error) => {
          // console.log(error);
          alert(JSON.stringify(error));
          setPrimarydesg(null);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
    if (value > 0 && name === "desg") {
      console.log(value);
      setPrimaryMgr(value);
      console.log(data.primaryMgr);
    }
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(true);
    // setErrors(false);

    ApiService.insertEmployee(
      data,

      primaryMgr || 0
    )
      .then((res) => {
        console.log(res.data);
        alert("employee details successfull");

        let id = res.data;
        setStatus(false);
        // setErrors(false);
        setMsg("");
        ApiService.AddResume(file, id)
          .then((res) => {
            console.log(res.data);
            alert(" resume upload successfull");
            setMsg("");
            ApiService.AddImage(pic, id)
              .then((res) => {
                console.log(res.data);
                alert("photo upload successfully");
                setMsg("");
                navigate("/hr");
              })
              .catch((error) => {
                console.log(error);
                setStatus(false);
                // setErrors(true);
                setMsg(
                  error.response.data.errorMessage
                    ? error.response.data.errorMessage
                    : error.message
                );
              });
          })
          .catch((error) => {
            console.log(error);
            setStatus(false);
            // setErrors(true);
            setMsg(
              error.response.data.errorMessage
                ? error.response.data.errorMessage
                : error
            );
          });
      })
      .catch((error) => {
        console.log(error);
        setStatus(false);
        // setErrors(true);
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  };

  const handleMasterData = (e) => {
    setData({
      ...data,
      masterEmployeeDetails: {
        ...data.masterEmployeeDetails,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleAddressData = (e) => {
    setData({
      ...data,
      address: {
        ...data.address,
        [e.target.name]: e.target.value,
      },
    });
  };
  const handleSalary = (e) => {
    setData({
      ...data,
      salary: {
        ...data.salary,
        [e.target.name]: e.target.value,
      },
    });
  };
  useEffect(() => {
    ApiService.getTechnology()
      .then((res) => {
        console.log(res.data);
        setTechnology(res.data);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error));
        setTechnology(null);
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });

    ApiService.empType()
      .then((res) => {
        console.log(res.data);
        setEmpTypes(res.data);
        setStatus(false);
        // setErrors(false);
      })
      .catch((error) => {
        console.log(error);
        setEmpTypes(null);
        setStatus(false);
        // setErrors(true);
      });

    ApiService.getAllDesg()
      .then((res) => {
        console.log(res.data);
        setDesgs(res.data);
      })
      .catch((error) => {
        console.log(error);
        setDesgs(null);
      });
    ApiService.getAllAddType()
      .then((res) => {
        console.log(res.data);
        setAddTypes(res.data);
      })
      .catch((error) => {
        console.log(error);
        setAddTypes(null);
      });
    ApiService.getAllSubDepart()
      .then((res) => {
        console.log(res.data);
        setSubDep(res.data);
      })
      .catch((error) => {
        console.log(error);
        setSubDep(null);
      });

    ApiService.getAllDepart()
      .then((res) => {
        console.log(res.data);
        setDeparts(res.data);
      })
      .catch((error) => {
        console.log(error);
        setDeparts(null);
      });
  }, []);

  const formData = [
    {
      id: "firstName",
      title: "First Name",
      name: "firstName",
      type: "text",
      placeholder: "Enter First Name",
      required: true,
      defaultValue: data.masterEmployeeDetails?.firstName,
      handleChange: handleMasterData,
    },
    {
      id: "lastName",
      title: "Last Name",
      name: "lastName",
      type: "text",
      placeholder: "Enter Last Name",
      required: true,
      defaultValue: data.masterEmployeeDetails?.lastName,
      handleChange: handleMasterData,
    },

    {
      id: "email",
      title: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter Email",
      required: true,
      defaultValue: data.masterEmployeeDetails?.email,
      handleChange: handleMasterData,
    },
    {
      id: "phoneNo",
      title: "Phone Number",
      name: "phoneNo",
      maxLength: "10",
      pattern: "[0-9]{10}",
      message: "Please enter valid phone number",
      type: "tel",
      placeholder: "Enter Phone Number",
      required: true,
      defaultValue: data.masterEmployeeDetails?.phoneNo,
      handleChange: handleMasterData,
    },

    {
      id: "location",
      title: "Work Location",
      name: "location",
      type: "text",
      placeholder: "Enter Location",
      required: true,
      defaultValue: data.masterEmployeeDetails?.location,
      handleChange: handleMasterData,
    },
    {
      id: "empTypeId",
      data: (
        <Form.Group className="mb-3 px-2" id="">
          <Form.Label htmlFor="empTypeId">
            Employee Type <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="empTypeId"
            aria-label="employee Type"
            className="selectInput"
            name="empTypeId"
            onChange={handleChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {/* <option value="1">N/A</option> */}
            {empTypes?.map((type) => (
              <option key={type.typeName} value={type.empTypeId}>
                {type.typeName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },

    {
      id: "status",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="status">
            Status
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="status"
            aria-label="status"
            className="selectInput"
            name="status"
            onChange={handleMasterData}
          >
            <option value="">select</option>
            <option value="BENCH">BENCH</option>
            <option value="CLIENT_SIDE">CLIENT_SIDE</option>
            <option value="INTERNAL">INTERNAL</option>
            <option value="ADMIN">ADMIN</option>

            <option value="MANAGMENT">MANAGMENT</option>
          </Form.Select>
        </Form.Group>
      ),
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
            <option value="0">N/A</option>
            {departs?.map((type) => (
              <option key={type.depart} value={type.departId}>
                {type.depart}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },
    {
      id: "subDepartId",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="subDepartId">
            Sub Department
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="subDepartId"
            aria-label="Sub department"
            className="selectInput"
            name="subDepartId"
            onChange={handleChange}
          >
            <option value="">{status ? "loading..." : "select "}</option>
            <option value="0">N/A</option>
            {subDep?.map((type) => (
              <option key={type.subDepartmentNames} value={type.subDepartId}>
                {type.subDepartmentNames}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },
    {
      id: "vertical",
      title: "Vertical",
      name: "vertical",
      type: "text",
      placeholder: "Enter Vertical",
      required: true,
      defaultValue: data.masterEmployeeDetails?.vertical,
      handleChange: handleMasterData,
    },

    {
      id: "lancesoft",
      title: "Lancesoft ID",
      name: "lancesoft",
      pattern: "[LSI]{3}[0-9]{3,5}",
      type: "text",
      placeholder: "Enter Lancesoft Id",
      message: "Please enter valid Lancesoft Id i.e. LSI123",
      required: true,
      defaultValue: data.masterEmployeeDetails?.lancesoft,
      handleChange: handleMasterData,
    },

    {
      id: "technology",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="ClientName">
            Technology1
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="technology"
            aria-label="Client Name"
            className="selectInput"
            name="technology"
            onChange={handleChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {technology?.map((type) => (
              <option key={type.technology} value={type.id}>
                {type.technology}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },
    {
      id: "technology2",
      title: "Technololgy2",
      name: "technology2",
      type: "text",
      placeholder: "Enter technology",

      defaultValue: data.masterEmployeeDetails?.technology2,
      handleChange: handleMasterData,
    },
    {
      id: "desgId",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="desgId">
            Employee Designation
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="desgId"
            aria-label="employee designation"
            className="selectInput"
            name="desgId"
            onChange={handleChange}
          >
            <option value="">{status ? "loading..." : "select "}</option>
            {desgs?.map((type) => (
              <option key={type.desgId} value={type.desgId}>
                {type.name}
                {type.desgNames}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },
    {
      id: "supervisorId",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="supervisorId">
            {/* Supervisor */}
            Primary Manager Designation
            <nobr />
          </Form.Label>
          <Form.Select
            id="supervisorId"
            aria-label="Supervisor Id"
            className="selectInput"
            name="supervisorId"
            onChange={handleChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
            <option value="0">N/A</option>
            {supId?.map((type) => (
              <option key={type.lancesoftId} value={type.desgId}>
                {type.firstName} {type.lastName} {type.desgNames}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },
    {
      id: "desg",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="selectManager">
            {/* Supervisor */}
            Primary Manager
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="desg"
            aria-label="Supervisor Id"
            className="selectInput"
            name="desg"
            onChange={handleChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
            <option value="0">N/A</option>
            {primarydesg?.map((type) => (
              <option key={type.lancesoftId} value={type.empId}>
                {type.name} ({type.lancesoftId})
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },

    {
      id: "country",
      title: "Country",
      name: "country",
      type: "text",
      placeholder: "Enter Country",
      required: true,
      defaultValue: data.address?.country,
      handleChange: handleAddressData,
    },
    {
      id: "state",
      title: "State",
      name: "state",
      type: "text",
      placeholder: "Enter State",
      required: true,
      defaultValue: data.address?.state,
      handleChange: handleAddressData,
    },
    {
      id: "city",
      title: "City",
      name: "city",
      type: "text",
      placeholder: "Enter City",
      required: true,
      defaultValue: data.address?.city,
      handleChange: handleAddressData,
    },
    {
      id: "street",
      title: "Street",
      name: "street",
      type: "text",
      placeholder: "Enter Street",
      required: true,
      defaultValue: data.address?.street,
      handleChange: handleAddressData,
    },
    {
      id: "zipCod",
      title: "Pincode",
      name: "zipCod",
      type: "tele",
      placeholder: "Enter Pincode",
      maxLength: "6",
      pattern: "[0-9]{6}",
      required: true,
      defaultValue: data.address?.zipCod,
      handleChange: handleAddressData,
    },

    {
      id: "addTypeId",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="addTypeId">
            Address Type
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="addTypeId"
            aria-label="addressType"
            className="selectInput"
            name="addTypeId"
            onChange={handleChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {addTypes?.map((type) => (
              <option key={type.addType} value={type.addTypeId}>
                {type.addType}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },

    {
      id: "salary",
      title: "Salary",
      name: "salary",
      type: "number",
      placeholder: "Enter Salary",
      required: true,
      defaultValue: data.salary,
      handleChange: handleSalary,
    },
    {
      id: "joiningDate",
      data: (
        <FormInputs
          id="joiningDate"
          title="Joining Date"
          name="joiningDate"
          type="date"
          required={true}
          defaultValue={data.masterEmployeeDetails?.joiningDate}
          handleChange={handleMasterData}
        />
      ),
    },
    {
      id: "dob",
      data: (
        <FormInputs
          id="dob"
          title="Date Of Birth"
          name="dob"
          type="date"
          placeholder="Enter Date of Birth"
          required={true}
          max="2022-07-31"
          defaultValue={data.masterEmployeeDetails?.dob}
          handleChange={(e) => {
            setData({
              ...data,
              masterEmployeeDetails: {
                ...data.masterEmployeeDetails,
                dob: e.target.value,
              },
            });
          }}
        />
      ),
    },
    {
      id: "gender",
      data: (
        <Form.Group className="my-4 checkbox">
          <Form.Label>
            Gender <nobr />
            
            <span className="text-danger"> *</span> :
         
          <Form.Check
            required
            inline
            label="Male"
            name="gender"
            type="radio"
            defaultValue={data.gender}
            onChange={(e) => {
              setData({
                ...data,
                masterEmployeeDetails: {
                  ...data.masterEmployeeDetails,
                  [e.target.name]: "Male",
                },
              });
            }}
          />
          <Form.Check
            inline
            label="Female"
            name="gender"
            type="radio"
            defaultValue={data.gender}
            onChange={(e) => {
              setData({
                ...data,
                masterEmployeeDetails: {
                  ...data.masterEmployeeDetails,
                  [e.target.name]: "Female",
                },
              });
            }}
          />
          </Form.Label>
        </Form.Group>
        
      ),
    },
 
    {
      id: "pdf",
      data: (
        <FormInputs
          id="pdfFile"
          title="Resume"
          name="resume"
          type="file"
          required={true}
          accept=".pdf"
          defaultValue={file}
          handleChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        
      ),
    },

    {
      id: "pic",
      data: (
        <FormInputs
          id="picture"
          title="Picture"
          name="picture"
          type="file"
          required={true}
          accept=".png, .jpg, .jpeg"
          defaultValue={pic}
          handleChange={(e) => {
            setPic(e.target.files[0]);
          }}
        />
      ),
    },
  ];
  return (
    <>
      <div className="conatiner-large">
        <div id="" className=" sind container-sm ">
          <h1 className="title text-left"><b>Create New Employee</b></h1>

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
                      max={item.max}
                      maxLength={item.maxLength}
                      // min={item.min}
                    />
                  )}
                </Fragment>
              ))}
            </div>
            <Button className="submit3" type="submit">
              Submit
            </Button>{" "}
            <Button as={Link} to="/hr" variant="danger" className="cancel3">
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
      </div>
    </>
  );
};

export default AddEmployee;
