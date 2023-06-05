import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import LargeButton from "../../../../components/Buttons/LargeButton";
import TextArea from "../../../../components/Forms/TextArea";
import RecipientsService from "../../../../fetchers/RecipientsService";
import NewsletterService from "../../../../fetchers/NewsletterService";

export default function Unsubscribe() {
  const topicsRef = useRef(null);
  const router = useRouter();
  const [pathSender, setPathSender] = useState("");
  const [pathRecipient, setPathRecipient] = useState("");
  const [newsletterTopics, setNewsletterTopics] = useState([]);
  const [selectTopicOpt, setselectTopicOpt] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const { sender, recipient, newsletter } = router.query;
      setPathSender(sender);
      setPathRecipient(recipient);
      NewsletterService.retrieveTopics(sender, newsletter)
        .then((res) => {
          console.log(res);
          setNewsletterTopics(res.topics);
        })
        .catch((e) => console.error(e));
    }
  }, [router.isReady]);

  const handleUnsubscribe = () => {
    let topicsSelected = "";

    if (selectTopicOpt) {
      topicsSelected = topicsRef.current.value;
    } else {
      topicsSelected = "all";
    }

    if (selectTopicOpt && topicsSelected === "") {
      alert("Write the topics you want to unsubscribe from");
    } else {
      RecipientsService.updateRecipientUnsubs(pathSender, pathRecipient, {
        topics: topicsSelected,
      })
        .then((res) => {
          alert(res.message);
          router.push("/unsubscribe/result");
        })
        .catch((e) => console.error(e));
    }
  };

  const changeselectTopicOpt = () => {
    setselectTopicOpt(!selectTopicOpt);
  };

  return (
    <main className="main-wrapper">
      <h1 className="title">Newsletter</h1>
      <p className="text--big">
        The newsletter comes from the following topics:
      </p>
      <ul className="text--big">
        {newsletterTopics.map((topic) => (
          <li key={topic}> {topic} </li>
        ))}
      </ul>
      {selectTopicOpt === true ? (
        <>
          <TextArea
            label="What topics do you want to unsubscribe from?"
            placeholder="Add newsletter topic separated by a comma. E.g. books,dune,sci-fi"
            myRef={topicsRef}
          />
          <LargeButton type={"button"} onClick={handleUnsubscribe}>
            Unsubscribe
          </LargeButton>
          <LargeButton type={"button"} onClick={changeselectTopicOpt}>
            Go Back
          </LargeButton>
        </>
      ) : (
        <>
          <p className="text--big">
            Do you wish to unsubscribe from a particular topic or from all of
            our newsletters:
          </p>
          <LargeButton type={"button"} onClick={changeselectTopicOpt}>
            Unsubscribe from certain topics
          </LargeButton>
          <LargeButton type={"button"} onClick={handleUnsubscribe}>
            Unsubscribe from All
          </LargeButton>
        </>
      )}
    </main>
  );
}
