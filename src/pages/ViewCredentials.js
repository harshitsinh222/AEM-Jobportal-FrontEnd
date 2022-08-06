import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalState } from "../util/useLocalStorage";

const ViewCredentials = () => {
  const credential_ID = window.location.href.split("/credentials/")[1];
  const [file, setFile] = useState();
  const [jwt] = useLocalState("", "jwt");
  const [credential, setCredential] = useState({
    credential_name: "",
  });
  const navigate = useNavigate();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt} `,
  };

  const handleChange = (event) => {
    setCredential({
      ...credential,
      [event.target.name]: event.target.value,
    });
  };

  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    //  if (jwt) {
    axios.get(`${credential_ID}`).then((res) => {
      // const ans = await res.data;
      //console.log(res.data);
      setCredential(res.data);
    });
    //}
  }, [credential_ID]);

  const saveCredential = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("credential_name", credential.credential_name);

      const res = await axios.put(`${credential_ID}`, formData, {
        headers: headers,
      });
      console.log("after put: ", res.data);
      navigate("/addCredential");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Credential ID: {credential_ID}</h1>

      {credential ? (
        <>
          Credential name:{" "}
          <input
            type="text"
            name="credential_name"
            onChange={handleChange}
            value={credential.credential_name}
          />
          <br />
          Upload File: <input type="file" name="file" onChange={saveFile} />
          <br />
          <input type="button" value="Add" onClick={saveCredential} />
        </>
      ) : (
        <div>No Credentials to show!!</div>
      )}
    </div>
  );
};

export default ViewCredentials;
