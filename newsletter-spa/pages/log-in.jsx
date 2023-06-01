import MainAppLayout from "../layouts/MainAppLayout";

export default function LogIn() {
  return (
    <div>
      <p>Log In page</p>
    </div>
  );
}

LogIn.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};
