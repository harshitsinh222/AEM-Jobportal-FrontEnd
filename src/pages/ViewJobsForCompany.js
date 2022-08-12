import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import { useLocalState } from "../util/useLocalStorage";
import PostJobForm from "../sections/PostJobForm";
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
const ViewJobsForCompany = () => {
  const [jobData, setJobData] = React.useState(null);
  const [jwt] = useLocalState("", "jwt");

  const company_ID = window.location.href.split("/")[4];

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  const compName = query.get("name");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt} `,
  };

  useEffect(() => {
    axios
      .get(`/company/${company_ID}/jobs`, {
        headers: { headers },
      })
      .then((res) => {
        setJobData(res.data);
      });
  });

  return (
    <>
      <PostJobForm cid={company_ID} />
      <Typography variant="h5" gutterBottom component="div" sx={{ m: 1 }}>
        Jobs for company {compName}:
      </Typography>
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
    </>
  );
};

export default ViewJobsForCompany;
