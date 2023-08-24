import React from "react";

import styles from "./button.module.css";

const Button = ({
  onClickHandler = () => alert("On Click Not Active"),
  children = "Nothing Entered",
  className = "",
  type = "button",
  disabled = false,
  isGreyButton = false,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`${
        isGreyButton && !disabled
          ? styles.greyButton
          : isGreyButton && disabled
          ? styles.disabledGreyButton
          : !isGreyButton && disabled
          ? styles.disabledBlueButton
          : styles.button
      } ${className}`}
      disabled={disabled}
      onClick={onClickHandler}
      {...rest}
    >
      {children}
    </button>
  );
};
export default Button;
