import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import "./login.css";
import lancesoft_logo from "../../lancesoft_logo.png";
import ApiService from "../../services/ApiService";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = { username: username, password: password };
    setStatus(true);
    ApiService.login(loginData)
      .then((res) => {
        console.log(res.data);
        sessionStorage.setItem("Access_Token", res.data.token);
        sessionStorage.setItem("type", res.data.role.toLowerCase());
        const role = res.data.role.toLowerCase();
        const username = jwt(res.data.token).sub;
        // console.log(username);
        sessionStorage.setItem("username", username);

        sessionStorage.setItem("Id", res.data.empId);
        setStatus(false);
        sessionStorage.setItem("firstName", res.data.firstName);
        setErrors(false);
        // alert(`Login Successful `);
        navigate(`/${role}`);
        setMsg("");
        setErrors(false);
      })
      .catch((error) => {
        // console.log(error);
        setStatus(false);
        setErrors(true);
        alert(JSON.stringify(error));
        setMsg(
          error.response.data?.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  };
  return (
    <div id="login" className="container-sm ">
      <h1 className="title text-center">
        {/* Welcome */}
        <img src={lancesoft_logo} className="icon" alt="lancesoft_logo2" />
      </h1>
      <Form onSubmit={handleSubmit}>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="email">
            E-Mail Address
          </label>
          <input
            type="email"
            id="email"
            className="formFieldInput"
            placeholder="Enter your email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>
        {errors && (
          <p className="text-danger mb-1">
            {msg}
            {/* The provided credentials do not match our records. */}
          </p>
        )}
        <div className="formField">
          <label className="formFieldLabel" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="formFieldInput"
            placeholder="Enter your password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
        <div className="formField">
          <button className="formFieldButton">Sign In</button>
        </div>
        {status && (
          <p className="text-success mb-1">
            Please wait while we are processing your request.
          </p>
        )}
      </Form>
    </div>
  );
};

export default Login;
