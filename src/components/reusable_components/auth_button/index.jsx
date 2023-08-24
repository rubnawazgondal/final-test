import Loader from "../loader";
import styles from "./button.module.css";

const Button = ({
  className = "",
  onHandleClick = () => {},
  children,
  variant,
  color,
  type,
  size,
  shape,
  isLoading,
  disabled,
  ...rest
}) => {
  return (
    <button
      className={styles.btnDesign}
      type={type}
      disabled={isLoading || disabled}
      onClick={onHandleClick}
      {...rest}
    >
      {isLoading ? <Loader className="text-light" /> : children}
    </button>
  );
};

export default Button;
