import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocalState } from "../util/useLocalStorage";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
function PostJobForm() {
  const [jobData, setJobData] = React.useState(null);
  const navigate = useNavigate();
  const [company, setCompany] = useLocalState("", "company");
  const [jwt] = useLocalState("", "jwt");
  const [formValue, setformValue] = useState({
    job_description: "",
    job_location: "",
    job_posting_date: "",
    job_salary: "",
    job_status: "Hiring",
    job_title: "",
    last_application_date: "",
    no_of_vacancy: "",
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
      // const formData = new FormData();

      // formData.append("job_description", formValue.job_description);
      // formData.append("job_location", formValue.job_location);
      // formData.append("job_posting_date", formValue.job_posting_date);
      // formData.append("job_salary", formValue.job_salary);
      // formData.append("job_title", formValue.job_title);
      // formData.append("last_application_date", formValue.last_application_date);
      // formData.append("number_of_vacancy", formValue.number_of_vacancy);

      // formData.append("job_status", formValue.job_status);
      const reqbody = {
        job_description: formValue.job_description,
        job_location: formValue.job_location,
        job_posting_date: formValue.job_posting_date,
        job_salary: formValue.job_salary,
        job_title: formValue.job_title,
        last_application_date: formValue.last_application_date,
        no_of_vacancy: formValue.no_of_vacancy,
        job_status: formValue.job_status,
      };
      const response = await axios.post(`company/${company.id}/jobs`, reqbody, {
        headers: headers,
      });
      console.log("after post: ", response.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    axios
      .get(`company/${company.id}/jobs`, {
        headers: { headers },
      })
      .then((res) => {
        setJobData(res.data);
      });
  });
  return (
    <div style={{ paddingLeft: "15px" }}>
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
              Job Description:{" "}
            </label>
            <TextField
              id="demo-helper-text-misaligned"
              name="job_description"
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
              Location:{" "}
            </label>
            <TextField
              id="demo-helper-text-misaligned"
              name="job_location"
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
              Posting Date:{" "}
            </label>
            <TextField
              id="demo-helper-text-misaligned"
              name="job_posting_date"
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
              Salary:{" "}
            </label>
            <TextField
              id="demo-helper-text-misaligned"
              name="job_salary"
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
              Title:
            </label>
            <TextField
              id="demo-helper-text-misaligned"
              name="job_title"
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
              Last Application Date:
            </label>
            <TextField
              id="demo-helper-text-misaligned"
              name="last_application_date"
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
              Number of Vacanacy:
            </label>
            <TextField
              id="demo-helper-text-misaligned"
              name="no_of_vacancy"
              onChange={handleChange}
              size="small"
              style={{ width: "300px" }}
            />
          </div>
        </div>
        <br />
        <br /> <br />
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
      </form>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Company Name</StyledTableCell>

              <StyledTableCell>Job Title</StyledTableCell>
              <StyledTableCell>Job Location</StyledTableCell>
              <StyledTableCell>Job Posting Date</StyledTableCell>
              <StyledTableCell>Last Application Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobData &&
              jobData.map((compantDeets, index) => (
                <StyledTableRow key={compantDeets.id}>
                  <StyledTableCell component="th" scope="row">
                    {compantDeets.company.company_name}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    <Link to={`/job/${jobData[index].id}`}>
                      {" "}
                      {compantDeets.job_title}
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {compantDeets.job_location}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {compantDeets.job_posting_date}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {compantDeets.last_application_date}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default PostJobForm;
