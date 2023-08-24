import React, { useState } from "react";

import styles from "./textfieldwithbutton.module.css";
import Button from "../button";

const TextFieldWithButton = ({
  label = "Label",
  placeholder = "nothing passed",
  type = "text",
  onHandleChange,
  value,
  name,
  error = false,
  disabled,
  disabledButton,
  onClickHandler,
  buttonText,
  buttonIcon,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handlerFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div
      className={`${styles.textFieldDiv} d-flex ${
        isFocused ? styles.inputFocused : ""
      } ${error ? styles.inputError : ""}`}
    >
      <div className="d-flex flex-column justify-content-center w-100">
        <div
          className={`${styles.label} ${isFocused ? styles.labelFocused : ""} ${
            error ? styles.labelError : ""
          }`}
        >
          {label}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          className={styles.input}
          disabled={disabled}
          onChange={onHandleChange}
          value={value}
          onFocus={handlerFocus}
          onBlur={handleBlur}
        />
      </div>
      <Button
        className="d-flex align-items-center"
        disabled={disabledButton}
        onClickHandler={onClickHandler}
      >
        {buttonIcon} {buttonText}
      </Button>
    </div>
  );
};
export default TextFieldWithButton;
