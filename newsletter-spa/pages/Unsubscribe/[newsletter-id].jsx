import React, { useState } from "react";
import LargeButton from "../../components/Buttons/LargeButton";
import TextArea from "../../components/Forms/TextArea";

export default function Unsubscribe() {
  const [selectTopic, setSelectTopic] = useState(false);

  const handleClick = () => {
    console.log("Hola mundo desde el boton");
  };

  const changeSelectTopic = () => {
    setSelectTopic(!selectTopic);
  };

  const handleTextAreaChange = () => {
    console.log("Hola mundo desde text area");
  };

  return (
    <main className="main-wrapper">
      <h1 className="title">Newsletter</h1>
      <p className="text--big">
        The newsletter comes from the following topics:
      </p>
      <ul className="text--big">
        <li>Books</li>
        <li>Dune</li>
        <li>Sci-fi</li>
      </ul>
      {selectTopic === true ? (
        <>
          <TextArea
            label="What topics do you want to unsubscribe from?"
            placeholder="Add newsletter topic separated by a comma. E.g. books,dune,sci-fi"
            onChange={handleTextAreaChange}
          />
          <LargeButton onClick={handleClick}>Unsubscribe</LargeButton>
          <LargeButton onClick={changeSelectTopic}>Go Back</LargeButton>
        </>
      ) : (
        <>
          <p className="text--big">
            Do you wish to unsubscribe from a particular topic or from all of
            our newsletters:
          </p>
          <LargeButton onClick={changeSelectTopic}>
            Unsubscribe from certain topics
          </LargeButton>
          <LargeButton onClick={handleClick}>Unsubscribe from All</LargeButton>
        </>
      )}
    </main>
  );
}
