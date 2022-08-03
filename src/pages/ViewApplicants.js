import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalState } from "../util/useLocalStorage";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ViewApplicants = () => {
  const applicant_ID = window.location.href.split("/applicants/")[1];
  const [file, setFile] = useState();
  const [jwt] = useLocalState("", "jwt");
  const navigate = useNavigate();

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

  useEffect(() => {
    //  if (jwt) {
    axios.get(`${applicant_ID}`).then((res) => {
      // const ans = await res.data;
      //console.log(res.data);
      setformValue(res.data);
    });
    //}
  }, [applicant_ID]);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt} `,
  };

  const updateApplicant = async () => {
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

      console.log("fdv: ");
      // Display the values
      for (const value of formData.values()) {
        console.log(value);
      }

      const response = await axios.put(`${applicant_ID}`, formData, {
        headers: headers,
      });
      console.log("after app update: ", response.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Applicant ID: {applicant_ID}</h1>

      {formValue ? (
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
                  value={formValue.applicant_name}
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
                  value={formValue.applicant_email_address}
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
                  name="applicant_username"
                  onChange={handleChange}
                  size="small"
                  style={{ width: "300px" }}
                  value={formValue.username}
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
                  value={formValue.applicant_gender}
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
                  value={formValue.applicant_contact_details}
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
                  value={formValue.applicant_professional_summary}
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
                  value={formValue.applicant_highest_educational_attainment}
                />
              </div>
            </div>
            <br />
            Profile Photo: <input type="file" name="file" onChange={saveFile} />
            <br /> <br />
            <Button
              variant="contained"
              value="Login"
              onClick={updateApplicant}
              style={{
                width: "100px",

                backgroundColor: "alpha(theme.palette.common.white, 0.15)",
              }}
            >
              Add
            </Button>
          </form>
        </div>
      ) : (
        <div>No applicants to show!!</div>
      )}
    </div>
  );
};

export default ViewApplicants;
