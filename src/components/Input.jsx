import PropTypes from "prop-types";
import { forwardRef } from "react";

const Input = forwardRef(function Input({ type,placeholder, className, ...rest }, ref) {

  return (
    <input
      ref={ref}
      type={type}
      className={`border px-2 py-2 rounded-[4px] ${className}`}
      placeholder={placeholder}
      {...rest}
    />
  );
});

Input.propTypes = {
  type: PropTypes.oneOf(["text", "password"]).isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  
};

export default Input