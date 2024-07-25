import PropTypes from "prop-types";

export default function CardWhite({ children, className }) {
  return (
    <div
      className={`flex flex-col shadow-custom-lg rounded-lg ${className}`}
    >
      {children}
    </div>
  );
}

CardWhite.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
