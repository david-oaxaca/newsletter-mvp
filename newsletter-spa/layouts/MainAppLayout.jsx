import NavBar from "../components/NavBar/NavBar";

const MainAppLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="main-wrapper">{children}</main>
    </>
  );
};

export default MainAppLayout;
