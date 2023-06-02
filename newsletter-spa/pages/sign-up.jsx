import LargeButton from "../components/Buttons/LargeButton";
import TextField from "../components/Forms/TextField";

export default function SignUp() {
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
      <TextField
        label="Confirm password"
        type="password"
        placeholder="Confirm your password"
        onChange={handleTextfieldChange}
      />
      <LargeButton onClick={handleClick}>Sign Up</LargeButton>
    </main>
  );
}
