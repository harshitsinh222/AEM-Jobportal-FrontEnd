import { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { useLocalState } from "../util/useLocalStorage";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
function LoginForm() {
  const navigate = useNavigate();
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [app, setApp] = useLocalState("", "app");
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
    error: null,
  });
  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const sendLoginRequest = (e) => {
    e.preventDefault();
    setFormValue({
      ...formValue,
      error: "",
    });

    const reqBody = {
      username: formValue.username,
      password: formValue.password,
    };

    axios
      .post("api/auth/login", reqBody, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setJwt(response.headers.authorization);
          setApp(response.data);
        }
      });
  };
  useEffect(() => {
    //eslint-disable-line
    if (jwt) navigate("/");
  }, [jwt]);
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translateX(-50%) translateY(-50%)",
        }}
      >
        <form>
          <div>
            <TextField
              label="Username"
              id="demo-helper-text-misaligned"
              name="username"
              onChange={handleChange}
              size="normal"
              style={{ width: "300px" }}
            />
          </div>

          <br />
          <div>
            <TextField
              label="Password"
              id="demo-helper-text-misaligned"
              name="password"
              size="normal"
              onChange={handleChange}
              style={{ width: "300px" }}
            />
          </div>
          <br />
          <Button
            variant="contained"
            value="Login"
            onClick={sendLoginRequest}
            style={{
              width: "300px",
              height: "56px",
              backgroundColor: "alpha(theme.palette.common.white, 0.15)",
            }}
          >
            Login
          </Button>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
