import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Avatar, Button } from "@mui/material";
import { useLocalState } from "../util/useLocalStorage";
import { Link, useNavigate } from "react-router-dom";

export default function PrimarySearchAppBar() {
  //const img_src = "src\static\images\monkey.jpg";
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [imgURL, setImgURL] = React.useState("");
  const [app, setApp] = useLocalState("", "app");
  const [localApp, setLocalApp] = React.useState({});
  const [jwt, setJwt] = useLocalState("", "jwt");
  const navigate = useNavigate();
  const [company, setCompany] = useLocalState("", "company");
  const [url, setUrl] = useLocalState("", "url");
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [time, setTime] = React.useState(Date.now());

  // componentDidMount() {
  //   this.interval = setInterval(() => this.tick(), 1000)
  // }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleProfile = () => {
    handleMobileMenuClose();
    navigate(`/users/${localApp.id}`);
  };

  const handleSignup = () => {
    handleMenuClose();
    navigate("/signup");
  };

  const handleLogin = () => {
    handleMenuClose();
    navigate("/login");
  };

  const handleHomePage = () => {
    handleMenuClose();
    navigate("/");
  };

  const handleLogout = async () => {
    handleMenuClose();
    localStorage.clear();
    setLocalApp({});
    // setJwt("");
    // setUrl("");
    // setApp("");
    // setCompany("");
  };
  React.useEffect(() => {
    if (localStorage.length == 0) {
      navigate("/login");
    }
  }, [localStorage.length]);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {localApp ? (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      ) : (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLogin}>Login</MenuItem>
          <MenuItem onClick={handleSignup}>Signup</MenuItem>
        </Menu>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  React.useEffect(() => {
    setLocalApp(JSON.parse(localStorage.getItem("app")));
    localStorage.getItem("app")?.length
      ? setImgURL(
          `http://localhost:8080/users/profile/${
            JSON.parse(localStorage.getItem("app")).id
          }`
        )
      : setImgURL("");
  }, [localStorage.getItem("app")]);

  const navItems = ["Applied Jobs"];

  const handleAppliedJobs = () => {
    navigate("/appliedJobs");
  };
  const handleAddCompany = () => {
    navigate("/addCompany");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button
            onClick={handleHomePage}
            variant="h6"
            nowrap="true"
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
            style={{ color: "white" }}
          >
            Job Portal
          </Button>

          <Box sx={{ flexGrow: 1 }} />
          {localApp && localApp.isAdmin === 0 ? (
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button
                  key={item}
                  sx={{ color: "#fff" }}
                  onClick={handleAppliedJobs}
                  style={{ color: "white", marginRight: "10px" }}
                >
                  {item}
                </Button>
              ))}
            </Box>
          ) : null}

          {localApp && localApp.isAdmin === 1 ? (
            <>
              <Button
                onClick={handleAddCompany}
                variant="h6"
                nowrap="true"
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
                style={{ color: "white" }}
              >
                Add a Company
              </Button>
            </>
          ) : null}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              onClick={handleProfileMenuOpen}
              size="medium"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              {localApp ? (
                <Avatar alt="Remy Sharp" src={imgURL} />
              ) : (
                <Avatar
                  alt="Remy Sharp"
                  src="https://as1.ftcdn.net/v2/jpg/02/59/39/46/1000_F_259394679_GGA8JJAEkukYJL9XXFH2JoC3nMguBPNH.jpg"
                />
              )}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
