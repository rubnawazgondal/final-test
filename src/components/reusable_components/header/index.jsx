import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";

import userLogo from "../../../assets/user_logo.png";
import expertLogo from "../../../assets/expert_logo.png";
import plexarLogo from "../../../assets/plexaar_colorful.png";

import styles from "./header.module.css";

const Header = ({ showIcons = true, showAdmin = true, showUser = true }) => {
  return (
    <div className={`${styles.header} d-flex justify-content-between`}>
      <div className={`${styles.plexaarLogo}`}>
        <img src={plexarLogo} alt="plexaarLogo" />
      </div>
      <div className="d-flex">
        {showIcons ? (
          <>
            <div className="d-flex align-items-center">
              <IoMdNotificationsOutline
                size="1.25rem"
                className={`${styles.icon}`}
              />
              <IoSettingsOutline size="1.05rem" className={`${styles.icon}`} />
            </div>
            <div className={`${styles.divider} ms-3`} />
          </>
        ) : null}
        {showAdmin ? (
          <>
            <div
              className={`${styles.expertImage} d-flex align-items-center me-2`}
            >
              <img src={expertLogo} alt="expert" />
            </div>
            <div className={`${styles.divider}`} />
          </>
        ) : null}
        {showUser ? (
          <div className={`${styles.userLogo} d-flex align-items-center mx-3`}>
            <img src={userLogo} alt="user" />
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Header;
