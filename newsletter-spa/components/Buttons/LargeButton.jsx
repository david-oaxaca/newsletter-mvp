import PropTypes from "prop-types";

const LargeButton = ({ children, onClick, type }) => {
  return (
    <button
      className="button button--large button-text"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

LargeButton.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

LargeButton.defaultProps = {
  children: "Button",
  type: "button",
};

export default LargeButton;
