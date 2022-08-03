import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocalState } from "../util/useLocalStorage";
import { Link, useNavigate } from "react-router-dom";

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
  }, [app.id]);

  return (
    <div>
      <form>
        Credential name:{" "}
        <input type="text" name="credential_name" onChange={handleChange} />
        <br />
        Upload File: <input type="file" name="file" onChange={saveFile} />
        <br />
        <input type="button" value="Add" onClick={sendPostRequest} />
      </form>

      <div>
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
