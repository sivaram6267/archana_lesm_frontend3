import React from "react";

import Cards from "../cards/Cards";

const CardsDisplay = ({ empCards, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
<>
    <div style={{display:"flex", flexWrap:"wrap", gap:"20px"}}>
        {empCards?.Employees?.length>=0 && empCards.Employees.map(it=> <Cards data={it}/>)}
      </div>

  
    </>
  );
};

export default CardsDisplay;