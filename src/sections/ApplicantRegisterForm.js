import React, { useState } from "react";
import axios from "axios";
import { useLocalState } from "../util/useLocalStorage";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
function ApplicantRegisterForm() {
  const navigate = useNavigate();

  const [file, setFile] = useState();

  const [formValue, setformValue] = useState({
    applicant_name: "",
    username: "",
    applicant_password: "",
    applicant_email_address: "",
    applicant_gender: "",
    applicant_contact_details: "",
    applicant_professional_summary: "",
    applicant_account_status: "No",
    applicant_highest_educational_attainment: "",
  });
  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };

  const sendPostRequest = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("applicant_name", formValue.applicant_name);
      formData.append("username", formValue.username);
      formData.append("applicant_password", formValue.applicant_password);
      formData.append(
        "applicant_email_address",
        formValue.applicant_email_address
      );
      formData.append("applicant_gender", formValue.applicant_gender);
      formData.append(
        "applicant_contact_details",
        formValue.applicant_contact_details
      );
      formData.append(
        "applicant_professional_summary",
        formValue.applicant_professional_summary
      );
      formData.append(
        "applicant_highest_educational_attainment",
        formValue.applicant_highest_educational_attainment
      );
      formData.append(
        "applicant_account_status",
        formValue.applicant_account_status
      );

      const response = await axios.post("applicants", formData);
      console.log("after post: ", response.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
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
              App name:{" "}
            </label>
            <TextField
              id="demo-helper-text-misaligned"
              name="applicant_name"
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
              Email Address:{" "}
            </label>
            <TextField
              id="demo-helper-text-misaligned"
              name="applicant_email_address"
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
              Username:{" "}
            </label>
            <TextField
              id="demo-helper-text-misaligned"
              name="username"
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
              Password:{" "}
            </label>
            <TextField
              type="password"
              id="demo-helper-text-misaligned"
              name="applicant_password"
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
              Gender:
            </label>
            <TextField
              id="demo-helper-text-misaligned"
              name="applicant_gender"
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
              Contact:
            </label>
            <TextField
              id="demo-helper-text-misaligned"
              name="applicant_contact_details"
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
              Summary:
            </label>
            <TextField
              id="demo-helper-text-misaligned"
              name="applicant_professional_summary"
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
              Education Attainment:
            </label>
            <TextField
              id="demo-helper-text-misaligned"
              name="applicant_highest_educational_attainment"
              onChange={handleChange}
              size="small"
              style={{ width: "300px" }}
            />
          </div>
        </div>
        <br />
        Profile Photo: <input type="file" name="file" onChange={saveFile} />
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
    </div>
  );
}

export default ApplicantRegisterForm;
