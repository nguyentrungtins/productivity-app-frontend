import React from "react";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login, reset } from "../../features/auth/authSlice";
import Spinner from "../Layouts/Spinner";

let isInitial = true;
const Login = () => {
  // console.log(classes);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      // toast.error(message);
      console.log(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }
    if (isInitial == true) {
      isInitial = false;
      dispatch(reset());
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <div className={classes.body__login}>
      <div className={classes.card}>
        <form onSubmit={onSubmit}>
          <h2 className={classes.title}> Log in</h2>
          <p className={classes.subtitle}>
            Don't have an account? <Link to="/register"> Sign Up</Link>
          </p>

          <p className={classes.or}>
            <span>or</span>
          </p>

          <div>
            <div className={classes.input__login}>
              <input
                type="text"
                id="username"
                required
                className={classes.input}
                name="email"
                value={email}
                onChange={onChange}
              />
              <label className={classes.input__label} htmlFor="username">
                Email
              </label>
            </div>
          </div>

          <div>
            <div className={classes.input__login}>
              <input
                type="password"
                id="password"
                required
                className={classes.input}
                value={password}
                name="password"
                onChange={onChange}
              />
              <label className={classes.input__label} htmlFor="password">
                Password
              </label>
            </div>
          </div>
          {isError && <p className={classes.error}>{message}</p>}

          <button className={classes.cta__btn}>Log In</button>
          <a className={classes.forget__pass} href="#">
            Forgot password?
          </a>
        </form>
      </div>
      {isLoading && <Spinner />}
    </div>
  );
};

export default Login;
