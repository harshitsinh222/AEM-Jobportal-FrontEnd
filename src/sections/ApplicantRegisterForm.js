import React, { useState } from "react";
import axios from "axios";
import { useLocalState } from "../util/useLocalStorage";
import { useNavigate } from "react-router-dom";

function ApplicantRegisterForm() {
  const navigate = useNavigate();
  const [setJwt] = useLocalState("", "jwt");

  const [file, setFile] = useState();

  const [formValue, setformValue] = useState({
    applicant_name: "",
    applicant_username: "",
    applicant_password: "",
    applicant_email_address: "",
    applicant_gender: "",
    applicant_contact_details: "",
    applicant_professional_summary: "",
    applicant_account_status: "No",
    applicant_highest_educational_attainment: "",
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
    navigate("/");
  };

  const sendPostRequest = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("applicant_name", formValue.applicant_name);
      formData.append("applicant_username", formValue.applicant_username);
      formData.append("applicant_password", formValue.applicant_password);
      formData.append(
        "applicant_email_address",
        formValue.applicant_email_address
      );
      formData.append("applicant_gender", formValue.applicant_gender);
      formData.append(
        "applicant_contact_details",
        formValue.applicant_contact_details
      );
      formData.append(
        "applicant_professional_summary",
        formValue.applicant_professional_summary
      );
      formData.append(
        "applicant_highest_educational_attainment",
        formValue.applicant_highest_educational_attainment
      );
      formData.append(
        "applicant_account_status",
        formValue.applicant_account_status
      );

      const response = await axios.post("addapplicants", formData);
      console.log("after post: ", response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form>
        App name:{" "}
        <input type="text" name="applicant_name" onChange={handleChange} />
        <br />
        Username:{" "}
        <input type="text" name="applicant_username" onChange={handleChange} />
        <br />
        Password:{" "}
        <input
          type="password"
          name="applicant_password"
          onChange={handleChange}
        />
        <br />
        Email:{" "}
        <input
          type="email"
          name="applicant_email_address"
          onChange={handleChange}
        />
        <br />
        Gender:{" "}
        <input type="text" name="applicant_gender" onChange={handleChange} />
        <br />
        Contact:{" "}
        <input
          type="text"
          name="applicant_contact_details"
          onChange={handleChange}
        />
        <br />
        Summary:{" "}
        <input
          type="text"
          name="applicant_professional_summary"
          onChange={handleChange}
        />
        <br />
        Edu:{" "}
        <input
          type="text"
          name="applicant_highest_educational_attainment"
          onChange={handleChange}
        />
        <br />
        DP: <input type="file" name="file" onChange={saveFile} />
        <br />
        <input type="button" value="Add" onClick={sendPostRequest} />
        <br /> <br />
        <input type="button" value="Logout" onClick={sendLogoutRequest} />
      </form>
    </div>
  );
}

export default ApplicantRegisterForm;
