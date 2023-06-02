import MainAppLayout from "../layouts/MainAppLayout";
import LargeButton from "../components/Buttons/LargeButton";
import TextField from "../components/Forms/TextField";
import TextArea from "../components/Forms/TextArea";
import FileUpload from "../components/Forms/FileUpload";

export default function Newsletter() {
  const handleClick = () => {
    console.log("Hola mundo desde el boton");
  };

  const handleTextfieldChange = () => {
    console.log("Hola mundo desde text input");
  };

  const handleTextAreaChange = () => {
    console.log("Hola mundo desde text area");
  };

  const handleFileUpload = (file) => {
    console.log("Hola mundo desde text area");
  };

  return (
    <div className="newsletter-container">
      <h1 className="subtitle">Publish Something</h1>
      <TextField
        label="Title"
        type="text"
        placeholder="Add the title to the newsletter"
        onChange={handleTextfieldChange}
      />
      <TextArea
        label="Information"
        placeholder="Add any info that you wish to include in the newsletter"
        onChange={handleTextAreaChange}
      />
      <FileUpload onFileUploaded={handleFileUpload} />
      <TextArea
        label="Recipients List"
        placeholder="Add e-mails separated by a comma. E.g. a@mail.com,b@mail.com"
        onChange={handleTextAreaChange}
      />
      <TextArea
        label="Newsletter Topics"
        placeholder="Add newsletter topic separated by a comma. E.g. books,dune,sci-fi"
        onChange={handleTextAreaChange}
      />
      <LargeButton onClick={handleClick}>Send Newsletter</LargeButton>
    </div>
  );
}

Newsletter.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};
