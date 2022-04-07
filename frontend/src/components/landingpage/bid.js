import React, { useState } from "react";
import logo from "../../assets/logo.svg";

const Bid = (props) => {
    const data = props.data
  return (
    <div>
        {console.log(props.data)}
      <div
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "space-between",
        }}
        className="nav"
      >
        <div style={{ padding: "32px", marginLeft: "112px" }}>
          <img src={logo} style={{ width: "150px" }} alt="logo.svg"></img>
        </div>
      </div>
      <div>
          <img />
      </div>
    </div>
  );
};

export default Bid;
