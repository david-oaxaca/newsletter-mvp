import React, { useState, useRef } from "react";
import LargeButton from "../components/Buttons/LargeButton";
import TextField from "../components/Forms/TextField";
import UserService from "../fetchers/UserService";
import { useRouter } from "next/router";
import Head from "next/head";

export default function SignUp() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const router = useRouter();

  const handleClick = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = confirmPasswordRef.current.value;
    if (
      password === passwordConfirm &&
      username !== "" &&
      password !== "" &&
      passwordConfirm !== ""
    ) {
      const data = {
        email: username,
        password: password,
      };
      UserService.registerUser(data)
        .then((res) => {
          alert(res.message);
          router.push("/");
        })
        .catch((e) => console.error(e));
    } else {
      alert("The passwords and it's confirmation doesn't match");
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
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
        <TextField
          label="Confirm password"
          type="password"
          placeholder="Confirm your password"
          myRef={confirmPasswordRef}
        />
        <LargeButton type={"button"} onClick={handleClick}>
          Sign Up
        </LargeButton>
      </main>
    </>
  );
}
