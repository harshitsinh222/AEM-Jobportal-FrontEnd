import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocalState } from "../util/useLocalStorage";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
      await axios
        .post(`company/${company.id}/jobs`, reqbody, {
          headers: headers,
        })
        .then((res) => {
          // console.log("after post: ", response.data);
          setformValue({
            job_description: "",
            job_location: "",
            job_posting_date: "",
            job_salary: "",
            job_title: "",
            last_application_date: "",
            no_of_vacancy: "",
            job_status: "",
          });

          console.log("fv: ", formValue);
        });
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
              style={{ width: "300px" }}
              value={formValue.no_of_vacancy}
            />
          </div>
        </div>

        <br />
        <Button
          variant="contained"
          value="add job"
          onClick={sendPostRequest}
          style={{
            width: "100px",
            backgroundColor: "alpha(theme.palette.common.white, 0.15)",
          }}
        >
          Add Job
        </Button>
      </form>
      <br />
      
    </div>
  );
}

export default PostJobForm;
