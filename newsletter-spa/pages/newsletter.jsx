import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import MainAppLayout from "../layouts/MainAppLayout";
import LargeButton from "../components/Buttons/LargeButton";
import TextField from "../components/Forms/TextField";
import TextArea from "../components/Forms/TextArea";
import FileUpload from "../components/Forms/FileUpload";
import RecipientsService from "../fetchers/RecipientsService";

export default function Newsletter() {
  const [recipientsListInit, setRecipientsListInit] = useState(false);
  const router = useRouter();
  const cookies = new Cookies();

  useEffect(() => {
    const mail = cookies.get("user_mail");
    if (!mail) {
      router.push("/"); // Redirect to login page if no session token
    } else {
      RecipientsService.getRecipientsList(mail)
        .then((res) => {
          console.log(res);
          setRecipientsListInit(Object.keys(res).length > 0);
        })
        .catch((e) => console.error(e));
    }
  }, []);

  const handleRedirect = () => {
    router.push("/recipients");
  };

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
        <title>Newsletter</title>
      </Head>
      <div className="newsletter-container">
        <h1 className="subtitle">Publish Something</h1>
        {recipientsListInit ? (
          <>
            <TextField
              label="Subject"
              type="text"
              placeholder="Add the subject of the newsletter"
              onChange={handleTextfieldChange}
            />

            <TextField
              label="Title"
              type="text"
              placeholder="Add the title to the newsletter"
              onChange={handleTextfieldChange}
            />

            <TextArea
              label="Newsletter Topics"
              placeholder="Add newsletter topic separated by a comma. E.g. books,dune,sci-fi"
              onChange={handleTextAreaChange}
            />

            <TextArea
              label="Information"
              placeholder="Add any info that you wish to include in the newsletter"
              onChange={handleTextAreaChange}
            />
            <FileUpload onFileUploaded={handleFileUpload} />

            <LargeButton onClick={handleClick}>Send Newsletter</LargeButton>
          </>
        ) : (
          <>
            <h2>
              To send a newsletter, you first have to create a recipients list.
            </h2>
            <LargeButton onClick={handleRedirect}>
              Create a recipients list
            </LargeButton>
          </>
        )}
      </div>
    </>
  );
}

Newsletter.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};
