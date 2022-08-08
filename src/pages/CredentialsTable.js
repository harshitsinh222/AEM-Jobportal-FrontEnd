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
  const [resumeURL, setResumeURL] = useLocalState("", "url");
  const [credential, setCredential] = React.useState(null);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt} `,
  };
  const url = `applicants/${app.id}/credentials`;

  React.useEffect(() => {
    axios
      .get(url, {
        headers: { headers },
      })
      .then((res) => {
        setCredential(res.data);
        //console.log("cred: ", credential);
        credential &&
          credential.map((cred) => {
            if (
              cred.credential_name.toString().toLowerCase().includes("resume")
            )
              setResumeURL(cred.document);
          });
      });
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Credential Name</StyledTableCell>
            <StyledTableCell align="center">File</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {credential &&
            credential.map((cred) => (
              <StyledTableRow key={cred.id}>
                <StyledTableCell component="th" scope="row">
                  <Link to={`/credentials/${cred.id}`}>
                    {cred.credential_name}
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <a href={`${cred.document}`}>View</a>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
