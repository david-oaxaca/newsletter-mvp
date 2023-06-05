import { useRef } from "react";
import LargeButton from "../components/Buttons/LargeButton";
import TextField from "../components/Forms/TextField";
import UserService from "../fetchers/UserService";
import { useRouter } from "next/router";
import Link from "next/link";
import Cookies from "universal-cookie";
import Head from "next/head";

export default function LogIn() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const router = useRouter();
  const cookies = new Cookies();

  const handleClick = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    if (username !== "" && password !== "") {
      const data = {
        email: username,
        password: password,
      };
      UserService.logIn(data)
        .then((res) => {
          console.log(res);
          alert(res.message);
          cookies.set("user_mail", res.user_mail);
          router.push("/newsletter");
        })
        .catch((e) => console.error(e));
    } else {
      alert("The password doesn't match");
    }
  };

  return (
    <>
      <Head>
        <title>Log In</title>
      </Head>
      <main className="main-wrapper">
        <h1 className="title">Newsletter</h1>
        <TextField
          label="E-mail"
          type="text"
          placeholder="user@example.com"
          myRef={usernameRef}
        />
        <TextField
          label="Password"
          type="password"
          placeholder="Introduce your password"
          myRef={passwordRef}
        />
        <LargeButton type={"button"} onClick={handleClick}>
          Log In
        </LargeButton>

        <div className="sign-up-section">
          <h2>You don&apos;t have an account?</h2>
          <Link href="/sign-up" className="sign-up-link text--big">
            Sign up
          </Link>
        </div>
      </main>
    </>
  );
}
