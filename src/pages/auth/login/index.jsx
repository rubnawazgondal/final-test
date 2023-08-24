import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { getStorage } from "../../../utils";

import { signIn } from "../../../global/fetch_requests";
import Button from "../../../components/reusable_components/auth_button";
import TextField from "../../../components/reusable_components/auth_textfield";
import ReusableAuthPage from "../../../components/reusable_components/reusable_auth_page";
import { useNavigate } from "react-router-dom";

import INdex from "../../../asskll";

import styles from "../auth.module.css";
import { loginSuccess, setProfile } from "../../../redux/reducer/authReducer";

const checkProfile = (dispatch, navigate) => {
  const profileFromCookie = getStorage("profile");
  const tokenFromCookie = getStorage("token");
  if (profileFromCookie !== undefined && tokenFromCookie !== undefined) {
    if (
      profileFromCookie &&
      profileFromCookie.user &&
      tokenFromCookie &&
      tokenFromCookie.jwtToken !== "" &&
      tokenFromCookie.jwtRefreshToken !== ""
    ) {
      dispatch(
        setProfile({
          profile: profileFromCookie.user,
          jwtToken: tokenFromCookie.jwtToken,
          jwtRefreshToken: tokenFromCookie.jwtRefreshToken,
        })
      );
      navigate("/users_list");
      return;
    }
  }
};

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    checkProfile(dispatch, navigate);
  }, [dispatch, navigate]);

  const validateEmail = () => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };

  const validatePassword = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!"£$@#%^&*])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handleSignIn = () => {
    setIsLoading(true);
    const data = {
      email: email,
      password: password,
    };
    signIn(data)
      .then((res) => {
        if (res?.code === 4) {
          dispatch(loginSuccess(res?.result));
          navigate("/users_list");
        } else {
          setMessage(res?.message);
          setIsSuccess(false);
        }
      })
      .catch((e) => {
        setMessage(e.message);
        setIsSuccess(false);
      })
      .finally(() => setIsLoading(false));
    // navigate("/forget_password");
  };
  return (
    <ReusableAuthPage>
      <div className="text-center ">
        <h2 className={styles.heading}>
          <b>
            Welcome to <span>Plexaar Admin!</span>
          </b>
        </h2>
        <p className={styles.sub_heading}>Enter Your email & password</p>
        <div className="mt-5">
          <TextField
            type="email"
            value={email}
            placeholder="Email Address"
            onHandleChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            value={password}
            placeholder="Enter Password"
            onHandleChange={(e) => setPassword(e.target.value)}
            showPasswordIcon={true}
          />
          <div>NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO</div>
          <Button
            onHandleClick={handleSignIn}
            disabled={!validateEmail() || !validatePassword()}
            isLoading={isLoading}
          >
            Sign In
          </Button>
          <div className="mt-3">
            <Link
              to="/forget_password"
              className="text-primary text-opacity-75 text-decoration-none"
            >
              Forget Password?
            </Link>
          </div>
          <p className={`${isSuccess ? "text-success" : "text-danger"} fs-6`}>
            {message}
          </p>
        </div>
      </div>
      <INdex></INdex>
    </ReusableAuthPage>
  );
};

export default Login;
