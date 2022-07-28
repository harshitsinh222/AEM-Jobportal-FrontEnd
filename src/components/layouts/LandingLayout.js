import React from "react";
import Box from "@mui/material/Box";
import Header from "../../sections/Header";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
function LandingLayout() {
  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          p: 1,

          borderRadius: 1,
        }}
      >
        <Navbar />
      </Box>
      <Header />
      <hr
        style={{
          borderColor: "#D3D3D3",
        }}
      />
      <Link to="/applicant">Register Applicant</Link> <br />
      <Link to="/addCredential">Add a credential</Link> <br/>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default LandingLayout;
