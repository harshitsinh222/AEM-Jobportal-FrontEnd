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

  const sendPostRequest = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("credential_name", formValue.credential_name);

      const response = await axios.post(
        `applicants/${app.id}/credentials`,
        formData
      );
      console.log("after post: ", response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axios.get(`applicants/${app.id}/credentials`).then((res) => {
      // const ans = await res.data;
      //console.log(res.data);
      setCredential(res.data);
    });
  }, [credential]);

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
        <Button
          variant="contained"
          value="Login"
          onClick={sendLogoutRequest}
          style={{
            marginLeft: "30px",
            width: "100px",

            backgroundColor: "alpha(theme.palette.common.white, 0.15)",
          }}
        >
          Logout
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
      {/* <div>
        <img
          src="applicants/profile/2cfaad57-503b-4693-aa38-2a7406aed55d"
          height="300px"
          width="300 px"
          alt="dp"
        />
      </div> */}
    </div>
  );
}

export default AddCredentialForm;
