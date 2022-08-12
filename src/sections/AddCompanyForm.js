import React, { useState } from "react";
import axios from "axios";
import { useLocalState } from "../util/useLocalStorage";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
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
function AddCompanyForm() {
  const navigate = useNavigate();
  const [text, setText] = useState();
  const [company, setCompany] = useLocalState("", "company");
  const [companyData, setCompanyData] = useState(null);
  const [jwt] = useLocalState("", "jwt");
  const [validator, setValidator] = useState(false);
  const [formValue, setformValue] = useState({
    company_address: "",
    company_contact: "",
    company_email: "",
    company_name: "",
    company_website: "",
    username: "",
    password: "",
    account_status: "yes",
  });
  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt} `,
  };
  const sendPostRequest = async (e) => {
    e.preventDefault();

    try {
      if (
        formValue.company_address !== "" &&
        formValue.company_contact !== "" &&
        formValue.company_email !== "" &&
        formValue.company_name !== "" &&
        formValue.company_website !== "" &&
        formValue.username !== "" &&
        formValue.password !== ""
      ) {
        setValidator(false);
        const reqbody = {
          company_address: formValue.company_address,
          company_contact: formValue.company_contact,
          company_email: formValue.company_email,
          company_name: formValue.company_name,
          company_website: formValue.company_website,
          username: formValue.username,
          password: formValue.password,
          account_status: formValue.account_status,
        };

        await axios.post(`company`, reqbody, {
          headers: headers,
        });
      } else {
        setValidator(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axios.get("/company", { headers: headers }).then((res) => {
      if (res.data != null) setCompanyData(res.data);
    });
  }, (validator, companyData));

  return (
    <div style={{ paddingLeft: "15px" }}>
      <Typography variant="h4" gutterBottom component="div" sx={{ m: 1 }}>
        Add a Company or view exisiting ones...
      </Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <form>
          <div
            style={{
              display: "flex",
              paddingTop: "20px",
            }}
          >
            <div style={{ flex: 1, marginRight: "10px" }}>
              <label
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  textAlign: "right",
                  width: "200px",
                  lineHeight: "26px",
                  marginBottom: "10px",
                }}
              >
                Company Address:{" "}
              </label>
              <TextField
                required
                id="demo-helper-text-misaligned"
                name="company_address"
                onChange={handleChange}
                size="small"
                style={{ width: "300px" }}
                error={text === ""}
                helperText={text === "" ? "Empty!" : " "}
              />
            </div>
            <div style={{ flex: 2, marginRight: "20px" }}>
              <label
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  textAlign: "right",
                  width: "200px",
                  lineHeight: "26px",
                  marginBottom: "10px",
                }}
              >
                Contact:{" "}
              </label>
              <TextField
                required
                id="demo-helper-text-misaligned"
                name="company_contact"
                onChange={handleChange}
                size="small"
                style={{ width: "300px" }}
              />
            </div>
          </div>
          <br />
          <div
            style={{
              display: "flex",
            }}
          >
            <div style={{ flex: 1, marginRight: "10px" }}>
              <label
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  textAlign: "right",
                  width: "200px",
                  lineHeight: "26px",
                  marginBottom: "10px",
                }}
              >
                Email:{" "}
              </label>
              <TextField
                required
                id="demo-helper-text-misaligned"
                name="company_email"
                onChange={handleChange}
                size="small"
                style={{ width: "300px" }}
              />
            </div>
            <div style={{ flex: 2, marginRight: "20px" }}>
              <label
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  textAlign: "right",
                  width: "200px",
                  lineHeight: "26px",
                  marginBottom: "10px",
                }}
              >
                Company Name:{" "}
              </label>
              <TextField
                required
                id="demo-helper-text-misaligned"
                name="company_name"
                onChange={handleChange}
                size="small"
                style={{ width: "300px" }}
              />
            </div>
          </div>
          <br />
          <div
            style={{
              display: "flex",
            }}
          >
            <div style={{ flex: 1, marginRight: "10px" }}>
              <label
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  textAlign: "right",
                  width: "200px",
                  lineHeight: "26px",
                  marginBottom: "10px",
                }}
              >
                Website:
              </label>
              <TextField
                required
                id="demo-helper-text-misaligned"
                name="company_website"
                onChange={handleChange}
                size="small"
                style={{ width: "300px" }}
              />
            </div>
            <div style={{ flex: 2, marginRight: "20px" }}>
              <label
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  textAlign: "right",
                  width: "200px",
                  lineHeight: "26px",
                  marginBottom: "10px",
                }}
              >
                Username:
              </label>
              <TextField
                required
                id="demo-helper-text-misaligned"
                name="username"
                onChange={handleChange}
                size="small"
                style={{ width: "300px" }}
              />
            </div>
          </div>
          <br />
          <div
            style={{
              display: "flex",
            }}
          >
            <div style={{ flex: 1, marginRight: "10px" }}>
              <label
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  textAlign: "right",
                  width: "200px",
                  lineHeight: "26px",
                  marginBottom: "10px",
                }}
              >
                Password:
              </label>
              <TextField
                required
                type="password"
                id="demo-helper-text-misaligned"
                name="password"
                onChange={handleChange}
                size="small"
                style={{ width: "300px" }}
              />
            </div>
          </div>
          <br />
          <br />
          <Button
            variant="contained"
            value="Login"
            onClick={sendPostRequest}
            style={{
              width: "100px",

              backgroundColor: "alpha(theme.palette.common.white, 0.15)",
            }}
          >
            Add
          </Button>
          {validator && <span>Please fill all the fields</span>}
        </form>
      </Box>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Contact Details</StyledTableCell>
              <StyledTableCell align="center">Webiste</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companyData &&
              companyData.map((compDeets, index) => (
                <StyledTableRow key={compDeets.id}>
                  <StyledTableCell component="th" scope="row">
                    <Link
                      to={`/company/${compDeets.id}/jobs?name=${compDeets.company_name}`}
                    >
                      {compDeets.company_name}
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {compDeets.company_contact}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {compDeets.company_website}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {compDeets.company_email}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
    </div>
  );
}

export default AddCompanyForm;
