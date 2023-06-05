import PropTypes from "prop-types";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const UploadButton = ({ children, onClick }) => {
  return (
    <button
      type="button"
      className="button button--upload button-text"
      onClick={onClick}
    >
      <FileUploadIcon sx={{ fontSize: 40 }} />
      {children}
    </button>
  );
};

UploadButton.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
};

UploadButton.defaultProps = {
  children: "Button",
};

export default UploadButton;
