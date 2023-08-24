import React, { useState } from "react";
import { BsTrash3Fill, BsExclamationSquareFill } from "react-icons/bs";
import { RiLayout3Fill, RiFolderFill, RiShareFill } from "react-icons/ri";
import { IoIosAdd, IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import styles from "./side_bar.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/reducer/authReducer";

const SideBar = ({
  activeIndex = 1,
  children,
  showTitleBar = false,
  title = "",
  onClickHandler = () => alert("On Click is not active"),
  showButton = false,
}) => {
  const dispatch = useDispatch();
  const [activeTooltipIndex, setActiveTooltipIndex] = useState(null);
  const navigate = useNavigate();
  const listOfSideBar = [
    {
      icon: (
        <RiLayout3Fill
          size="1.4rem"
          className={`${
            activeIndex === 0
              ? styles.iconActiveColor
              : styles.iconDeActiveColor
          }`}
        />
      ),
      onClick: () => navigate("/users_list"),
      tooltip: "users list",
    },
    {
      icon: (
        <RiFolderFill
          size="1.4rem"
          className={`${
            activeIndex === 1
              ? styles.iconActiveColor
              : styles.iconDeActiveColor
          }`}
        />
      ),
      onClick: () => navigate("/subscriptions_list"),
      tooltip: "subscriptions list",
    },
    {
      icon: (
        <RiShareFill
          size="1.4rem"
          className={`${
            activeIndex === 2
              ? styles.iconActiveColor
              : styles.iconDeActiveColor
          }`}
        />
      ),
      onClick: () => navigate("/question_answer_form"),
      tooltip: "QA form",
    },
    {
      icon: (
        <BsTrash3Fill
          size="1.4rem"
          className={`${
            activeIndex === 3
              ? styles.iconActiveColor
              : styles.iconDeActiveColor
          }`}
        />
      ),
      onClick: () => navigate("/"),
      tooltip: "Login",
    },
    {
      icon: (
        <BsExclamationSquareFill
          size="1.4rem"
          className={`${
            activeIndex === 4
              ? styles.iconActiveColor
              : styles.iconDeActiveColor
          }`}
        />
      ),
      onClick: () => navigate("/create_password"),
      tooltip: "Create Password",
    },
    {
      icon: (
        <BsExclamationSquareFill
          size="1.4rem"
          className={`${
            activeIndex === 5
              ? styles.iconActiveColor
              : styles.iconDeActiveColor
          }`}
        />
      ),
      onClick: () => navigate("/staff_listing"),
      tooltip: "Staff Listing",
    },
    {
      icon: (
        <BsExclamationSquareFill
          size="1.4rem"
          className={`${
            activeIndex === 6
              ? styles.iconActiveColor
              : styles.iconDeActiveColor
          }`}
        />
      ),
      onClick: () => navigate("/business_list"),
      tooltip: "Business List",
    },
    {
      icon: (
        <BsExclamationSquareFill
          size="1.4rem"
          className={`${
            activeIndex === 7
              ? styles.iconActiveColor
              : styles.iconDeActiveColor
          }`}
        />
      ),
      onClick: () => navigate("/plexar_users_list"),
      tooltip: "Plexaar Users List",
    },
    {
      icon: (
        <IoIosLogOut size="1.4rem" className={`${styles.iconDeActiveColor}`} />
      ),
      onClick: () => {
        dispatch(logout());
        navigate("/");
      },
      tooltip: "Logout",
    },
  ];

  const handleMouseEnter = (index) => {
    setActiveTooltipIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveTooltipIndex(null);
  };
  return (
    <div className="d-flex pt-1">
      <div
        className={`${styles.sideBar} d-flex flex-column align-items-center`}
      >
        {listOfSideBar.map((item, index) => (
          <div
            key={index}
            className={`${
              activeIndex === index ? styles.activeIndexStyling : ""
            } d-flex align-items-center justify-content-center ${
              styles.toolTipContainer
            }`}
            onClick={item.onClick}
            role="button"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {item.icon}
            {activeTooltipIndex === index && (
              <div
                className={`${styles.toolTip} ${
                  activeIndex === index ? styles.toolTipForActive : ""
                }`}
              >
                {item.tooltip}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.assignHeight}>
        {showTitleBar ? (
          <div
            className={`${styles.titleBarBorder} ms-3 bg-white py-2 d-flex align-items-center justify-content-between`}
          >
            <h1 className={styles.titleBarHeading}>{title}</h1>
            {showButton ? (
              <div className="pe-3 d-flex align-items-center">
                <button
                  className={`${styles.titleBarButton} px-3 d-flex align-items-center`}
                  onClick={onClickHandler}
                >
                  <IoIosAdd size="1.15rem" className="me-1" /> Add New
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
};
export default SideBar;
