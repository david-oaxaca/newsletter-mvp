import MainAppLayout from "../layouts/MainAppLayout";

export default function Home() {
  return (
    <div>
      <p>Home page</p>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};
