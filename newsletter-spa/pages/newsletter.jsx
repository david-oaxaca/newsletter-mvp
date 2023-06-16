import { useRef, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import MainAppLayout from "../layouts/MainAppLayout";
import LargeButton from "../components/Buttons/LargeButton";
import TextField from "../components/Forms/TextField";
import TextArea from "../components/Forms/TextArea";
import FileUpload from "../components/Forms/FileUpload";
import RecipientsService from "../fetchers/RecipientsService";
import NewsletterService from "../fetchers/NewsletterService";

export default function Newsletter() {
  const subjectRef = useRef(null);
  const titleRef = useRef(null);
  const topicsRef = useRef(null);
  const bodyRef = useRef(null);
  const uploadedFileRef = useRef(null);

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

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();
    const mail = cookies.get("user_mail");
    const data = new FormData();
    data.append("file", uploadedFileRef.current.files[0]);
    data.append("subject", subjectRef.current.value);
    data.append("title", titleRef.current.value);
    data.append("body", bodyRef.current.value);
    data.append("topics", topicsRef.current.value);
    NewsletterService.publishNewsletter(mail, data)
      .then((res) => {
        console.log(res);
        alert(res.message);
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      <Head>
        <title>Newsletter</title>
      </Head>
      <div className="newsletter-container">
        <h1 className="subtitle">Publish Something</h1>
        {recipientsListInit ? (
          <form
            className="newsletter-container"
            onSubmit={handleNewsletterSubmit}
          >
            <TextField
              label="Subject"
              type="text"
              placeholder="Add the subject of the newsletter"
              myRef={subjectRef}
            />

            <TextField
              label="Title"
              type="text"
              placeholder="Add the title to the newsletter"
              myRef={titleRef}
            />

            <TextArea
              label="Newsletter Topics"
              placeholder="Add newsletter topic separated by a comma. E.g. books,dune,sci-fi"
              myRef={topicsRef}
            />

            <TextArea
              label="Information"
              placeholder="Add any info that you wish to include in the newsletter"
              myRef={bodyRef}
            />
            <FileUpload myRef={uploadedFileRef} />

            <LargeButton type={"submit"}>Send Newsletter</LargeButton>
          </form>
        ) : (
          <>
            <h2>
              To send a newsletter, you first have to create a recipients list.
            </h2>
            <LargeButton type={"button"} onClick={handleRedirect}>
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
