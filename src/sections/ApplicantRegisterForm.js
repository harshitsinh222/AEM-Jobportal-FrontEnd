import React, { useState } from "react";
import axios from "axios";
import { useLocalState } from "../util/useLocalStorage";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
function ApplicantRegisterForm(props) {
  const navigate = useNavigate();

  const [file, setFile] = useState();

  const [formValue, setformValue] = useState({
    name: "",
    username: "",
    password: "",
    email_address: "",
    gender: "",
    contact_details: "",
    professional_summary: "",
    isAdmin: null,
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

  const sendPostRequest = async (e) => {
    e.preventDefault();

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
      formData.append("isAdmin", formValue.isAdmin);

      await axios
        .post("users", formData)
        .then((res) => {
          if (res.status === 200) {
            props.showAlert("Logged In Successfully", "success");
            navigate("/");
          }
        })
        .catch((err) => {
          props.showAlert("Invalid Credentials", "error");
        });
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
              name="name"
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
              name="email_address"
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
