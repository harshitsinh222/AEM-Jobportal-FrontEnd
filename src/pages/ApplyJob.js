import { Item } from "@mui-treasury/components/flex";
import { Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AlertBox from "../components/AlertBox";
import { useLocalState } from "../util/useLocalStorage";
import CredentialsTable from "./CredentialsTable";

const ApplyJob = (props) => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [resumeURL, setResumeURL] = useLocalState("", "url");

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();

  const appid = query.get("appid");
  const jobid = query.get("jobid");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt} `,
  };

  const reqBody = {
    application_status: "applied",
    application_doc: resumeURL,
  };

  const navigate = useNavigate();

  const handleApplyJob = async () => {
    await axios
      .post(`appdetails/${appid}/${jobid}`, reqBody, {
        headers: headers,
      })
      .then(() => {
        props.showAlert("Job Applied Successfully!", "success");
        navigate("/");
      })
      .catch((err) => {
        props.showAlert("Job Not Applied!", "error");
      });
  };

  const handleCancelJob = () => {
    navigate("/");
  };

  return (
    <div style={{ paddingLeft: "15px", paddingTop: "20px" }}>
      <Typography variant="h4" gutterBottom component="div">
        Your resume from the following documents will be sent to the employer...
      </Typography>
      <CredentialsTable />
      <br />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={3}>
          <Button
            size="medium"
            value="apply"
            onClick={handleApplyJob}
            style={{
              width: "120px",
              height: "40px",
              backgroundColor: "#1976d2",
              color: "white",
            }}
          >
            Apply
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            size="medium"
            value="cancel"
            onClick={handleCancelJob}
            style={{
              width: "120px",
              height: "40px",
              backgroundColor: "#1976d2",
              color: "white",
            }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ApplyJob;
