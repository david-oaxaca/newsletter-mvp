import PropTypes from "prop-types";

const TextField = ({ label, placeholder, onChange }) => {
  return (
    <label className="label-wrapper">
      <span className="input-label text--big">{label}</span>
      <input
        className="textfield input-text"
        type="text"
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

TextField.defaultProps = {
  label: "label",
  placeholder: "input text",
};

export default TextField;
