import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Dropdown, Form, Nav, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LancesoftWhiteLogo from "../../images/LancesoftWhiteLogo.svg";
import ApiService from "../../services/ApiService";
import ModelComponent from "../../modelComponent/ModelComponent";
import lance_logo from "../../images/lance_logo.png";
import home from "../../images/home.svg";
import client from "../../images/client.svg";
import jobs from "../../images/jobs.svg";
import myprofile from "../../images/myprofile.svg";
import employeeinfo from "../../images/employeeinfo.svg";
import userprofiles from "../../images/userprofiles.svg";
import "./header.css";
import { FormControl, NavDropdown, Button } from "react-bootstrap";
export default function Header({ view }) {
  const [from, setFrom] = useState(new Date().toISOString().substring(0, 10));

  const [msg, setMsg] = useState("");
  let type = sessionStorage.getItem("type");
  let user = sessionStorage.getItem("firstName");
  let navPath = `/${type}`;
  // console.log(type);
  let id = sessionStorage.getItem("Id");
  const [modalShow, setModalShow] = useState(false);
  const [total, setTotal] = useState(0);
  const [token, setToken] = useState(sessionStorage.getItem("Access_Token"));
  const [data, setData] = useState({});
  const [status, setStatus] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [IsPagination, setIsPagination] = useState();
  const [page, setpage] = useState();
  const [search, setSearch] = useState();
  const handlefunction = () => {
    sessionStorage.clear();
    // alert(`Logout Successful`);
    setToken((data) => (data = sessionStorage.getItem("Access_Token")));
  };
  const handleOnClick = () => {
    setModalShow(true);
  };
  const navigate = useNavigate();

  useEffect(() => {
    setMsg();
    if (type === "lead") {
      console.log(data);
      ApiService.totalLead({
        fromDate: "",
        toDate: "",
      })
        .then((res) => {
          console.log(res.data);
          // alert("successfully");
          setTotal(res.data);
        })
        .catch((error) => {
          console.log(error);
          setTotal(0);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
    if (type === "manager") {
      ApiService.totalManager({
        fromDate: "",
        toDate: "",
      })
        .then((res) => {
          console.log(res.data);
          // alert(" manager successfully");
          setTotal(res.data);
        })
        .catch((error) => {
          console.log(error);
          setTotal(0);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
    if (type === "general_manager") {
      ApiService.totalGeneralManager({
        fromDate: "",
        toDate: "",
      })
        .then((res) => {
          console.log(res.data);
          setTotal(res.data);
        })
        .catch((error) => {
          console.log(error);
          setTotal(0);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
    if (type === "vicePresident") {
      ApiService.totalvicepresident({
        fromDate: "",
        toDate: "",
      })
        .then((res) => {
          console.log(res.data);
          setTotal(res.data);
        })
        .catch((error) => {
          console.log(error);
          setTotal(0);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
    if (type === "ch") {
      ApiService.totalCH({
        fromDate: "",
        toDate: "",
      })
        .then((res) => {
          console.log(res.data);
          setTotal(res.data);
        })
        .catch((error) => {
          console.log(error);
          setTotal(0);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }

    if (type === "md") {
      ApiService.totalMD({
        fromDate: "",
        toDate: "",
      })
        .then((res) => {
          console.log(res.data);
          setTotal(res.data);
        })
        .catch((error) => {
          console.log(error);
          setTotal(0);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }

    if (type === "hr") {
      ApiService.totalManagers()
        .then((res) => {
          console.log(res.data);
          // alert(" manager successfully");
          setTotal(res.data);
        })
        .catch((error) => {
          console.log(error);
          setTotal(0);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
  }, [type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleChanges = (e) => {
    console.log();
    const { name, value } = e.target;
    console.log(value);
    setSearch({ ...data, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(true);
    if (type === "lead") {
      ApiService.totalLead(data)
        .then((res) => {
          console.log(res.data);
          alert("successfully");
          setTotal(res.data);
        })
        .catch((error) => {
          console.log(error);
          setTotal(0);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
    if (type === "manager") {
      ApiService.totalManager(data)
        .then((res) => {
          console.log(res.data);
          alert(" manager successfully");
          setTotal(res.data);
        })
        .catch((error) => {
          console.log(error);
          setTotal(0);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
    if (type === "general_manager") {
      ApiService.totalGeneralManage(data)
        .then((res) => {
          console.log(res.data);
          setTotal(res.data);
        })
        .catch((error) => {
          console.log(error);
          setTotal(0);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
    if (type === "vicePresident") {
      ApiService.totalvicepresident(data)
        .then((res) => {
          console.log(res.data);
          setTotal(res.data);
        })
        .catch((error) => {
          console.log(error);
          setTotal(0);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
    if (type === "ch") {
      ApiService.totalCH(data)
        .then((res) => {
          console.log(res.data);
          setTotal(res.data);
        })
        .catch((error) => {
          console.log(error);
          setTotal(0);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }

    if (type === "md") {
      ApiService.totalMD(data)
        .then((res) => {
          console.log(res.data);
          setTotal(res.data);
        })
        .catch((error) => {
          console.log(error);
          setTotal(0);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();

    console.log(search.search);

    navigate("/hr/datatable", {
      state: { seachStr: search.search },
    });
  };

  return (
    <>
      {/* <Navbar bg="light" expand="lg"> */}
      <Navbar class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div class="container-fluid">
          <Navbar.Brand style={{ marginLeft: "50px" }}>
            <Link to={view === "Home" ? "/" : navPath} id={`navbar-brand`}>
              <img src={lance_logo} className="icon" alt="lancesoft_logo" />
            </Link>
          </Navbar.Brand>
        
          {view === "Home" ? (
            <>
              <Nav id="nav">
                <Link className="m-2" to="/" id="nav-link">
                 
                </Link>
                <Link className="m-2" to="/login" id="nav-link">
                 
                </Link>
              </Nav>
            </>
          ) : (
          
            <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {/* <Nav.Link href="#home">Home</Nav.Link> */}
              <Nav id="nav">
              {[null, undefined].includes(token) && (
                    <Link className="m-2" to="/" id="nav-link">
                      Login
                    </Link>
                  )}
                  {![null, undefined].includes(token) &&
                    (["finance"].includes(type) ? (
                      <>
                        <Dropdown>
                          <Dropdown.Toggle
                            className="toggle"
                            variant=""
                          
                          >
                            <p id="nav-link" className="username">
                              Domestic
                            </p>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Row>
                              <Link
                                className="m-2"
                                to="/finance/clientDomestic"
                                id="nav-link"
                              >
                                Client Domestic
                              </Link>
                              <Link
                                className="m-2"
                                to="/finance/internalDomestic"
                                id="nav-link"
                              >
                                Internal Domestic
                              </Link>
                            </Row>
                          </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                          <Dropdown.Toggle
                            className="toggle"
                            variant=""
                            // id="dropdown-basic dropdownMenu dropdown-autoclose-true "
                          >
                            <p id="nav-link" className="username">
                              International
                            </p>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Row>
                              <Link
                                className="m-2"
                                to="/finance/clientInternational"
                                id="nav-link"
                              >
                                Client International
                              </Link>
                              <Link
                                className="m-2"
                                to="/finance/internalInternational"
                                id="nav-link"
                              >
                                Internal International
                              </Link>
                            </Row>
                          </Dropdown.Menu>
                        </Dropdown>
                      </>
                    ) : ["hr"].includes(type) ? (
                      <>
                       <Nav id="nav">
                <Link
                  className="m-2"
                  to={view === "Home" ? "/" : navPath}
                  id="nav-link"
                >
                  <img src={home} className="icon" alt="lancesoft_logo" />
                  Home
                </Link>
              </Nav>

              <ul class="dropdown-menu">
                <li>
                  <a href="#">HTML</a>
                </li>
                <li>
                  <a href="#">CSS</a>
                </li>
                <li>
                  <a href="#">JavaScript</a>
                </li>
              </ul>
              <Dropdown>
                <Dropdown.Toggle
                  className="toggle"
                  variant=""
                  id="dropdown-basic dropdownMenu dropdown-autoclose-true "
                >
                  <p id="nav-link" className="username1">
                    <img src={client} className="icon" alt="lancesoft_logo" />
                    &nbsp; Client
                  </p>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Row>
                    <Link
                      className="m-2"
                      to="/manager/addClientDetails"
                      id="nav-link"
                    >
                      Add Client details
                    </Link>
                    <Link
                      className="m-2"
                      to="/manager/addClientNames"
                      id="nav-link"
                    >
                      Add Client Names
                    </Link>
                    <Link
                      className="m-2"
                      to="/manager/editClientDetails"
                      id="nav-link"
                    >
                      Edit Client details
                    </Link>
                  </Row>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown>
                <Dropdown.Toggle
                  className="toggle"
                  variant=""
                  id="dropdown-basic dropdownMenu dropdown-autoclose-true "
                >
                  {/* <img src={profilepic} alt="profile" className="img" /> */}
                  <p id="nav-link" className="username">
                    <img src={jobs} className="icon" alt="lancesoft_logo" />
                    &nbsp; Jobs
                  </p>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Row>
                    <Link className="m-2" to="/hr/Recruiters" id="nav-link">
                      Create Job
                    </Link>
                    <Link className="m-2" to="/recruiter" id="nav-link">
                      Posted Jobs
                    </Link>
                    <Link className="m-2" to="/hr/taggedJobs" id="nav-link">
                      Tagged Jobs
                    </Link>
                  </Row>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown>
                <Dropdown.Toggle
                  className="toggle"
                  variant=""
                  id="dropdown-basic dropdownMenu dropdown-autoclose-true "
                >
                  {/* <img src={profilepic} alt="profile" className="img" /> */}
                  <p id="nav-link" className="username">
                    <img
                      src={userprofiles}
                      className="icon"
                      alt="lancesoft_logo"
                    />
                    &nbsp; Employee
                  </p>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Row>
                    <Link className="m-2" to="/hr/addEmployee" id="nav-link">
                      Create Employee
                    </Link>
                    <Link className="m-2" to="/hr/register" id="nav-link">
                      Create Credentials
                    </Link>

                    <Link className="m-2" to="/transferEmployee" id="nav-link">
                      Transfer Employee
                    </Link>
                    <Link className="m-2" to="/hr/exitEmployee" id="nav-link">
                      Release Employee
                    </Link>
                    <Link
                      className="m-2"
                      to="/hr/subordinatesupervisior"
                      id="nav-link"
                    >
                      Secondary Manager
                    </Link>
                    <Link
                      className="m-2"
                      to="/hr/AbscondEmployee"
                      id="nav-link"
                    >
                      Abscond Employee
                    </Link>

                    <Link className="m-2" to="/hr/deleteEmployee" id="nav-link">
                      Delete Employee
                    </Link>
                    <Link
                      className="m-2"
                      to="/hr/terminateEmployee"
                      id="nav-link"
                    >
                      Terminate Employee
                    </Link>
                    <Link className="m-2" to="/hr/updatesalary" id="nav-link">
                      Update Salary
                    </Link>
                    <Link className="m-2" to="/hr/PromoteDemote" id="nav-link">
                      Promote / Demote
                    </Link>
                    <Link className="m-2" to="/hr/AddAllowance" id="nav-link">
                      Add Allowance
                    </Link>
                    <Link
                      className="m-2"
                      to="/hr/assignResponsibilities"
                      id="nav-link"
                    >
                      AssignResponsibilities
                    </Link>
                  </Row>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle
                  className="toggle"
                  variant=""
                  id="dropdown-basic dropdownMenu dropdown-autoclose-true "
                >
                  {/* <img src={profilepic} alt="profile" className="img" /> */}
                  <p id="nav-link" className="username">
                    <img
                      src={employeeinfo}
                      className="icon"
                      alt="lancesoft_logo"
                    />
                    &nbsp; Employee info
                  </p>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Row>
                    <Link className="m-2" to="/hr/addDepartment" id="nav-link">
                      Add departments
                    </Link>
                    <Link className="m-2" to="/hr/addEmpType" id="nav-link">
                      Add employee type
                    </Link>
                    <Link
                      className="m-2"
                      to="/hr/updateSupervisorId"
                      id="nav-link"
                    >
                      Update reporting person
                    </Link>

                    <Link
                      className="m-2"
                      to="/hr/updateDesignation"
                      id="nav-link"
                    >
                      Update Hierarchy
                    </Link>
                    <Link
                      className="m-2"
                      to="/hr/addSubDepartment"
                      id="nav-link"
                    >
                      Add Sub departments
                    </Link>

                    <Link className="m-2" to="/hr/addAddressType" id="nav-link">
                      Add address type
                    </Link>
                    <Link className="m-2" to="/hr/Technology" id="nav-link">
                      Add Technology
                    </Link>
                    <Link className="m-2" to="/hr/addDesignation" id="nav-link">
                      Add designation
                    </Link>
                  </Row>
                </Dropdown.Menu>
              </Dropdown>
              </>
              ) : [
                "md",
                "general_manager",
                "vicePresident",
                "ch",
                "vicepresident",
              ].includes(type) ? (
              <>
                <Form className="formHeader" onSubmit={handleSubmit}>
                  <Form.Group className="formHeader">
                    <Form.Label className="formLabelHeader">
                      From
                    </Form.Label>
                    <Form.Control
                      className="formInput"
                      required
                      type="date"
                      name="fromDate"
                      onChange={handleChange}
                    />
                  </Form.Group>{" "}
                  <Form.Group className="formHeader">
                    <Form.Label className="formLabelHeader">
                      To
                    </Form.Label>
                    <Form.Control
                      className="formInput"
                      required
                      type="date"
                      name="toDate"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <button className="btn" type="submit" id="btnHeader">
                    Submit
                  </button>
                  <p className="text-danger mb-1">{msg}</p>
                </Form>
                <p className="total">
                  {total > 0 ? "Profit" : "Loss"}: <nobr />
                  <span
                    className={
                      total > 0
                        ? "text-success font-weight-bold"
                        : "text-danger font-weight-bold"
                    }
                    id="nav-link"
                  >
                    {total}
                  </span>
                </p>
                <Dropdown>
                  <Dropdown.Toggle
                    className="toggle"
                    variant=""
                    id="dropdown-basic dropdownMenu dropdown-autoclose-true "
                  >
                    {/* <img src={profilepic} alt="profile" className="img" /> */}
                    <p id="nav-link" className="username">
                      Recruiter
                    </p>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Row>
                      <Link
                        className="m-2"
                        to="/hr/Recruiters"
                        id="nav-link"
                      >
                        Jobs Posting
                      </Link>
                    </Row>
                  </Dropdown.Menu>
                </Dropdown>

             
              </>
              ) : ["recruiter"].includes(type) ? (
                <></>
              ) : ["manager"].includes(type) ? (
                <>
                  <Form className="formHeader" onSubmit={handleSubmit}>
                    <Form.Group className="formHeader">
                      <Form.Label className="formLabelHeader">
                        From
                      </Form.Label>
                      <Form.Control
                        className="formInput"
                        required
                        type="date"
                        name="fromDate"
                        defaultValue={data.fromDate}
                        onChange={handleChange}
                      />
                    </Form.Group>{" "}
                    <Form.Group className="formHeader">
                      <Form.Label className="formLabelHeader">
                        To
                      </Form.Label>
                      <Form.Control
                        className="formInput"
                        required
                        type="date"
                        name="toDate"
                        defaultValue={data.toDate}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <button type="submit" id="btnHeader">
                      Submit
                    </button>
                    <p className="text-danger mb-1">{msg}</p>
                  </Form>
                  <p className="total">
                    {total > 0 ? "Profit" : "Loss"} : <nobr />
                    <span
                      className={
                        total > 0
                          ? "text-success font-weight-bold"
                          : "text-danger font-weight-bold"
                      }
                      id="nav-link"
                    >
                      {total}
                    </span>
                  </p>

                  <Dropdown>
                    <Dropdown.Toggle
                      className="toggle"
                      variant=""
                      id="dropdown-basic dropdownMenu dropdown-autoclose-true "
                    >
                      {/* <img src={profilepic} alt="profile" className="img" /> */}
                      <p id="nav-link" className="username">
                        Recruiter
                      </p>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Row>
                        <Link
                          className="m-2"
                          to="/hr/Recruiters"
                          id="nav-link"
                        >
                          Jobs Posting
                        </Link>
                      </Row>
                    </Dropdown.Menu>
                  </Dropdown>

                </>
              ) : ["lead"].includes(type) ? (
                <>
                  <Dropdown>
                    <Dropdown.Toggle
                      className="toggle"
                      variant=""
                      id="dropdown-basic dropdownMenu dropdown-autoclose-true "
                    >
                      {/* <img src={profilepic} alt="profile" className="img" /> */}
                      <p id="nav-link" className="username">
                        Recruiter
                      </p>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Row>
                        <Link
                          className="m-2"
                          to="/hr/Recruiters"
                          id="nav-link"
                        >
                          Jobs Posting
                        </Link>
                      </Row>
                    </Dropdown.Menu>
                  </Dropdown>
                  <p className="total">
                    {total > 0 ? "Profit" : "Loss"} :
                    <nobr />
                    <span
                      className={
                        total > 0
                          ? "text-success font-weight-bold"
                          : "text-danger font-weight-bold"
                      }
                      id="nav-link"
                    >
                      {total}
                    </span>
                  </p>
                </>
              ) : (
                ""
              ))}
              <Dropdown>
                <Dropdown.Toggle
                  className="toggle"
                  variant=""
                  id="dropdown-basic dropdownMenu dropdown-autoclose-true "
                >
                  {/* <img src={profilepic} alt="profile" className="img" /> */}
                  <p id="nav-link" className="username">
                    <img
                      src={myprofile}
                      className="icon"
                      alt="lancesoft_logo"
                    />
                    &nbsp; My profile
                  </p>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Row>
                    <Link
                      className="m-2"
                      to="/"
                      id="nav-link"
                      onClick={(e) => {
                        e.preventDefault();
                        handleOnClick();
                      }}
                    >
                      {user}
                    </Link>
                    <Link className="m-2" to="/ChangePassword" id="nav-link">
                      ChangePassword
                    </Link>

                    <Link
                      className="m-2"
                      to="/"
                      onClick={handlefunction}
                      id="nav-link"
                    >
                      Logout
                    </Link>
                  </Row>
                </Dropdown.Menu>
              </Dropdown>
              </Nav>
              </Nav>
              </Navbar.Collapse>
              </>
          )}

              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">
            Another action
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">
            Separated link
          </NavDropdown.Item>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </NavDropdown> */}
            

            {/* <form id="searchForm" onSubmit={handleSubmit1}>
              <i class="fas fa-search"></i>

              <input
                type="search"
                id="search"
                name="search"
                placeholder="Enter ID"
              />

              <button type="submit" className="searchclick">
                Search
              </button>
            </form> */}

            <form className="d-flex" onSubmit={handleSubmit1}>
              <input
                className="form-control mr-2"
                // id="search"
                type="search"
                name="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleChanges}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          
   
    

      {/* <Navbar className="" expand="navbar navbar-expand-lg ">
        
        <Navbar.Brand style={{ marginLeft: "50px" }}>
          <Link to={view === "Home" ? "/" : navPath} id={`navbar-brand`}>
            <img src={lance_logo} className="icon" alt="lancesoft_logo" />
          </Link>
        </Navbar.Brand>
        {view === "Home" ? (
          <>
            <Nav id="nav">
              <Link className="m-2" to="/" id="nav-link"></Link>
              <Link className="m-2" to="/login" id="nav-link"></Link>
            </Nav>
          </>
        ) : (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav"
              style={{ flexGrow: "0", paddingLeft: "229px" }}
            >
              <Nav className="me-auto">
                <Link className="m-2" to="/" id="nav-link"></Link>
              </Nav>
              <Nav id="nav">
                {[null, undefined].includes(token) && (
                  <Link className="m-2" to="/" id="nav-link">
                    Login
                  </Link>
                )}
                {![null, undefined].includes(token) &&
                  (["finance"].includes(type) ? (
                    <>
                      <Dropdown>
                        <Dropdown.Toggle className="toggle" variant="">
                          <p id="nav-link" className="username">
                            Domestic
                          </p>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Row>
                            <Link
                              className="m-2"
                              to="/finance/clientDomestic"
                              id="nav-link"
                            >
                              Client Domestic
                            </Link>
                            <Link
                              className="m-2"
                              to="/finance/internalDomestic"
                              id="nav-link"
                            >
                              Internal Domestic
                            </Link>
                          </Row>
                        </Dropdown.Menu>
                      </Dropdown>
                      <Dropdown>
                        <Dropdown.Toggle
                          className="toggle"
                          variant=""
                        
                        >
                          <p id="nav-link" className="username">
                            International
                          </p>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Row>
                            <Link
                              className="m-2"
                              to="/finance/clientInternational"
                              id="nav-link"
                            >
                              Client International
                            </Link>
                            <Link
                              className="m-2"
                              to="/finance/internalInternational"
                              id="nav-link"
                            >
                              Internal International
                            </Link>
                          </Row>
                        </Dropdown.Menu>
                      </Dropdown>
                    </>
                  ) : ["hr"].includes(type) ? (
                    <>
                      <Nav id="nav">
                        <Link
                          className="m-2"
                          to={view === "Home" ? "/" : navPath}
                          id="nav-link"
                        >
                          <img
                            src={home}
                            className="icon"
                            alt="lancesoft_logo"
                          />
                          &nbsp; Home
                        </Link>
                      </Nav>
                      <Dropdown>
                        <Dropdown.Toggle
                          className="toggle"
                          variant=""
                          id="dropdown-basic dropdownMenu dropdown-autoclose-true "
                        >
                          <p id="nav-link" className="username1">
                            <img
                              src={client}
                              className="icon"
                              alt="lancesoft_logo"
                            />
                            &nbsp; Client
                          </p>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Row>
                            <Link
                              className="m-2"
                              to="/manager/addClientDetails"
                              id="nav-link"
                            >
                              Add Client details
                            </Link>
                            <Link
                              className="m-2"
                              to="/manager/addClientNames"
                              id="nav-link"
                            >
                              Add Client Names
                            </Link>
                            <Link
                              className="m-2"
                              to="/manager/editClientDetails"
                              id="nav-link"
                            >
                              Edit Client details
                            </Link>
                          </Row>
                        </Dropdown.Menu>
                      </Dropdown>

                      <Dropdown>
                        <Dropdown.Toggle
                          className="toggle"
                          variant=""
                          id="dropdown-basic dropdownMenu dropdown-autoclose-true "
                        >
                     
                          <p id="nav-link" className="username">
                            <img
                              src={jobs}
                              className="icon"
                              alt="lancesoft_logo"
                            />
                            &nbsp; Jobs
                          </p>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Row>
                            <Link
                              className="m-2"
                              to="/hr/Recruiters"
                              id="nav-link"
                            >
                              Create Job
                            </Link>
                            <Link className="m-2" to="/recruiter" id="nav-link">
                              Posted Jobs
                            </Link>
                            <Link
                              className="m-2"
                              to="/hr/taggedJobs"
                              id="nav-link"
                            >
                              Tagged Jobs
                            </Link>
                          </Row>
                        </Dropdown.Menu>
                      </Dropdown>
                      <Dropdown>
                        <Dropdown.Toggle
                          className="toggle"
                          variant=""
                          id="dropdown-basic dropdownMenu dropdown-autoclose-true "
                        >
                        
                          <p id="nav-link" className="username">
                            <img
                              src={userprofile}
                              className="icon"
                              alt="lancesoft_logo"
                            />
                            &nbsp; Employee
                          </p>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Row>
                            <Link
                              className="m-2"
                              to="/hr/addEmployee"
                              id="nav-link"
                            >
                              Create Employee
                            </Link>
                            <Link
                              className="m-2"
                              to="/hr/register"
                              id="nav-link"
                            >
                              Create Credentials
                            </Link>

                            <Link
                              className="m-2"
                              to="/transferEmployee"
                              id="nav-link"
                            >
                              Transfer Employee
                            </Link>
                            <Link
                              className="m-2"
                              to="/hr/exitEmployee"
                              id="nav-link"
                            >
                              Release Employee
                            </Link>
                            <Link
                              className="m-2"
                              to="/hr/subordinatesupervisior"
                              id="nav-link"
                            >
                              Secondary Manager
                            </Link>
                            <Link
                              className="m-2"
                              to="/hr/AbscondEmployee"
                              id="nav-link"
                            >
                              Abscond Employee
                            </Link>

                            <Link
                              className="m-2"
                              to="/hr/deleteEmployee"
                              id="nav-link"
                            >
                              Delete Employee
                            </Link>
                            <Link
                              className="m-2"
                              to="/hr/terminateEmployee"
                              id="nav-link"
                            >
                              Terminate Employee
                            </Link>
                            <Link
                              className="m-2"
                              to="/hr/updatesalary"
                              id="nav-link"
                            >
                              Update Salary
                            </Link>
                            <Link
                              className="m-2"
                              to="/hr/PromoteDemote"
                              id="nav-link"
                            >
                              Promote / Demote
                            </Link>
                            <Link
                              className="m-2"
                              to="/hr/AddAllowance"
                              id="nav-link"
                            >
                              Add Allowance
                            </Link>
                            <Link
                              className="m-2"
                              to="/hr/assignResponsibilities"
                              id="nav-link"
                            >
                              AssignResponsibilities
                            </Link>
                          </Row>
                        </Dropdown.Menu>
                      </Dropdown>
                      <Dropdown>
                        <Dropdown.Toggle
                          className="toggle"
                          variant=""
                          id="dropdown-basic dropdownMenu dropdown-autoclose-true "
                        >
                         
                          <p id="nav-link" className="username">
                            <img
                              src={employeeinfo}
                              className="icon"
                              alt="lancesoft_logo"
                            />
                            &nbsp; Employee info
                          </p>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Row>
                            <Link
                              className="m-2"
                              to="/hr/addDepartment"
                              id="nav-link"
                            >
                              Add departments
                            </Link>
                            <Link
                              className="m-2"
                              to="/hr/addEmpType"
                              id="nav-link"
                            >
                              Add employee type
                            </Link>
                            <Link
                              className="m-2"
                              to="/hr/updateSupervisorId"
                              id="nav-link"
                            >
                              Update reporting person
                            </Link>

                            <Link
                              className="m-2"
                              to="/hr/updateDesignation"
                              id="nav-link"
                            >
                              Update Hierarchy
                            </Link>
                            <Link
                              className="m-2"
                              to="/hr/addSubDepartment"
                              id="nav-link"
                            >
                              Add Sub departments
                            </Link>

                            <Link
                              className="m-2"
                              to="/hr/addAddressType"
                              id="nav-link"
                            >
                              Add address type
                            </Link>
                            <Link
                              className="m-2"
                              to="/hr/Technology"
                              id="nav-link"
                            >
                              Add Technology
                            </Link>
                            <Link
                              className="m-2"
                              to="/hr/addDesignation"
                              id="nav-link"
                            >
                              Add designation
                            </Link>
                          </Row>
                        </Dropdown.Menu>
                      </Dropdown>
                    </>
                  ) : [
                      "md",
                      "general_manager",
                      "vicePresident",
                      "ch",
                      "vicepresident",
                      "recruiter",
                    ].includes(type) ? (
                    <>
                      <Form className="formHeader" onSubmit={handleSubmit}>
                        <Form.Group className="formHeader">
                          <Form.Label className="formLabelHeader">
                            From
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            required
                            type="date"
                            name="fromDate"
                            onChange={handleChange}
                          />
                        </Form.Group>{" "}
                        <Form.Group className="formHeader">
                          <Form.Label className="formLabelHeader">
                            To
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            required
                            type="date"
                            name="toDate"
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <button className="btn" type="submit" id="btnHeader">
                          Submit
                        </button>
                        <p className="text-danger mb-1">{msg}</p>
                      </Form>
                      <p className="total">
                        {total > 0 ? "Profit" : "Loss"}: <nobr />
                        <span
                          className={
                            total > 0
                              ? "text-success font-weight-bold"
                              : "text-danger font-weight-bold"
                          }
                          id="nav-link"
                        >
                          {total}
                        </span>
                      </p>
                      <Dropdown>
                        <Dropdown.Toggle
                          className="toggle"
                          variant=""
                          id="dropdown-basic dropdownMenu dropdown-autoclose-true "
                        >
                          
                          <p id="nav-link" className="username">
                            Jobs
                          </p>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Row>
                            <Link
                              className="m-2"
                              to="/hr/Recruiters"
                              id="nav-link"
                            >
                              Create Job
                            </Link>
                            <Link className="m-2" to="/recruiter" id="nav-link">
                              Posted Jobs
                            </Link>
                            <Link
                              className="m-2"
                              to="/hr/taggedJobs"
                              id="nav-link"
                            >
                              Tagged Jobs
                            </Link>
                          </Row>
                        </Dropdown.Menu>
                      </Dropdown>
                    </>
                  ) : ["recruiter"].includes(type) ? (
                    <></>
                  ) : [
                      "manager",
                      "md",
                      "general_manager",
                      "vicePresident",
                      "ch",
                      "vicepresident",
                      "recruiter",
                    ].includes(type) ? (
                    <>
                      <Form className="formHeader" onSubmit={handleSubmit}>
                        <Form.Group className="formHeader">
                          <Form.Label className="formLabelHeader">
                            From
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            required
                            type="date"
                            name="fromDate"
                            defaultValue={data.fromDate}
                            onChange={handleChange}
                          />
                        </Form.Group>{" "}
                        <Form.Group className="formHeader">
                          <Form.Label className="formLabelHeader">
                            To
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            required
                            type="date"
                            name="toDate"
                            defaultValue={data.toDate}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <button type="submit" id="btnHeader">
                          Submit
                        </button>
                        <p className="text-danger mb-1">{msg}</p>
                      </Form>
                      <p className="total">
                        {total > 0 ? "Profit" : "Loss"} : <nobr />
                        <span
                          className={
                            total > 0
                              ? "text-success font-weight-bold"
                              : "text-danger font-weight-bold"
                          }
                          id="nav-link"
                        >
                          {total}
                        </span>
                      </p>

                      <Dropdown>
                        <Dropdown.Toggle
                          className="toggle"
                          variant=""
                          id="dropdown-basic dropdownMenu dropdown-autoclose-true "
                        >
                         
                          <p id="nav-link" className="username">
                            Jobs
                          </p>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Row>
                            <Link
                              className="m-2"
                              to="/hr/Recruiters"
                              id="nav-link"
                            >
                              Create Job
                            </Link>
                            <Link className="m-2" to="/recruiter" id="nav-link">
                              Posted Jobs
                            </Link>
                            <Link
                              className="m-2"
                              to="/hr/taggedJobs"
                              id="nav-link"
                            >
                              Tagged Jobs
                            </Link>
                          </Row>
                        </Dropdown.Menu>
                      </Dropdown>
                    </>
                  ) : ["lead"].includes(type) ? (
                    <>
                      <Dropdown>
                        <Dropdown.Toggle
                          className="toggle"
                          variant=""
                          id="dropdown-basic dropdownMenu dropdown-autoclose-true "
                        >
                       
                          <p id="nav-link" className="username">
                            Recruiter
                          </p>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Row>
                            <Link
                              className="m-2"
                              to="/hr/Recruiters"
                              id="nav-link"
                            >
                              Jobs Posting
                            </Link>
                          </Row>
                        </Dropdown.Menu>
                      </Dropdown>
                      <p className="total">
                        {total > 0 ? "Profit" : "Loss"} :
                        <nobr />
                        <span
                          className={
                            total > 0
                              ? "text-success font-weight-bold"
                              : "text-danger font-weight-bold"
                          }
                          id="nav-link"
                        >
                          {total}
                        </span>
                      </p>
                    </>
                  ) : (
                    ""
                  ))}
                <Dropdown>
                  <Dropdown.Toggle
                    className="toggle"
                    variant=""
                    id="dropdown-basic dropdownMenu dropdown-autoclose-true "
                  >
                   
                    <p id="nav-link" className="username">
                      <img
                        src={myprofile}
                        className="icon"
                        alt="lancesoft_logo"
                      />
                      &nbsp; My profile
                    </p>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Row>
                      <Link
                        className="m-2"
                        to="/"
                        id="nav-link"
                        onClick={(e) => {
                          e.preventDefault();
                          handleOnClick();
                        }}
                      >
                        {user}
                      </Link>
                      <Link className="m-2" to="/ChangePassword" id="nav-link">
                        ChangePassword
                      </Link>

                      <Link
                        className="m-2"
                        to="/"
                        onClick={handlefunction}
                        id="nav-link"
                      >
                        Logout
                      </Link>
                    </Row>
                  </Dropdown.Menu>
                </Dropdown>
              
              </Nav>
            </Navbar.Collapse>
            &nbsp;&nbsp;&nbsp;
            <form id="searchForm" onSubmit={handleSubmit1}>
              <div class="search-icon">
                <i class="fas fa-search"></i>

                <input
                  type="search"
                  id="search"
                  name="search"
                  placeholder="Enter ID"
                  onChange={handleChanges}
                />

                <button type="submit" className="searchclick">
                  Search
                </button>
              </div>
            </form>
          </>
        )}
       
      </Navbar> */}

      <ModelComponent
        data={id}
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
     />
       </div>
   </Navbar>

   

    </>
  );
}
