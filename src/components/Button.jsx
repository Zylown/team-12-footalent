import PropTypes from "prop-types";

export default function Button({ children, className, type, onClick }) {
  return (
    <button
      className={`rounded-[4px] px-4 py-2 transition-all ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// esto sirve para que el boton sea requerido y no se pueda usar sin el children
Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  onClick: PropTypes.func,
};

