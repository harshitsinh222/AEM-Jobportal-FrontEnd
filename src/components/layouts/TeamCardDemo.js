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
import SearchIcon from "@mui/icons-material/Search";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const LINES_TO_SHOW = 2;
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
  multiLineEllipsis: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": LINES_TO_SHOW,
    "-webkit-box-orient": "vertical",
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
          className={styles.multiLineEllipsis}
          pb={1}
          px={2}
          color={"grey.600"}
          fontSize={"0.875rem"}
          fontFamily={"Ubuntu"}
        >
          {description}
        </Box>
      </Column>
    </Card>
  );
};
const RightPanel = ({
  title,
  subtitle,
  description,
  salary,
  postingdate,
  btnShow,
  lastApplicationDate,
  vacancy,
  companyAddress,
  companyName,
  companyWebsite,
  companyContact,
  companyEmail,
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
        <InfoTitle>
          <b style={{ fontSize: "25px" }}>{title}</b>
        </InfoTitle>
        <b>
          <span style={{ color: "#1976d2" }}>{companyName}</span>
        </b>
        <Info position={"middle"} useStyles={useApexInfoStyles}>
          <InfoSubtitle>Location: {subtitle}</InfoSubtitle>
          <InfoSubtitle>Posting Date: {postingdate}</InfoSubtitle>
        </Info>
        <Typography
          style={{
            backgroundColor: "#E8E8E8",
            height: "20px",
            width: "110px",
          }}
        >
          <span style={{ color: "green" }}> ${salary} a year </span>
        </Typography>
        <br />
        {{ btnShow } ? (
          <Button
            size="medium"
            value="Login"
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
        ) : (
          <></>
        )}

        <Box
          pb={1}
          px={2}
          color={"grey.600"}
          fontSize={"0.875rem"}
          fontFamily={"Ubuntu"}
        >
          <hr style={{ color: "grey" }} />
          <h3>Job Details</h3>
          <b> Number of Vacancy: </b>
          {vacancy}
          <br />
          <b>Closing Date: </b>
          {lastApplicationDate}
          <br /> <br />
          <b> Description: </b>
          <br /> {description}
          <br /> <br />
          <b>Company Address:</b>
          <br />
          {companyAddress}
          <br /> <br />
          <b>Company Email:</b>
          <br />
          {companyEmail}
          <br /> <br />
          <b>Company Contact:</b>
          <br />
          {companyContact}
          <br />
          <br />
          <b>Benefits:</b>
          <ul>
            <li>Dental Care</li> <li>Work From Home</li>
          </ul>
          <b>Hiring Insights:</b>
          <ul>
            <li>Hiring {vacancy} candidates for this role</li>
          </ul>
        </Box>
      </Column>
    </Card>
  );
};

export const TeamCardDemo = React.memo(function TeamCard() {
  const [jobslist, setJobsList] = useState(null);
  const [temp, setTemp] = useState(null);
  const [selectedSpecificJob, setSelectedSpecificJob] = useState(null);
  const navigate = useNavigate();
  const [searchedLocation, setSearchedLocation] = useState("");
  const [searchedJob, setSearchedJob] = useState("");
  const [selectedJob, setSelectedJob] = useState(false);
  const handleSearch = () => {
    jobslist.filter((job) => {
      job.job_title.toLowerCase().includes(searchedJob);
      setTemp(job);
    });
    // console.log(temp);
  };
  useEffect(() => {
    axios.get(`jobs`).then((res) => {
      // const ans = await res.data;

      setJobsList(res.data);
      setTemp(jobslist);
    });
    // if (jobslist) {
    //   handleSearch();
    // }
  }, [jobslist]);

  return (
    <div style={{ overflow: "hidden" }}>
      <Box>
        <Toolbar
          style={{
            left: "28%",
            width: "500px",
            backgroundColor: "white",
          }}
        >
          <Search>
            <StyledInputBase
              placeholder="Search for job titles"
              inputProps={{ "aria-label": "search" }}
              onChange={(event) => {
                setSearchedJob({
                  ...searchedJob,
                  [event.target.name]: event.target.value,
                });
              }}
            />
          </Search>

          <Search>
            <StyledInputBase
              placeholder="Location"
              inputProps={{ "aria-label": "search" }}
              onChange={(event) => {
                setSearchedLocation({
                  ...searchedLocation,
                  [event.target.name]: event.target.value,
                });
              }}
            />
          </Search>
          <IconButton
            size="large"
            aria-label="search icon"
            color="inherit"
            onClick={handleSearch}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </IconButton>
        </Toolbar>
      </Box>
      <hr />
      <NoSsr>
        <GoogleFontLoader fonts={[{ font: "Ubuntu", weights: [400, 700] }]} />
      </NoSsr>
      <Box>
        <Grid container spacing={1} style={{ msOverflowStyle: "hidden" }}>
          <Items
            direction="column"
            style={{ width: "400px", marginLeft: "60px", marginTop: "40px" }}
          >
            {" "}
            {console.log("hee" + { temp })}
            {temp ? (
              temp.map((job, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedJob(true);

                    setSelectedSpecificJob(job);
                  }}
                >
                  <Grid
                    container
                    spacing={10}
                    style={{ width: "400px", marginBottom: "40px" }}
                  >
                    <CustomCard
                      //postingdate={job.job_posting_date}
                      // salary={job.job_salary}
                      title={job.job_title}
                      subtitle={job.job_location}
                      description={job.job_description}
                      btnShow={selectedJob}
                    />
                  </Grid>
                </div>
              ))
            ) : (
              <div>No Jobs to show!!</div>
            )}
          </Items>
          <Items
            direction="column"
            style={{
              width: "800px",
              overflowX: "hidden",
              overflowY: "scroll",

              height: 600,
            }}
          >
            {selectedSpecificJob && (
              <div>
                <Grid style={{ width: "800px" }} spacing={10}>
                  <RightPanel
                    jobid={selectedSpecificJob.job_id}
                    postingdate={selectedSpecificJob.job_posting_date}
                    salary={selectedSpecificJob.job_salary}
                    title={selectedSpecificJob.job_title}
                    subtitle={selectedSpecificJob.job_location}
                    description={selectedSpecificJob.job_description}
                    lastApplicationDate={
                      selectedSpecificJob.last_application_date
                    }
                    vacancy={selectedSpecificJob.no_of_vacancy}
                    companyName={selectedSpecificJob.company.company_name}
                    companyAddress={selectedSpecificJob.company.company_address}
                    companyContact={selectedSpecificJob.company.company_contact}
                    companyEmail={selectedSpecificJob.company.company_email}
                    companyWebsite={selectedSpecificJob.company.company_website}
                  ></RightPanel>
                </Grid>
              </div>
            )}
          </Items>
        </Grid>
      </Box>
    </div>
  );
});
export default TeamCardDemo;
