import MainAppLayout from "../../layouts/MainAppLayout";

export default function Unsubscribe() {
  return (
    <div>
      <p>Unsubscribe from topic ID</p>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};
