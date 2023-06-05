import PropTypes from "prop-types";

const TextArea = ({ label, placeholder, onChange, myRef }) => {
  return (
    <label className="label-wrapper">
      <span className="input-label text--big">{label}</span>
      <textarea
        className="textarea input-text"
        placeholder={placeholder}
        onChange={onChange}
        ref={myRef}
      />
    </label>
  );
};

TextArea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  ref: PropTypes.func,
};

TextArea.defaultProps = {
  label: "label",
  placeholder: "input text",
};

export default TextArea;
