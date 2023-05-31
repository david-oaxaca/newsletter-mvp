import { Header } from "../components/Header/Header";

export default function MainAppLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
