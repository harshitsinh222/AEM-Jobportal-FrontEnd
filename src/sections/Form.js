import React, { useState } from "react";
import axios from "axios";
function Form() {
  const [formValue, setformValue] = useState({
    applicant_id: "ss",
    applicant_name: "",
    applicant_username: "",
    applicant_password: "",
    applicant_email_address: "",
    applicant_gender: "",
    applicant_contact_details: "",
    applicant_professional_summary: "",
    applicant_highest_educational_attainment: "",
    applicant_profile_image: "",
  });
  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  const sendPostRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_MYURL + ``, {
        applicant_id: formValue.applicant_id,
        applicant_name: formValue.applicant_name,
        applicant_username: formValue.applicant_username,
        applicant_password: formValue.applicant_password,
        applicant_email_address: formValue.applicant_email_address,
        applicant_gender: formValue.applicant_gender,
        applicant_contact_details: formValue.applicant_contact_details,
        applicant_professional_summary:
          formValue.applicant_professional_summary,
        applicant_highest_educational_attainment:
          formValue.applicant_highest_educational_attainment,
        applicant_profile_image: formValue.applicant_profile_image,
      });

      //console.log(formValue);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={sendPostRequest}>
        <input
          type="text"
          value={formValue.applicant_id}
          onChange={handleChange}
        />
        <input
          type="text"
          value={formValue.applicant_name}
          onChange={handleChange}
        />
        <input
          type="text"
          value={formValue.applicant_username}
          onChange={handleChange}
        />
        <input
          type="text"
          value={formValue.applicant_password}
          onChange={handleChange}
        />
        <input
          type="text"
          value={formValue.applicant_email_address}
          onChange={handleChange}
        />
        <input
          type="text"
          value={formValue.applicant_gender}
          onChange={handleChange}
        />
        <input
          type="text"
          value={formValue.applicant_contact_details}
          onChange={handleChange}
        />
        <input
          type="text"
          value={formValue.applicant_professional_summary}
          onChange={handleChange}
        />
        <input
          type="text"
          value={formValue.applicant_highest_educational_attainment}
          onChange={handleChange}
        />
        <input
          type="file"
          value={formValue.applicant_profile_image}
          onChange={handleChange}
        />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}

export default Form;
