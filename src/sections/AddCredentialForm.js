import React, { useState } from "react";
import axios from "axios";

function AddCredentialForm() {
  const [file, setFile] = useState();

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

  const sendPostRequest = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("credential_name", formValue.credential_name);

      const response = await axios.post(
        "applicants/d5a3f2ff-b3d3-4ba9-bbfa-6a45e1935c64/credentials",
        formData
      );
      console.log("after post: ", response.data);
    } catch (err) {
      console.log(err);
    }
  };
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
    </div>
  );
}

export default AddCredentialForm;
