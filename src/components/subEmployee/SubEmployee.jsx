import React, { Fragment, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";
import ModelComponent from "../../modelComponent/ModelComponent";
// import EmployeeProfile from "../../pages/employeeProfile/EmployeeProfile";
import "./subEmployee.css";

export default function SubEmployee({ id }) {
  let type = sessionStorage.getItem("type");
  //   const [status, setStatus] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [viewEmployee, setViewEmployee] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [subEmp, setSubEmp] = useState(false);
  const [subEmpId, setSubEmpId] = useState("");
  const [data, setData] = useState({});

  const navigate = useNavigate();

  const handleClick = (id) => {
    setSubEmpId(id);
    setSubEmp(true);
    setModalShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <ModelComponent
        data={subEmpId}
        type={type}
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
      />

      <Button
        className="card-btn"
        onClick={(e) => {
          e.preventDefault();
          setViewEmployee(!viewEmployee);
          ApiService.getUnderEmployee(id)
            .then((res) => {
              console.log(res.data);
              setEmployee(res.data);
              setSubEmp(true);
            })
            .catch((err) => {
              console.log(err);
              setSubEmp(false);
            });
        }}
      >
        {viewEmployee ? "Hide" : "View Employees"}
      </Button>
      <Button
        className="btn-danger"
        onClick={(e) => {
          e.preventDefault();
          navigate("/hr/editEmployee", { state: { empId: id, name: "" } });
        }}
      >
        EDIT
      </Button>

      {viewEmployee &&
        ["manager", "general_manager", "ch", "md", "hr"].includes(type) && (
          <div className="listEmp">
            {subEmp && employee?.length === 0 && (
              <span className="employees">
                <br />
                No Employees
              </span>
            )}
            {employee?.map((emp, index) => (
              <Fragment key={index}>
                <span
                  className="listOfEmp"
                  onClick={() => handleClick(emp.empId)}
                >
                  {index + 1}.{" "}
                  <nobr>
                    {emp.firstName}
                    {emp.lastName}
                  </nobr>
                </span>

                <br />
              </Fragment>
            ))}
          </div>
        )}
    </div>
  );
}
