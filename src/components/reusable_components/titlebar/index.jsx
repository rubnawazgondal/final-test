import React from "react";

import styles from "./title_bar.module.css";
import idkImage from "../../../assets/dark_and_light_button.png";

const TitleBar = () => {
  return (
    <div className={`${styles.titleBar} d-flex align-items-center`}>
      <div className="ms-1 me-4">
        <img src={idkImage} alt="idk" />
      </div>
      <h1 className={`${styles.heading}`}>Add New User</h1>
    </div>
  );
};
export default TitleBar;
