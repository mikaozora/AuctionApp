import React from "react";
import { Box, Container } from "@mui/material";

class mainContentDashboard extends React.Component {
  render() {
    return (
      <main
        style={{
          background: "#f7f7f7f7",
          minHeight: "100vh",
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        <div
          style={{
            position: "absolute",
            height: "610px",
            width: "1190px",
            left: "300px",
            top: "50px",
            backgroundColor: "#cfe8fc",
          }}
        >
          <h1
            style={{
              marginLeft: "24px",
              marginTop: "24px",
              fontFamily: "poppins",
            }}
          >
            Welcome Mika Ozora
          </h1>
        </div>
      </main>
    );
  }
}
export default mainContentDashboard;
