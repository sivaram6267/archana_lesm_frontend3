import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";
import { FormInputs } from "../formInputs/FormInputs";
import "./expences.css";
function Expences({ type }) {
  
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [data, setData] = React.useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    ApiService.getBillExpense(data, data.employeeId, type)
      .then((res) => {
        console.log(res.data);
        alert("successfull");
        // navigate("/finance");
      })
      .catch((error) => {
        // console.log(error);
        setError(true);
        setMessage(error.response.data.errormessage);
        console.log(error.response);
      });
  };

  return (
    <>
      {error ? <div className="error">{message}</div> : ""}
      <Form onSubmit={handleSubmit}>
        <FormInputs
          id="employeeId"
          title="Employee ID"
          name="employeeId"
          type="text"
          placeholder="Enter Employee ID"
          required={true}
          defaultValue={data.employeeId}
          handleChange={handleChange}
        />
        <FormInputs
          id="1"
          title="Cab"
          name="cab"
          type="number"
          placeholder="Enter Cab expences"
          required={true}
          defaultValue={data.cab}
          handleChange={handleChange}
        />
        <FormInputs
          id="2"
          title="Travel"
          name="travel"
          type="number"
          placeholder="Enter Travel expences"
          required={true}
          defaultValue={data.travel}
          handleChange={handleChange}
        />
        <FormInputs
          id="3"
          title="Food"
          name="food"
          type="number"
          placeholder="Enter Food expences"
          required={true}
          defaultValue={data.food}
          handleChange={handleChange}
        />
        <FormInputs
          id="3"
          title="Accomodation"
          name="accommodation"
          type="number"
          placeholder="Enter Accomodation expences"
          required={true}
          defaultValue={data.accommodation}
          handleChange={handleChange}
        />
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="paidStatus">Paid status</Form.Label>
          <Form.Select
            required
            name="paidStatus"
            id="paidStatus"
            aria-label="Default select example"
            onChange={(e) => {
              handleChange(e);
              console.log(e.target.value);
            }}
          >
            <option value="">select</option>
            <option value="FULLY_PAID">Fully paid</option>
            <option value="PARTIAL_PAID">Partial paid</option>
            <option value="NOT_PAID">not paid</option>
          </Form.Select>
        </Form.Group>
        <FormInputs
          id="travelSDate"
          title="Travel start date"
          name="travelSDate"
          type="date"
          placeholder="Enter Travel start date"
          required={true}
          defaultValue={data.travelSDate}
          handleChange={handleChange}
        />
        <FormInputs
          id="travelEDate"
          title="Travel end date"
          name="travelEDate"
          type="date"
          placeholder="Enter Travel end date"
          required={true}
          defaultValue={data.travelEDate}
          handleChange={handleChange}
        />
        <Button variant="primary" type="submit" className=" px-2">
          submit
        </Button>{" "}
        <Button as={Link} to="/dashboard" variant="danger" className=" px-2">
          Cancel
        </Button>
      </Form>
    </>
  );
}

export default Expences;
