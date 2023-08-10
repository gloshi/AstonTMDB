import React from "react";

import "./Load.css";

const Load = ({ indent }: { indent?: number }) => {
  return (
    <div className="box">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Load;
