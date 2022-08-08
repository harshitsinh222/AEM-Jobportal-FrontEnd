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

export default function UsersTable() {
  const [app, setApp] = useLocalState("", "app");
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [users, setUsers] = React.useState(null);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt} `,
  };
  const url = `users`;

  React.useEffect(() => {
    axios
      .get(url, {
        headers: { headers },
      })
      .then((res) => {
        setUsers(res.data);
      });
  }, []);

  return (
    <TableContainer component={Paper} sx={{ mx: 1 }}>
      <Table sx={{ minWidth: 400 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Username</StyledTableCell>
            <StyledTableCell align="center">Admin</StyledTableCell>
            <StyledTableCell align="center">Gender</StyledTableCell>
            <StyledTableCell align="center">Contact Details</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users &&
            users.map((userDeets) => (
              <StyledTableRow key={userDeets.id}>
                <StyledTableCell component="th" scope="row">
                  {userDeets.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {userDeets.username}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {!userDeets.isAdmin && 1 ? "NO" : "YES"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {userDeets.gender}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {userDeets.contact_details}
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
