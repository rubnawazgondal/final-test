import React, { useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import styles from "./custom_dropdown.module.css";

const CustomDropdown = ({
  id = "nothing Entered",
  options,
  value,
  onChange,
  disabled,
  labelKey,
  valueKey,
}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const handlerFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  return (
    <>
      <div
        className={`${styles.textFieldDiv} ${
          isFocused ? styles.inputFocused : ""
        }`}
      >
        <div
          className=" dropdown ms-2 d-flex flex-column text-primary justify-content-center"
          onClick={
            disabled
              ? null
              : (e) => {
                  e.preventDefault();
                  setShowDropDown(!showDropDown);
                }
          }
          onFocus={handlerFocus}
          onBlur={handleBlur}
        >
          <div
            className={`${styles.label} ${
              isFocused ? styles.labelFocused : ""
            }`}
          >
            {id}
          </div>
          <div className="d-flex justify-content-between align-items-center text-dark ">
            <div className={styles.input}>{value}</div>
            <span className="icon_line">
              <BiSolidDownArrow size={8} />
            </span>
          </div>
        </div>
        <ul
          className={`dropdown-menu ${
            showDropDown ? "d-block" : ""
          } position-absolute p-2 mt-1 overflow-auto bg-white`}
          style={{
            maxHeight: "25vh",
            maxWidth: "25vw",
          }}
        >
          {options.map((option, index) => (
            <li
              key={index}
              className="dropdown-item"
              onClick={() => {
                onChange(option.id);
                setShowDropDown(false);
              }}
            >
              {option[labelKey]}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CustomDropdown;
