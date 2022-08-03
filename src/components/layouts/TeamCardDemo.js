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
import PropTypes from "prop-types";
import { Card, CardActions, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

function Items(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "#fff",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        p: 1,
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};
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

const CustomCard = ({
  title,
  subtitle,
  description,
  salary,
  postingdate,
  btnShow,
}) => {
  const styles = useStyles();
  const btnStyles = useGraphicBtnStyles();
  const navigate = useNavigate();

  const handleApplyJob = () => {
    // navigate(/
  };

  return (
    <Card className={styles.root}>
      <Column className={styles.card}>
        <InfoTitle>{title}</InfoTitle>
        <Info position={"middle"} useStyles={useApexInfoStyles}>
          <InfoSubtitle>{subtitle}</InfoSubtitle>
          <InfoSubtitle>{postingdate}</InfoSubtitle>
        </Info>
        {console.log("sel", { btnShow })}

        <Box
          pb={1}
          px={2}
          color={"grey.600"}
          fontSize={"0.875rem"}
          fontFamily={"Ubuntu"}
        >
          {description}
        </Box>
        {{ btnShow } ? (
          <CardActions>
            <Button
              size="medium"
              value="Login"
              onClick={handleApplyJob}
              style={{
                width: "100px",
                height: "40px",
                backgroundColor: "#1976d2",
              }}
            >
              Apply
            </Button>
          </CardActions>
        ) : (
          <></>
        )}
      </Column>
    </Card>
  );
};

export const TeamCardDemo = React.memo(function TeamCard() {
  const [jobslist, setJobsList] = useState(null);
  const [selectedSpecificJob, setSelectedSpecificJob] = useState(null);
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(false);

  useEffect(() => {
    axios.get(`jobs`).then((res) => {
      // const ans = await res.data;

      setJobsList(res.data);
    });
  }, [jobslist]);

  return (
    <>
      <NoSsr>
        <GoogleFontLoader fonts={[{ font: "Ubuntu", weights: [400, 700] }]} />
      </NoSsr>
      <Box
        sx={{
          display: "grid",
          columnGap: 3,
          rowGap: 1,
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        <Items>
          {" "}
          {jobslist ? (
            jobslist.map((job, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedJob(true);

                  setSelectedSpecificJob(job);
                }}
              >
                <Grid container spacing={10}>
                  <Grid item xs={12} md={6} lg={4}>
                    <CustomCard
                      //postingdate={job.job_posting_date}
                      // salary={job.job_salary}
                      title={job.job_title}
                      subtitle={job.job_location}
                      description={job.job_description}
                      btnShow={selectedJob}
                    />
                  </Grid>
                </Grid>
              </div>
            ))
          ) : (
            <div>No Jobs to show!!</div>
          )}
        </Items>
        <Items>
          {selectedSpecificJob && (
            <div>
              <Grid container spacing={10}>
                <Grid item xs={12} md={6} lg={4}>
                  <CustomCard
                    jobid={selectedSpecificJob.job_id}
                    postingdate={selectedSpecificJob.job_posting_date}
                    salary={selectedSpecificJob.job_salary}
                    title={selectedSpecificJob.job_title}
                    subtitle={selectedSpecificJob.job_location}
                    description={selectedSpecificJob.job_description}
                  ></CustomCard>
                </Grid>
              </Grid>
            </div>
          )}
        </Items>
      </Box>
    </>
  );
});
export default TeamCardDemo;
