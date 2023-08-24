import React, { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../../../components/reusable_components/auth_button";
import TextField from "../../../components/reusable_components/auth_textfield";
import ReusableAuthPage from "../../../components/reusable_components/reusable_auth_page";

import styles from "../auth.module.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const validateEmail = () => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };
  return (
    <ReusableAuthPage>
      <div className="text-center ">
        <h2 className={styles.heading}>
          <b>
            Welcome to <span>Plexaar Admin!</span>
          </b>
        </h2>
        <p className={styles.sub_heading}>Forget Password</p>
        <div className="mt-5">
          <TextField
            type="email"
            value={email}
            placeholder="Email Address"
            onHandleChange={(e) => setEmail(e.target.value)}
          />
          <Button onHandleClick={() => {}} disabled={!validateEmail()}>
            {" "}
            Next
          </Button>
        </div>
        <div className="mt-3">
          <Link
            to="/"
            className="text-primary text-opacity-75 text-decoration-none"
          >
            Back To Login?
          </Link>
        </div>
      </div>
    </ReusableAuthPage>
  );
};
export default ForgetPassword;
