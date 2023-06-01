import MainAppLayout from "../layouts/MainAppLayout";
import LargeButton from "../components/Buttons/LargeButton";
import UploadButton from "../components/Buttons/UploadButton";
import TextField from "../components/Forms/TextField";
import TextArea from "../components/Forms/TextArea";
import FileUpload from "../components/Forms/FileUpload";

export default function Home() {
  const handleClick = () => {
    console.log("Hola mundo desde el boton");
  };

  const handleTextfieldChange = () => {
    console.log("Hola mundo desde text input");
  };

  const handleTextareaChange = () => {
    console.log("Hola mundo desde text area");
  };

  return (
    <div className="main-wrapper">
      <FileUpload />
      <TextArea
        label={"Recipient List"}
        placeholder={
          "Add email separated by a comma. E.g. a@mail.com,b@mail.com"
        }
        onChange={handleTextareaChange}
      />
      <LargeButton onClick={handleClick}>Next</LargeButton>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};
