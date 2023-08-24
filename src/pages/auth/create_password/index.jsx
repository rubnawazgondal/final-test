import React, { useState } from "react";

import Button from "../../../components/reusable_components/auth_button";
import TextField from "../../../components/reusable_components/auth_textfield";
import ReusableAuthPage from "../../../components/reusable_components/reusable_auth_page";

import styles from "../auth.module.css";

const CreatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <ReusableAuthPage>
      <div className="text-center ">
        <h2 className={styles.heading}>
          <b>
            Welcome to <span>Plexaar Admin!</span>
          </b>
        </h2>
        <p className={styles.sub_heading}>Create New Password</p>
        <div className="mt-5">
          <TextField
            type="password"
            value={password}
            placeholder="Enter New Password"
            onHandleChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            type="password"
            value={confirmPassword}
            placeholder="Confirm New Password"
            onHandleChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button onHandleClick={() => {}} disabled={true}>
            {" "}
            Next
          </Button>
        </div>
      </div>
    </ReusableAuthPage>
  );
};
export default CreatePassword;
