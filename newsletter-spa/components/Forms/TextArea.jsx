import PropTypes from "prop-types";

const TextArea = ({ label, placeholder, onChange }) => {
  return (
    <label className="label-wrapper">
      <span className="input-label text--big">{label}</span>
      <textarea
        className="textarea input-text"
        placeholder={placeholder}
        onChange={onChange}
        cols={1}
        rows={1}
      />
    </label>
  );
};

export default TextArea;
