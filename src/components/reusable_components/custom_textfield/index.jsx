import React, { useState } from "react";
import { IconContext } from "react-icons";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import styles from "./custom_textfield.module.css";

const TextField = ({
  label = "Label",
  placeholder = "nothing passed",
  type = "text",
  onHandleChange,
  value,
  name,
  className,
  error = false,
  disabled,
  helperText,
  showPasswordIcon = false,
  minDate,
  maxDate,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handlerFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const toggleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  return (
    <div
      className={`${
        styles.textFieldDiv
      } d-flex flex-column justify-content-center ${
        isFocused ? styles.inputFocused : ""
      } ${error ? styles.inputError : ""}`}
    >
      <div
        className={`${styles.label} ${isFocused ? styles.labelFocused : ""} ${
          error ? styles.labelError : ""
        }`}
      >
        {label}
      </div>
      <input
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        name={name}
        className={`${styles.input} ${className}`}
        disabled={disabled}
        onChange={onHandleChange}
        value={value}
        onFocus={handlerFocus}
        onBlur={handleBlur}
        min={type === "date" && minDate ? minDate : undefined}
        max={type === "date" && maxDate ? maxDate : undefined}
      />
      {type === "password" && showPasswordIcon && (
        <button
          className={styles.showPasswordButton}
          onClick={toggleShowPassword}
        >
          <IconContext.Provider value={{ size: "1.2em", color: "gray" }}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </IconContext.Provider>
        </button>
      )}
      {error ? <p className={styles.errorMessage}>{helperText}</p> : null}
    </div>
  );
};
export default TextField;