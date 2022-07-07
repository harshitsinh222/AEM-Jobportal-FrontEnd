import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
function Header() {
  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          p: 1,
          paddingLeft: 3,
          height: "70px",
        }}
      >
        <Stack p={1} spacing={30} direction="row">
          <Button
            variant="text"
            sx={{ color: "#2F4F4F", fontSize: "25px", fontWeight: 800 }}
          >
            job portal
          </Button>
          <Stack
            direction="row"
            sx={{
              height: "26px",
              color: "#2F4F4F",
              "& fieldset": {
                borderRadius: "0px",
              },
              borderRadius: "0px",
            }}
          >
            <TextField
              placeholder="Search for job titles,companies, or keywords"
              variant="outlined"
              sx={{
                width: "400px",
              }}
            />

            <TextField
              placeholder="Location"
              variant="outlined"
              sx={{
                width: "250px",
              }}
            />
            <Button
              variant="contained"
              sx={{
                height: "55px",
                backgroundColor: "#2F4F4F",
                "&:hover": {
                  backgroundColor: "#2F4F4F",
                },
                "& fieldset": {
                  borderRadius: "0px",
                },
                borderRadius: "0px",
              }}
            >
              <SearchIcon />
            </Button>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
}

export default Header;
