import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";

const ViewCredentials = () => {
  const credential_ID = window.location.href.split("/credentials/")[1];
  const [file, setFile] = useState();
  const [jwt] = useLocalState("", "jwt");
  const [credential, setCredential] = useState({
    credential_name: "",
  });

  const handleChange = (event) => {
    setCredential({
      ...credential,
      [event.target.name]: event.target.value,
    });
  };

  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };

  function updateCredential(prop, value) {
    credential[prop] = value;
  }

  useEffect(() => {
    //  if (jwt) {
    axios.get(`${credential_ID}`).then((res) => {
      // const ans = await res.data;
      //console.log(res.data);
      setCredential(res.data);
    });
    //}
  }, [credential]);

  const saveCredential = () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("credential_name", credential.credential_name);

      const res = axios.put(`credentials/${credential_ID}`, formData);
      console.log("after put: ", res.data);
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
          Upload File:{" "}
          <input
            type="file"
            name="file"
            onChange={saveFile}
            //value={credential.credential_file_name}
          />
          {/* {file? {credential.credential_file_name}:''} */}
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
