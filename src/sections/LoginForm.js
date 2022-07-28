import { useEffect, useState } from "react";
import axios from "axios";
import { useLocalState } from "../util/useLocalStorage";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [jwt, setJwt] = useLocalState("", "jwt");
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
        }
      });
  };
  useEffect(() => {
    //eslint-disable-line
    if (jwt) navigate("/");
  }, [jwt]);
  return (
    <div>
      <form>
        Username: <input type="text" name="username" onChange={handleChange} />
        <br />
        Password: <input type="text" name="password" onChange={handleChange} />
        <br />
        <input type="button" value="Login" onClick={sendLoginRequest} />
      </form>
    </div>
  );
}

export default LoginForm;
