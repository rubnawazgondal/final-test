import { useState } from "react";
import { IconContext } from "react-icons";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import styles from "./textfield.module.css";

const AuthTextField = ({
  placeholder = "nothing passed",
  type = "text",
  onHandleChange,
  value,
  name,
  className,
  error = true,
  disabled,
  helperText,
  classNameParent = "",
  showPasswordIcon = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div className={`${styles.inputFormDiv} ${classNameParent}`}>
      <input
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        name={name}
        className={`${styles.inputDesign} ${className}`}
        disabled={disabled}
        onChange={onHandleChange}
        value={value}
      />
      {type === "password" && showPasswordIcon && (
        <button
          className={styles.showPasswordButton}
          onClick={toggleShowPassword}
        >
          {/* Use IconContext to set the size and color of the icon */}
          <IconContext.Provider value={{ size: "1.2em", color: "gray" }}>
            {/* Render the icon here based on the showPassword state */}
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </IconContext.Provider>
        </button>
      )}
      {error ? <p className={styles.errorMessage}>{helperText}</p> : null}
    </div>
  );
};

export default AuthTextField;
