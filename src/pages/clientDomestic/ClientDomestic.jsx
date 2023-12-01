import Expences from "../../components/expences/Expences";


function ClientDomestic() {
  return (
    <div id="add-employee" className="container-sm ">
      <h1 className="title text-center">Client Domestic Expences</h1>
      <Expences type="2" />
    </div>
  );
}

export default ClientDomestic;
