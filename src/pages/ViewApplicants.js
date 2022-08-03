import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalState } from "../util/useLocalStorage";

const ViewApplicants = () => {
  const applicant_ID = window.location.href.split("/applicants/")[1];
  const [file, setFile] = useState();
  const [jwt] = useLocalState("", "jwt");
  const navigate = useNavigate();

  const [formValue, setformValue] = useState({
    applicant_name: "",
    username: "",
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

  useEffect(() => {
    //  if (jwt) {
    axios.get(`${applicant_ID}`).then((res) => {
      // const ans = await res.data;
      //console.log(res.data);
      setformValue(res.data);
    });
    //}
  }, [applicant_ID]);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt} `,
  };

  const updateApplicant = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("applicant_name", formValue.applicant_name);
      formData.append("username", formValue.username);
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

      console.log("fdv: ");
      // Display the values
      for (const value of formData.values()) {
        console.log(value);
      }

      const response = await axios.put(`${applicant_ID}`, formData, {
        headers: headers,
      });
      console.log("after app update: ", response.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Applicant ID: {applicant_ID}</h1>

      {formValue ? (
        <>
          App name:{" "}
          <input
            type="text"
            name="applicant_name"
            onChange={handleChange}
            value={formValue.applicant_name}
          />
          <br />
          Username:{" "}
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={formValue.username}
          />
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
            value={formValue.applicant_email_address}
          />
          <br />
          Gender:{" "}
          <input
            type="text"
            name="applicant_gender"
            onChange={handleChange}
            value={formValue.applicant_gender}
          />
          <br />
          Contact:{" "}
          <input
            type="text"
            name="applicant_contact_details"
            onChange={handleChange}
            value={formValue.applicant_contact_details}
          />
          <br />
          Summary:{" "}
          <input
            type="text"
            name="applicant_professional_summary"
            onChange={handleChange}
            value={formValue.applicant_professional_summary}
          />
          <br />
          Edu:{" "}
          <input
            type="text"
            name="applicant_highest_educational_attainment"
            onChange={handleChange}
            value={formValue.applicant_highest_educational_attainment}
          />
          <br />
          DP: <input type="file" name="file" onChange={saveFile} />
          <br />
          <input
            type="button"
            value="Update Applicant"
            onClick={updateApplicant}
          />
        </>
      ) : (
        <div>No applicants to show!!</div>
      )}
    </div>
  );
};

export default ViewApplicants;
