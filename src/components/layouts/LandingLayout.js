import React from "react";
import Box from "@mui/material/Box";

import { Link } from "react-router-dom";
import TeamCardDemo from "./TeamCardDemo";
import { useLocalState } from "../../util/useLocalStorage";
function LandingLayout() {
  const [app, setApp] = useLocalState("", "app");
  return (
    <div style={{ width: "100%", backgroundColor: "#faf9f8" }}>
      <Box
        sx={{
          display: "flex",
          p: 1,
          borderRadius: 1,
        }}
      />

      {!app.isAdmin ? (
        <div style={{ marginBottom: "40px" }}>
          <TeamCardDemo />
        </div>
      ) : (
        <>admin</>
      )}
    </div>
  );
}

export default LandingLayout;
