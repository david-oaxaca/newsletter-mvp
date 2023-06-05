import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Cookies from "universal-cookie";
import MainAppLayout from "../layouts/MainAppLayout";
import LargeButton from "../components/Buttons/LargeButton";
import TextField from "../components/Forms/TextField";
import TextArea from "../components/Forms/TextArea";
import RecipientsService from "../fetchers/RecipientsService";

export default function Recipients() {
  const [recipientsListInit, setRecipientsListInit] = useState(false);
  const recipientsListRef = useRef(null);
  const newRecipientsRef = useRef(null);
  const cookies = new Cookies();
  const router = useRouter();

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

  const handleCreateList = () => {
    const mail = cookies.get("user_mail");
    const recipientsList = recipientsListRef.current.value;

    if (recipientsList !== "") {
      const data = {
        recipients_list: recipientsList.split(","),
      };
      RecipientsService.createRecipientsList(mail, data)
        .then((res) => {
          console.log(res);
          alert(res.message);
          router.push("/newsletter");
        })
        .catch((e) => console.error(e));
    } else {
      alert("You can't create an empty list");
    }
  };

  const handleAddRecipient = () => {
    const mail = cookies.get("user_mail");
    const newRecipient = newRecipientsRef.current.value;

    if (newRecipient !== "") {
      RecipientsService.addNewRecipient(mail, newRecipient)
        .then((res) => {
          console.log(res);
          alert(res.message);
          router.push("/newsletter");
        })
        .catch((e) => console.error(e));
    } else {
      alert("You can't add an inexistent recipient");
    }
  };

  return (
    <>
      <Head>
        <title>Newsletter - Recipients</title>
      </Head>
      <div className="newsletter-container">
        {recipientsListInit ? (
          <>
            <h1 className="subtitle">Add a recipients to the list</h1>
            <TextField
              label="New recipient"
              type="text"
              placeholder="Add one e-mail for a new recipient"
              myRef={newRecipientsRef}
            />
            <LargeButton type={"button"} onClick={handleAddRecipient}>
              Add a recipients
            </LargeButton>
          </>
        ) : (
          <>
            <h1 className="subtitle">Create a recipients list</h1>
            <TextArea
              label="Recipients List"
              placeholder="Add e-mails separated by a comma. E.g. a@mail.com,b@mail.com"
              myRef={recipientsListRef}
            />
            <LargeButton type={"button"} onClick={handleCreateList}>
              Create a recipients list
            </LargeButton>
          </>
        )}
      </div>
    </>
  );
}

Recipients.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};
