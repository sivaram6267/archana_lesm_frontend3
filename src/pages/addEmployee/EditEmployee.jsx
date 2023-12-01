import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FormInputs } from "../../components/formInputs/FormInputs";
import { useLocation } from "react-router-dom";

import ApiService from "../../services/ApiService";

import "./addEmployee.css";

const EditEmployee = () => {
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
  const [pic, setPic] = useState("");
  const [primarydesg, setPrimarydesg] = useState(null);
  const [primaryMgr, setPrimaryMgr] = useState(null);
  const [technologys, setTechnologys] = useState(null);

  const [apistatus, setApistatus] = useState(false);

  const location = useLocation();
  //console.log(location.state.empId);
  let gDesId = 0;
  let gMgrDesId = 0;
  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(name + " value: " + value)
    setData({ ...data, [name]: value });

    if (value > 0 && name === "designations") {
      console.log(value);
      ApiService.supervisorIdmanager(value) //Primary Manager Designation  api
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
      console.log(value);
      ApiService.primarydesgsination(value) //list of primary manager
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
    if (name === "supervisor") {
      console.log(value);
      setPrimaryMgr(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(true);
    console.log("*********");
    console.log(data);
    // setErrors(false);
    ApiService.updateEmployee(data, location.state.empId, primaryMgr)
      .then((res) => {
        //console.log(res.data)
        alert("employee update details successfull");
        let id = res.data;
        //let id = res.data
        setStatus(false);

        // setErrors(false);

        setMsg("");

        if (file) {
          ApiService.UpdateResume(file, data.masterEmployeeDetails?.lancesoft)
            .then((res) => {
              console.log(res.data);
              alert(" resume upload successfull");
              setMsg("");
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
        }

        if (pic) {
          ApiService.UpdateImage(pic, data.masterEmployeeDetails?.lancesoft)
            .then((res) => {
              console.log(res.data);
              alert("photo upload successfully");
              setMsg("");
              //navigate("/hr")
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
        }
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

  // useEffect(() => {

  // },[apistatus])

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

  useEffect(() => {
    ApiService.getEmployeeforUpdate(location.state.empId)
      .then((res) => {
        console.log(res.data);
        setData(res.data);

        gDesId = res.data.designations;
        gMgrDesId = res.data.supervisorDesig;
        console.log(gDesId);
        console.log(gMgrDesId);
      })
      .then(() => {
        ApiService.supervisorIdmanager(gDesId) //primary manager designation
          .then((res) => {
            console.log(res.data);
            setSupId(res.data);
            setMsg("");
            //gMgrDesId = data.supervisor;
            console.log(gMgrDesId);
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
      })
      .then(() => {
        console.log(gMgrDesId);
        ApiService.primarydesgsination(gMgrDesId) //list of primary managers
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
      })
      .catch((err) => {
        console.log(err);
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
    ApiService.getTechnologys()
      .then((res) => {
        console.log(res.data);
        setTechnologys(res.data);
      })
      .catch((error) => {
        console.log(error);
        setTechnologys(null);
      });
  }, []);

  const formData = [
    {
      id: "firstName",
      title: "First name",
      name: "firstName",
      type: "text",
      placeholder: "Enter Employee first name",
      required: true,
      defaultValue: data.masterEmployeeDetails?.firstName,
      handleChange: handleMasterData,
    },
    {
      id: "lastName",
      title: "Last name",
      name: "lastName",
      type: "text",
      placeholder: "Enter Employee last name",
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
      //pattern: "[0-9]{10}",
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
      placeholder: "Enter location",
      required: true,
      defaultValue: data.masterEmployeeDetails?.location,
      handleChange: handleMasterData,
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
            value={data.masterEmployeeDetails?.status}
            required
            id="status"
            aria-label="status"
            className="selectInput"
            name="status"
            onChange={handleMasterData}
          >
            <option value="BENCH">BENCH</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INTERNAL">INTERNAL</option>
            <option value="CLIENT_SIDE">CLIENT_SIDE</option>
            <option value="MANAGMENT">MANAGMENT</option>
            <option value="ADMIN">ADMIN</option>
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
            name="departments"
            onChange={handleChange}
          >
            <option value="0">N/A</option>
            {departs?.map((type) => (
              <option
                key={type.depart}
                value={type.departId}
                selected={type.departId === data.departments}
              >
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
            Sub-department
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="subDepartId"
            aria-label="Sub department"
            className="selectInput"
            name="subDepartments"
            onChange={handleChange}
          >
            <option value="0">N/A</option>
            {subDep?.map((type) => (
              <option
                key={type.subDepartmentNames}
                value={type.subDepartId}
                selected={type.subDepartId === data.subDepartments}
              >
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
      placeholder: "Enter vertical",
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
          <Form.Label htmlFor="technology">
            Technology1
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="id"
            aria-label="technology"
            className="selectInput"
            name="technology1"
            onChange={handleChange}
          >
            {/* <option value="0">N/A</option>  */}
            {technologys?.map((type) => (
              <option
                key={type.technology}
                value={type.id}
                selected={type.id === data.technology1}
              >
                {type.technology}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },

    {
      id: "technology2",
      title: "Technology2",
      name: "technology2",
      type: "text",
      placeholder: "Enter technology2",
      required: true,
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
            id="desgId"
            aria-label="employee designation"
            className="selectInput"
            name="designations"
            onChange={handleChange}
          >
            {desgs?.map((type) => (
              <option
                key={type.desgId}
                value={type.desgId}
                selected={type.desgId === data.designations}
              >
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
            <span className="text-danger">*</span>
          </Form.Label>
          <Form.Select
            required
            id="supervisorId"
            aria-label="Supervisor Id"
            className="selectInput"
            name="supervisorId"
            onChange={handleChange}
          >
            {/* <option value="">{status ? "loading" : "select "}</option>
            <option value="0">N/A</option> */}
            <option value="0">N/A</option>
            {supId?.map((type) => (
              <option
                key={type.desgId}
                value={type.desgId}
                selected={type.desgId === data.supervisorDesig}
              >
                {type.desgNames}
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
            name="supervisor"
            onChange={handleChange}
          >
            {/* <option value="">{status ? "loading" : "select "}</option>
            <option value="0">N/A</option> */}
            <option value="0">N/A</option>
            {primarydesg?.map((type) => (
              <option
                key={type.desgId}
                value={type.empId}
                selected={type.desgId === data.supervisor}
              >
                {type.name}
                {type.lancesoftId}
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
      //defaultValue: data.address != null ? data.address[0]?.country : "",
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
      //defaultValue: data.address != null ? data.address[0]?.state : "",
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
      //defaultValue: data.address != null ? data.address[0]?.city : "",
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
      //defaultValue: data.address != null ? data.address[0]?.street : "",
      defaultValue: data.address?.street,
      handleChange: handleAddressData,
    },
    {
      id: "zipCod",
      title: "Pincode",
      name: "zipCod",
      type: "number",
      placeholder: "Enter pinCode",
      required: true,
      //defaultValue: data.address != null ? data.address[0]?.zipCod : "",
      defaultValue: data.address?.zipCod,
      handleChange: handleAddressData,
    },

    {
      id: "salary",
      title: "Salary",
      name: "salary",
      type: "number",
      placeholder: "Enter Salary",
      required: true,
      defaultValue: data.salary,
      handleChange: handleChange,
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
          title="Date of Birth"
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
            Gender
            <span className="text-danger"> *</span>:
          </Form.Label>
          <Form.Check
            required
            inline
            label="Male"
            name="gender"
            type="radio"
            checked={data.masterEmployeeDetails?.gender === "Male"}
            //defaultValue={data.masterEmployeeDetails?.gender}
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
            checked={data.masterEmployeeDetails?.gender === "Female"}
            //defaultValue={data.masterEmployeeDetails?.gender}
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
          accept=".pdf"
          defaultValue={file}
          handleChange={(e) => {
            if (e.target.files[0]) setFile(e.target.files[0]);
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
          accept=".png, .jpg, .jpeg"
          defaultValue={pic}
          handleChange={(e) => {
            if (e.target.files[0]) setPic(e.target.files[0]);
          }}
        />
      ),
    },
  ];
  return (
    <div id="" className="container-sm ">
      <h1 className="title text-center">Edit Employee Details</h1>

      <Form id="my-5" onSubmit={handleSubmit}>
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
        <Button className="btn-signup px-2" type="submit">
          Save
        </Button>
        &emsp;
        <Button as={Link} to="/hr" variant="danger" className="px-2">
          Back
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
  );
};

export default EditEmployee;
