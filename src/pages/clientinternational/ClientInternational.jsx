import React from "react";
import Expences from "../../components/expences/Expences";


function ClientInternational() {
  return (
    <div id="add-employee" className="container-sm ">
      <h1 className="title text-center">Client International Expences</h1>
      <Expences type="1" />
    </div>
  );
}

export default ClientInternational;
