import React from "react";
import { Link } from "react-router-dom";
import classes from "./Login.module.css";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { register, reset } from "../../features/auth/authSlice";
import Spinner from "../Layouts/Spinner";

let isInitial = true;
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  // console.log("alo2");
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

    if (password !== password2) {
      console.log("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  // console.log(classes);
  return (
    <div className={classes.body__login}>
      <div className={classes.card}>
        <form onSubmit={onSubmit}>
          <h2 className={classes.title}> Sign up</h2>
          <p className={classes.subtitle}>
            Already have an account? <Link to="/login"> Sign In</Link>
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
                onChange={onChange}
                value={email}
              />
              <label className={classes.input__label} htmlFor="username">
                Email
              </label>
            </div>
          </div>
          <div>
            <div className={classes.input__login}>
              <input
                type="text"
                id="fullname"
                required
                className={classes.input}
                name="name"
                value={name}
                onChange={onChange}
              />
              <label className={classes.input__label} htmlFor="fullname">
                Fullname
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
                name="password"
                value={password}
                onChange={onChange}
              />
              <label className={classes.input__label} htmlFor="password">
                Password
              </label>
            </div>
          </div>
          <div>
            <div className={classes.input__login}>
              <input
                type="password"
                id="password2"
                required
                className={classes.input}
                value={password2}
                name="password2"
                onChange={onChange}
              />
              <label className={classes.input__label} htmlFor="password2">
                Confirm password
              </label>
            </div>
          </div>
          {isError && <p className={classes.error}>{message}</p>}

          <button type="submit" className={classes.cta__btn}>
            Sign up
          </button>
          <a className={classes.forget__pass} href="#">
            Forgot password?
          </a>
        </form>
      </div>
      {isLoading && <Spinner />}
    </div>
  );
};

export default Register;
