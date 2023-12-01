import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import ApiService from "../../services/ApiService";
// import { FormInputs } from "../formInputs/FormInputs";
import { FormInputs } from "../../components/formInputs/FormInputs";
import Select from "react-select";
function Recruiters() {
  const [status, setStatus] = useState(false);
  const [desgination, setDesgination] = useState(null);
  const [data, setData] = useState({});
  const [emp, setEmp] = useState(null);
  const [deleteto, setDeleteto] = useState(null);
  const [msg, setMsg] = useState(null);
  const [errors, setErrors] = useState(false);
  const [hiring, setHiring] = useState(null);
  const [desgs, setDesgs] = useState(null);
  const [selemp, setSelemp] = useState(null);

  const [clientname, SetClientname] = useState(null);
  const [assignnames, SetAssignnames] = useState(null);
  const [file, setFile] = useState("");
  const [jobdata, setJobdata] = useState(null);
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState();
  const [empIdNames, setEmpIdNames] = useState("");
  const [respList, setRespList] = useState(null);
  let type = sessionStorage.getItem("type");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangejob = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(data);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobdata({ ...jobdata, [name]: value });
    console.log(data);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/${type}`);
  };

  function handleSelect(names) {
    setSelectedOptions(names);
    let len = names.length;

    let str = "";
    setEmpIdNames("");
    if (len > 0) {
      names.map((item) => {
        console.log(item.value);
        str = str.concat("&empIds=");
        str = str.concat(item.value);
      });
    }
    setEmpIdNames(str);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(true);

    // const a = {
    //   budget: "a",
    //   closeDate: "b",
    //   jd: "c",
    //   openDate: "d",
    //   totalPosition: "e",
    // };

    const jobstring = encodeURIComponent(JSON.stringify(jobdata));
    console.log(jobdata);

    ApiService.jobstringsubmit(data.clientsId, empIdNames, jobstring, file);

    console.log(data);
    console.log(file);

    setStatus(false);
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
  // let id = data;
  // setStatus(false);
  // // setErrors(false);
  // setMsg("");
  // ApiService.jobstringsubmit(file, id)
  //   .then((res) => {
  //     console.log(data);
  //     alert(" resume upload successfull");
  //     setMsg("");
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     setStatus(false);
  //     // setErrors(true);
  //     setMsg(
  //       error.response.data.errorMessage
  //         ? error.response.data.errorMessage
  //         : error.message
  //     );
  //   });

  useEffect(() => {
    // if (type === "md") {
    ApiService.HiringType()
      .then((res) => {
        //  console.log(res.data);
        setHiring(res.data);
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
    ApiService.clientnames() //get client names dropdowm
      .then((res) => {
        console.log(res.data);
        SetClientname(res.data);
      })

      .catch((error) => {
        alert(JSON.stringify(error));
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });

    // if (type === "md") {
    ApiService.AssignName()
      .then((res) => {
        console.log(res.data);
        //SetAssignname(res.data);
        let arr = res.data?.map((item, index) => ({
          value: item.empId,
          label: item.name,
          // [0]?.value
        }));
        SetAssignnames(arr);
        console.log(arr);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  }, []);

  return (
    <div id="add-employee" className="container-sm ">
      <h1 className="title text-center">Create Job</h1>

      <Form>
        <div className="mb-3">
          <label htmlFor="email">Job Description </label>
          <textarea
            className="form-control"
            placeholder="text"
            type="text"
            name="jd"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email">Budget</label>
          <input
            className="form-control"
            placeholder="Enter Budget"
            type=""
            name="budget"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="chooseDesignation">
            Hiring Type
            <nobr />
            <span className="text-danger"> *</span>
          </label>
          <Form.Select
            id="Hiring"
            aria-label="employee Type"
            className="selectInput"
            name="Hiringtype"
            required
            // onChange={handleChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {/* <option value="1">N/A</option> */}
            {hiring?.map((type) => (
              <option key={type.desgNames} value={type.Hiringtype}>
                {type.typeName}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="mb-3">
          <label htmlFor="email">No of position </label>
          <input
            className="form-control"
            placeholder="Enter Budget"
            type=""
            name="totalPosition"
            onChange={handleChange}
          />
        </div>
        <div>Postion Open</div>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="firstName">Start Date</label>
            <input
              className="form-control"
              placeholder="First Name"
              type="date"
              name="openDate"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="lastName">End Date</label>
            <input
              className="form-control"
              placeholder="Last Name"
              type="date"
              name="closeDate"
              onChange={handleChange}
            />
          </div>
        </div>
        <br />
        <FormInputs
          id="pdfFile"
          title="Sample Resume"
          name="resume"
          type="file"
          // required={true}
          accept=".pdf"
          defaultValue={file}
          handleChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <div className="mb-3">
          <label htmlFor="chooseDesignation">
            Client Name
            <nobr />
            <span className="text-danger"> *</span>
          </label>
          <Form.Select
            id="clientname"
            aria-label="employee Type"
            className="selectInput"
            name="clientsId"
            // required
            onChange={handleChangejob}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {/* <option value="1">N/A</option> */}
            {clientname?.map((type) => (
              <option key={type.desgNames} value={type.clientsId}>
                {type.clientsNames}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="mb-3">
          <label htmlFor="chooseDesignation">
            Assign Name
            <nobr />
            <span className="text-danger"> *</span>
          </label>
          {/* <Form.Select
            id="chooseDesignation"
            aria-label="employee Type"
            className="selectInput"
            name="empId"
            // required
            onChange={handleChangejob}
          >
            <option value="">{status ? "loading" : "select "}</option>
          
            {assignname?.map((type) => (
              <option key={type.desgNames} value={type.empId}>
                {type.empId} {type.name}
              </option>
            ))}
          </Form.Select> */}
          <Select
            options={assignnames}
            placeholder="Select Responsibility"
            value={selectedOptions}
            isClearable
            onChange={handleSelect}
            isSearchable={true}
            isMulti
          ></Select>
        </div>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          send
        </Button>{" "}
      </Form>

      {status && (
        <p className="text-success mb-2">
          Please wait while we are processing your request.
        </p>
      )}
    </div>
  );
}
export default Recruiters;
