import PropTypes from "prop-types";

const TextField = ({ label, type, placeholder, onChange, myRef }) => {
  return (
    <label className="label-wrapper">
      <span className="input-label text--big">{label}</span>
      <input
        className="textfield input-text"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        ref={myRef}
      />
    </label>
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  ref: PropTypes.func,
};

TextField.defaultProps = {
  label: "label",
  type: "text",
  placeholder: "input text",
};

export default TextField;
