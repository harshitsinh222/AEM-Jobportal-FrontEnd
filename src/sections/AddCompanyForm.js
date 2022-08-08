import React, { useState } from "react";
import axios from "axios";
import { useLocalState } from "../util/useLocalStorage";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import Button from "@mui/material/Button";

function AddCompanyForm() {
  const navigate = useNavigate();

  const [company, setCompany] = useLocalState("", "company");
  const [jwt] = useLocalState("", "jwt");
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

      await axios
        .post(`company`, reqbody, {
          headers: headers,
        })
        .then((response) => {
          if (response.status === 200) {
            setCompany(response.data);
            console.log(company);
            // navigate("/postJob");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    //eslint-disable-line

    if (company) navigate("/postJob");
  }, [company]);
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
              Company Address:{" "}
            </label>
            <TextField
              id="demo-helper-text-misaligned"
              name="company_address"
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
              Contact:{" "}
            </label>
            <TextField
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
      </form>
      <br />
    </div>
  );
}

export default AddCompanyForm;
