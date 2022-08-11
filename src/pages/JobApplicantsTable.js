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

const JobApplicantsTable = () => {
  const [app, setApp] = useLocalState("", "app");
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [appDetails, setAppDetails] = React.useState(null);
  const [disabled, setDisabled] = useState(false);

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
      .then((res) => {
        //  console.log("appd: ", res.data);
        setAppDetails(res.data);
      });
  });

  const handleHire = (e) => {
    const reqbody = {
      application_status: "Hired",
    };

    const appDeetsID = e.target.name;
    console.log("hired ", reqbody.application_status);

    axios.put(`/appdetails/${appDeetsID}`, reqbody).then((res) => {
      console.log("res: ", res.data);
    });
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
                  <Button
                    onClick={handleHire}
                    variant="outlined"
                    name={appd.applicationID}
                    disabled={
                      appd.application_status !== "Hired" ? disabled : !disabled
                    }
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
};

export default JobApplicantsTable;
