import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalState } from "../util/useLocalStorage";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const ViewApplicants = () => {
  const ID = window.location.href.split("/users/")[1];
  const [file, setFile] = useState();
  const [jwt] = useLocalState("", "jwt");
  const navigate = useNavigate();

  const [formValue, setformValue] = useState({
    name: "",
    username: "",
    password: "",
    email_address: "",
    gender: "",
    contact_details: "",
    professional_summary: "",
    account_status: "No",
    highest_educational_attainment: "",
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
    axios.get(`${ID}`).then((res) => {
      setformValue(res.data);
    });
  }, [ID]);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt} `,
  };

  const addCredentials = () => {
    navigate("/addCredential");
  };

  const updateApplicant = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", formValue.name);
      formData.append("username", formValue.username);
      formData.append("password", formValue.password);
      formData.append("email_address", formValue.email_address);
      formData.append("gender", formValue.gender);
      formData.append("contact_details", formValue.contact_details);
      formData.append("professional_summary", formValue.professional_summary);
      formData.append(
        "highest_educational_attainment",
        formValue.highest_educational_attainment
      );
      formData.append("account_status", formValue.account_status);

      console.log("fdv: ");
      // Display the values
      for (const value of formData.values()) {
        console.log(value);
      }

      const response = await axios.put(`${ID}`, formData, {
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
      <Typography variant="h4" gutterBottom component="div" sx={{m:2}}>
        Update User: {formValue.name}
      </Typography>

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
                  name="name"
                  onChange={handleChange}
                  size="small"
                  style={{ width: "300px" }}
                  value={formValue.name}
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
                  name="email_address"
                  onChange={handleChange}
                  size="small"
                  style={{ width: "300px" }}
                  value={formValue.email_address}
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
                  name="password"
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
                  name="gender"
                  onChange={handleChange}
                  size="small"
                  style={{ width: "300px" }}
                  value={formValue.gender}
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
                  name="contact_details"
                  onChange={handleChange}
                  size="small"
                  style={{ width: "300px" }}
                  value={formValue.contact_details}
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
                  name="professional_summary"
                  onChange={handleChange}
                  size="small"
                  style={{ width: "300px" }}
                  value={formValue.professional_summary}
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
                  name="highest_educational_attainment"
                  onChange={handleChange}
                  size="small"
                  style={{ width: "300px" }}
                  value={formValue.highest_educational_attainment}
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
            <Button
              variant="contained"
              onClick={addCredentials}
              style={{
                width: "200px",
                marginLeft: "10px",
                backgroundColor: "alpha(theme.palette.common.white, 0.15)",
              }}
            >
              Add Credentials
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
