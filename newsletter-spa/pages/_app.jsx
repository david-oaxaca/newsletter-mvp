import "../styles/main.scss";

function MyApp({ Component, pageProps }) {
  // Implementation of a Per-page layout
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
