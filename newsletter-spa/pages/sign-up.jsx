import MainAppLayout from "../layouts/MainAppLayout";

export default function SignUp() {
  return (
    <div>
      <p>Sign up page</p>
    </div>
  );
}

SignUp.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};
