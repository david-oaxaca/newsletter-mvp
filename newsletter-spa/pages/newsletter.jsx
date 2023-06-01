import MainAppLayout from "../layouts/MainAppLayout";

export default function Newsletter() {
  return (
    <div>
      <p>Newsletter page</p>
    </div>
  );
}

Newsletter.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};
