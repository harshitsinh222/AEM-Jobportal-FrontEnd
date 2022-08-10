import React, { useState } from "react";
import axios from "axios";
import { useLocalState } from "../util/useLocalStorage";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CredentialsTable from "../pages/CredentialsTable";

function AddCredentialForm() {
  const [file, setFile] = useState();
  const [app] = useLocalState("", "app");
  const [jwt] = useLocalState("", "jwt");

  const [formValue, setformValue] = useState({
    credential_name: "",
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

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt} `,
  };

  const sendPostRequest = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("credential_name", formValue.credential_name);

      const response = await axios.post(
        `users/${app.id}/credentials`,
        formData,
        { headers: headers }
      );
      console.log("after post: ", response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ paddingLeft: "15px", paddingTop: "20px" }}>
      <form>
        <div style={{ flex: 1, marginRight: "10px" }}>
          <label> Credential name: </label>
          <TextField
            id="demo-helper-text-misaligned"
            name="credential_name"
            onChange={handleChange}
            size="small"
            style={{ width: "300px" }}
          />
        </div>
        <br />
        Upload File:{"  "}
        <input type="file" name="file" onChange={saveFile} />
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
        <br />
        <br />
      </form>

      <CredentialsTable />
    </div>
  );
}

export default AddCredentialForm;
