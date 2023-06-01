import Header from "../components/Header/Header";

const MainAppLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default MainAppLayout;
