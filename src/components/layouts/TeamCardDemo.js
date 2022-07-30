import React, { useEffect, useState } from "react";
import GoogleFontLoader from "react-google-font-loader";
import NoSsr from "@material-ui/core/NoSsr";
import { makeStyles } from "@material-ui/styles";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Column, Row, Item } from "@mui-treasury/components/flex";
import { Info, InfoSubtitle, InfoTitle } from "@mui-treasury/components/info";
import { useApexInfoStyles } from "@mui-treasury/styles/info/apex";
import { useGraphicBtnStyles } from "@mui-treasury/styles/button/graphic";
import { Link, Navigate, useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: "15px",
    height: "100%",
    transition: "0.3s",
    position: "relative",
    "&:before": {
      transition: "0.2s",
      position: "absolute",
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      backgroundColor: "#d9daf1",
      borderRadius: "1rem",
      zIndex: 0,
      bottom: 0,
    },
    "&:hover": {
      "&:before": {
        bottom: -6,
      },
      "& $card": {
        boxShadow: "-12px 12px 64px 0 #bcc3d6",
      },
    },
  },
  card: {
    zIndex: 1,
    position: "relative",
    borderRadius: "1rem",
    boxShadow: "0 6px 20px 0 #dbdbe8",
    backgroundColor: "#fff",
    transition: "0.4s",
    height: "100%",
    padding: "12px",
  },
}));

const CustomCard = ({ title, subtitle, description, salary, postingdate }) => {
  const styles = useStyles();
  const btnStyles = useGraphicBtnStyles();

  return (
    <div className={styles.root}>
      <Column className={styles.card}>
        <InfoTitle>{title}</InfoTitle>
        <Info position={"middle"} useStyles={useApexInfoStyles}>
          <InfoSubtitle>{subtitle}</InfoSubtitle>
          <InfoSubtitle>{postingdate}</InfoSubtitle>
        </Info>
        <Button style={{ backgroundColor: "#E8E8E8", height: "20px" }}>
          ${salary}
        </Button>

        <Box
          pb={1}
          px={2}
          color={"grey.600"}
          fontSize={"0.875rem"}
          fontFamily={"Ubuntu"}
        >
          {description}
        </Box>
      </Column>
    </div>
  );
};

export const TeamCardDemo = React.memo(function TeamCard() {
  const [jobslist, setJobsList] = useState(null);
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(false);

  useEffect(() => {
    axios.get(`jobs`).then((res) => {
      // const ans = await res.data;
      console.log(res.data);
      setJobsList(res.data);
    });
  }, [jobslist]);

  return (
    <>
      <NoSsr>
        <GoogleFontLoader fonts={[{ font: "Ubuntu", weights: [400, 700] }]} />
      </NoSsr>
      {jobslist ? (
        jobslist.map((job) => (
          <div onClick={() => setSelectedJob(true)}>
            <Grid container spacing={10}>
              <Grid item xs={12} md={6} lg={4}>
                <CustomCard
                  postingdate={job.job_posting_date}
                  salary={job.job_salary}
                  title={job.job_title}
                  subtitle={job.job_location}
                  description={job.job_description}
                />
              </Grid>
            </Grid>
          </div>
        ))
      ) : (
        <div>No Jobs to show!!</div>
      )}

      {selectedJob && <div style={{ paddingTop: "25px" }}>Right panwl</div>}
    </>
  );
});
export default TeamCardDemo;
