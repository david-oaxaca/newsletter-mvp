import Head from "next/head";

export default function Unsubscribe() {
  return (
    <>
      <Head>
        <title>Newsletter - Unsubscribe</title>
      </Head>
      <main className="main-wrapper">
        <h1 className="title">Newsletter</h1>
        <div className="unsubscribe-message">
          <h2 className="subtitle">
            You&apos;ve been unsubscribed from the selected topics.
          </h2>
        </div>
      </main>
    </>
  );
}
