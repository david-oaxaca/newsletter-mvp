import LargeButton from "../components/Buttons/LargeButton";
import TextField from "../components/Forms/TextField";

export default function LogIn() {
  const handleClick = () => {
    console.log("Hola mundo desde el boton");
  };

  const handleTextfieldChange = () => {
    console.log("Hola mundo desde text input");
  };

  return (
    <main className="main-wrapper">
      <h1 className="title">Newsletter</h1>
      <TextField
        label="E-mail"
        type="text"
        placeholder="user@example.com"
        onChange={handleTextfieldChange}
      />
      <TextField
        label="Password"
        type="password"
        placeholder="Introduce your password"
        onChange={handleTextfieldChange}
      />
      <LargeButton onClick={handleClick}>Log In</LargeButton>

      <div className="sign-up-section">
        <h2>You don't have an account?</h2>
        <a href="/sign-up" className="sign-up-link text--big">
          Sign up
        </a>
      </div>
    </main>
  );
}
