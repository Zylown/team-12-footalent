import PropTypes from "prop-types";
import { forwardRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const Input = forwardRef(function Input(
  { placeholder, className, ...rest },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="relative">
      <input
        ref={ref}
        type={showPassword ? "text" : "password"}
        className={`border px-2 py-2  rounded-[4px] ${className}`}
        placeholder={placeholder}
        {...rest}
      />
      <button
        type="button"
        onClick={toggleShowPassword}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent mr-2"
      >
        {showPassword ? (
          <FaEyeSlash className="text-[#1B2B41] text-opacity-70" />
        ) : (
          <FaEye className="text-[#1B2B41] text-opacity-70" />
        )}
      </button>
    </div>
  );
});

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
};
export default Input;
