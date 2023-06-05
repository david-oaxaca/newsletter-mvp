import Head from "next/head";
import MainAppLayout from "../layouts/MainAppLayout";
import LargeButton from "../components/Buttons/LargeButton";
import TextField from "../components/Forms/TextField";
import TextArea from "../components/Forms/TextArea";

export default function Recipients() {
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
    <>
      <Head>
        <title>Newsletter - Recipients</title>
      </Head>
      <div className="newsletter-container">
        <h1 className="subtitle">Create a recipients list</h1>
        <TextArea
          label="Recipients List"
          placeholder="Add e-mails separated by a comma. E.g. a@mail.com,b@mail.com"
          onChange={handleTextAreaChange}
        />
      </div>
    </>
  );
}

Recipients.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};
