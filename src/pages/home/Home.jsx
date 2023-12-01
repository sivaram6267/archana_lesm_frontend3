import React, { useState } from "react";

import "./home.css";
import lance_logo from "../../images/lance_logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import { Button, Form } from "react-bootstrap";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

import login from "../../images/login.PNG";
// import "bootstrap/dist/assets/owl.carousel.css";
const Home = () => {
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
    <div>
      {/* Required meta tags */}
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="fonts/icomoon/style.css" />
      <link rel="stylesheet" href="css/owl.carousel.min.css" />

      <link rel="stylesheet" href="css/style.css" />

      {/* <div className='background-image' style ={ { backgroundImage: "url('../../../../images/products/cards/main.jpg')" } }>asdfasdfasdfasdf</div> */}
      <div className="d-lg-flex half">
        <div
          className="bg order-1 order-md-2 "
          style={{ backgroundImage: `url(${login})` }}
        />
        <div className="contents order-2 order-md-1">
          <div className="container">
            <div className="logo col-sm-3">
              <img src={lance_logo} className="icon" alt="lancesoft_logo" />
            </div>
            <div className="row align-items-center justify-content-center">
              <div className="col-md-7">
                <div className="mb-4">
                  {/* <h3 className="users">
                    Welcome Back{" "}
                    <img src="Group 195.svg" className="group23" alt="login" />
                  </h3> */}

                  <p className="group33">
                    <h5>Please enter your details.</h5>
                  </p>
                </div>
                <Form onSubmit={handleSubmit}>
                  <MuiThemeProvider>
                    <div className="user">
                      <TextField
                        label="Standard warning"
                        floatingLabelStyle={{
                          color: "black",
                          fontWeight: "bold",
                        }}
                        color="warning"
                        className="sample"
                        required
                        variant="standard"
                        type="text"
                        hintText="Enter your Username"
                        value={username}
                        floatingLabelText="Username"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <br />

                      <TextField
                        floatingLabelStyle={{
                          color: "black",
                          fontWeight: "bold",
                        }}
                        type="password"
                        className="pass"
                        value={password}
                        hintText="Enter your Password"
                        floatingLabelText="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <br />
                    </div>
                  </MuiThemeProvider>

                  {errors && <p className="text-danger mb-1">{msg}</p>}
                  <p class="forget">Forgot Password</p>
                  <Button
                    type="submit"
                    variant="success"
                    className="login-button"
                  >
                    Login
                  </Button>

                  {status && (
                    <p className="text-success mb-1">
                      Please wait while we are processing your request.
                    </p>
                  )}
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const style = {
  margin: 15,
};

export default Home;
