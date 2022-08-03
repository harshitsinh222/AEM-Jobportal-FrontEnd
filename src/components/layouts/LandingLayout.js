import React from "react";
import Box from "@mui/material/Box";

import { Link } from "react-router-dom";
import TeamCardDemo from "./TeamCardDemo";
function LandingLayout() {
  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          p: 1,

          borderRadius: 1,
        }}
      ></Box>
      <div style={{ marginBottom: "40px" }}>
        <TeamCardDemo />
      </div>
      <Link to="/applicant">Register Applicant</Link> <br />
      <Link to="/addCredential">Add a credential</Link> <br />
    </div>
  );
}

export default LandingLayout;
