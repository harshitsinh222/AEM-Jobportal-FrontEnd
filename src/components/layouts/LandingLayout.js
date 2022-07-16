import React from "react";
import Box from "@mui/material/Box";
import Header from "../../sections/Header";
import Form from "../../sections/Form";
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
        <Header />
      </Box>
      <hr
        style={{
          borderColor: "#D3D3D3",
        }}
      />
      <Form />
    </div>
  );
}

export default LandingLayout;
