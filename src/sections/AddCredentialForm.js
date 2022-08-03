import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocalState } from "../util/useLocalStorage";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
function AddCredentialForm() {
  const [file, setFile] = useState();
  const [app, setApp] = useLocalState("", "app");
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [credential, setCredential] = useState(null);
  const navigate = useNavigate();

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

  const sendLogoutRequest = async () => {
    await setJwt("");
    await setApp("");
    navigate("/");
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
        `applicants/${app.id}/credentials`,
        formData,
        { headers: headers }
      );
      console.log("after post: ", response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axios
      .get(`applicants/${app.id}/credentials`, {
        headers: { headers },
      })
      .then((res) => {
        setCredential(res.data);
      });
  });

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
      </form>

      <div style={{ paddingTop: "15px" }}>
        {credential ? (
          credential.map((cred) => (
            <div key={cred.id}>
              <Link to={`/credentials/${cred.id}`}>
                Credential ID: {cred.id}
              </Link>
            </div>
          ))
        ) : (
          <div>No Credentials to show!!</div>
        )}
      </div>
    </div>
  );
}

export default AddCredentialForm;
