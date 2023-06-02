import PropTypes from "prop-types";

const TextField = ({ label, type, placeholder, onChange }) => {
  return (
    <label className="label-wrapper">
      <span className="input-label text--big">{label}</span>
      <input
        className="textfield input-text"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

TextField.defaultProps = {
  label: "label",
  type: "text",
  placeholder: "input text",
};

export default TextField;
