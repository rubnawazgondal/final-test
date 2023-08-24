import React from "react";

const Loader = (props) => {
  return (
    <div
      className={`text-primary text-opacity-75 spinner-border ${props.className}`}
      role="status"
    />
  );
};
export default Loader;
