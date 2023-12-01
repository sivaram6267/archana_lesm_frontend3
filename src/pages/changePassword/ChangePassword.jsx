import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./ChangePassword.css";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import laptop from "../../images/laptop.gif";
import change from "../../images/change.png";
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [errors, setErrors] = useState(false);
  const [msg, setMsg] = useState("");
  let type = sessionStorage.getItem("type");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = { newPassword: newPassword, oldPassword: oldPassword };
    ApiService.ChangePassword(loginData)
      .then((res) => {
        console.log(res.data);

        // sessionStorage.setItem("Access_Token", res.data.token);
        sessionStorage.setItem("type", res.data.role.toLowerCase());
        const role = res.data.role.toLowerCase();
        // setStatus(false);

        setErrors(false);
        alert(`Change password  Successful `);
        navigate(`/${role}`);
        setMsg("");
        setErrors(false);
      })
      .catch((error) => {
        // console.log(error);
        // setStatus(false);
        setErrors(true);
        alert(JSON.stringify(error));
        setMsg(
          error.response.data?.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  };
  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/${type}`);
  };

  return (
    <div id="changepassword" border="primary" className="shadow">
      <div className="flex-column">
        <div className="align-items-center mb-3">
          <KeyboardAltOutlinedIcon className="me-2" />
        </div>
        <div className="head">
          <h3 classname="head3">Change Password</h3>
        </div>
        <div className="mb">
          <p>Please enter your password</p>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="label">Old Password</Form.Label>
            <Form.Control
              className="changecontrol"
              required
              type="text"
              value={oldPassword}
              isInvalid={errors}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="enter your old password"
            />
          </Form.Group>
          {errors && (
            <p className="text-danger mb-1">
              {msg}
              {/* The provided credentials do not match our records. */}
            </p>
          )}
          <Form.Group className="mb-3">
            <Form.Label className="label">New Password </Form.Label>
            <Form.Control
              className="changecontrol"
              required
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="enter your new password"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="reset">
            Reset Password
          </Button>
        </Form>
      </div>
      <img src={change } alt="loading..." className="work" />
    </div>
    
  );
};

export default ChangePassword;
