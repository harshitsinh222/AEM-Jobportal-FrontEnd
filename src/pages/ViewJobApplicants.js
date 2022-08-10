import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useLocalState } from "../util/useLocalStorage";
import { Link } from "react-router-dom";
import { Button, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

export default function ViewJobApplicants() {
  const [app, setApp] = useLocalState("", "app");
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [appDetails, setAppDetails] = React.useState(null);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt} `,
  };
  const url = `/appdetails`;

  React.useEffect(() => {
    axios
      .get(url, {
        headers: { headers },
      })
      .then(async (res) => {
        //  console.log("appd: ", res.data);
        setAppDetails(res.data);
      });
  }, []);

  const handleHire = (e) => {
    const reqbody = {
      application_status: `${appDetails}`,
    };

    const appDeetsID = e.target.name;
    console.log("hired ", reqbody.application_status);

    // axios.post(`/appdetails/${appDeetsID}`, );
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Applicant Name</StyledTableCell>
            <StyledTableCell align="center">Applicant Contact</StyledTableCell>
            <StyledTableCell align="center">Document</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Hire</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appDetails &&
            appDetails.map((appd) => (
              <StyledTableRow key={appd.applicationID}>
                <StyledTableCell component="th" scope="row">
                  {appd.user.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {appd.user.contact_details}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <a href={`${appd.application_doc}`}>Download</a>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {appd.application_status}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {/* <FormGroup>
                    <FormControlLabel
                      control={<Android12Switch />}
                      style={{ alignSelf: "center" }}
                      name="hire"
                      onChange={handleHire}
                    />
                  </FormGroup> */}
                  <Button
                    onClick={handleHire}
                    variant="outlined"
                    name={appd.applicationID}
                  >
                    HIRE
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
