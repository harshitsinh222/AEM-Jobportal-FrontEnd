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

export default function CustomizedTables() {
  const [app, setApp] = useLocalState("", "app");
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [appDetails, setAppDetails] = React.useState(null);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt} `,
  };
  const url = `appdetails/appId/${app.id}`;

  React.useEffect(() => {
    axios
      .get(url, {
        headers: { headers },
      })
      .then((res) => {
        // console.log('ajt: ', res.data);
        setAppDetails(res.data);
        // console.log('ajt: ', res.data);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Job Title</StyledTableCell>
            <StyledTableCell align="center">Company Name</StyledTableCell>
            <StyledTableCell align="center">Application Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appDetails &&
            appDetails.map((appDeets) => (
              <StyledTableRow key={appDeets.applicationID}>
                <StyledTableCell component="th" scope="row">
                  {appDeets.job.job_title}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {appDeets.job.company.company_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {appDeets.application_status}
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
