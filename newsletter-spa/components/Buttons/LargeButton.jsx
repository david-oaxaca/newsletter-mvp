import PropTypes from "prop-types";

const LargeButton = ({ children, onClick }) => {
  return (
    <button className="button button--large button-text" onClick={onClick}>
      {children}
    </button>
  );
};

LargeButton.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
};

LargeButton.defaultProps = {
  children: "Button",
};

export default LargeButton;
