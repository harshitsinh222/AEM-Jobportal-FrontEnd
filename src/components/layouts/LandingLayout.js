import React from "react";
import Box from "@mui/material/Box";

import TeamCardDemo from "./TeamCardDemo";
import { useLocalState } from "../../util/useLocalStorage";
import { Typography } from "@mui/material";
import UsersTable from "../../pages/UsersTable";
function LandingLayout() {
  const [app] = useLocalState("", "app");
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
        <div>
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            sx={{ m: 1 }}
            align="center"
          >
            Welcome to Admin View!!
          </Typography>
          <UsersTable />
        </div>
      )}
    </div>
  );
}

export default LandingLayout;
