import React from "react";
import Box from "@mui/material/Box";
import Header from "../../sections/Header";
import AddCredentialForm from "../../sections/AddCredentialForm";
import Navbar from '../Navbar'
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
      <AddCredentialForm />
    </div>
  );
}

export default LandingLayout;
