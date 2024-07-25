import PropTypes from "prop-types";
import { forwardRef } from "react";

const Options = forwardRef(function Options({  className, options, ...rest }, ref) {
  
    return (
      <select
        ref={ref}
        className={`border px-2 py-2 rounded-[4px] ${className}`}
        {...rest}
      >
        <option value="">Seleccione una opción</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  
});

Options.propTypes = {
  
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

export default Options