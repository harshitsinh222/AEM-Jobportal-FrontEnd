import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalState } from "../util/useLocalStorage";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import ViewJobApplicants from "./ViewJobApplicants";
const ViewJobs = () => {
  const job_ID = window.location.href.split("/job/")[1];

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
  const navigate = useNavigate();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt} `,
  };

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    axios.get(`${job_ID}`, { headers: headers }).then((res) => {
      setformValue(res.data);
    });
  }, [job_ID]);

  const saveJob = async () => {
    try {
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

      const res = await axios.put(`${job_ID}`, reqbody, {
        headers: headers,
      });
      console.log("after put: ", res.data);
      navigate(`/addCompany`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ paddingLeft: "15px", paddingTop: "20px" }}>
      <Typography variant="h4" gutterBottom component="div">
        Update Job: {formValue.job_title}
      </Typography>

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
              value={formValue.job_description}
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
              value={formValue.job_location}
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
              value={formValue.job_posting_date}
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
              value={formValue.job_salary}
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
              value={formValue.job_title}
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
              value={formValue.last_application_date}
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
              value={formValue.no_of_vacancy}
              style={{ width: "300px" }}
            />
          </div>
        </div>
        <br />
        <Button
          variant="contained"
          value="update job"
          onClick={saveJob}
          style={{
            width: "140px",
            backgroundColor: "alpha(theme.palette.common.white, 0.15)",
          }}
        >
          Update Job
        </Button>
      </form>
      <br />
      <Typography variant="h4" gutterBottom component="div">
        Applicants List..
      </Typography>
      <ViewJobApplicants />
    </div>
  );
};

export default ViewJobs;
