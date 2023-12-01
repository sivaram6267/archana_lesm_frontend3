import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";
import laptop from "../../images/laptop.gif";
export function UpdateDesignation() {
  const [oldId, setOldId] = useState("");
  const [newId, setNewId] = useState("");
  const [desgs, setDesgs] = useState(null);
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    ApiService.getAllDesg()
      .then((res) => {
        // console.log(res.data);
        setDesgs(res.data);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(true);
    setMsg("");
    ApiService.updateDesg(oldId, newId)
      .then((res) => {
        // console.log(res.data);

        setStatus(false);
        setMsg("");
        navigate("/hr");
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error));
        setStatus(false);
        setMsg(
          error.response.data?.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  };

  return (
    <>
      <div class="p-3 mb-2 bg-primary text-white" style={{ color: "#1492E6" }}>
        ADD HIERARCHY
      </div>
      <div id="" className="container-sm ">
        <h1 className="title text-center">Update Hierarchy</h1>
        <Form onSubmit={handleSubmit}>
          <div className="form " style={{ width: "600px" }}>
            <Form.Group className="mb-3 px-2">
              <Form.Label htmlFor="desgId">
                <b>Designation</b>
                <nobr />
                <span className="text-danger"> *</span>
              </Form.Label>
              <Form.Select
                required
                id="desgId"
                aria-label="employee designation"
                className="selectInput"
                name="desgId"
                onChange={(e) => {
                  setOldId(e.target.value);
                }}
              >
                <option value="">{status ? "loading..." : "select "}</option>
                {desgs?.map((type) => (
                  <option key={type.desgId} value={type.desgId}>
                    {type.desgNames}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 px-2">
              <Form.Label htmlFor="desgId">
                <b>Reporting Designation</b>
                <nobr />
                <span className="text-danger"> *</span>
              </Form.Label>
              <Form.Select
                required
                id="desgId"
                aria-label="employee designation"
                className="selectInput"
                name="desgId"
                onChange={(e) => {
                  setNewId(e.target.value);
                }}
              >
                <option value="">{status ? "loading..." : "select "}</option>
                {desgs?.map((type) => (
                  <option key={type.desgId} value={type.desgId}>
                    {type.desgNames}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {/* </div> */}
            <Button className="btn-signup px-2 exrc" type="submit">
              Submit
            </Button>{" "}
            <Button as={Link} to="/hr" variant="danger" className="px-2 ere">
              Cancel
            </Button>
            {status && (
              <p className="text-success mb-2">
                Please wait while we are processing your request.
              </p>
            )}
            {<p className="text-danger mb-2">{msg}</p>}
            <img src={laptop} alt="loading..." className="working" />
          </div>
        </Form>
      </div>
    </>
  );
}
