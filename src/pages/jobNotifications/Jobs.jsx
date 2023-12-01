import React, { useState } from "react";


import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";

import { useNavigate } from "react-router-dom";
const Jobs = (props) => {
  const navigate = useNavigate();
  const handleOnClickView = (id) => {
    console.log(id);
    navigate("/postedJobProfile", { state: { jobStringId: id } });
  };

  return (
    <>
     
    </>
  );
};

export default Jobs;
