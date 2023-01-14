import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "../components/NavBar";
import { GlobalProvider } from "../context/globalState";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <div className=" relative">
        <NavBar />
        {/* <Layout> */}
        <Component {...pageProps} />
        {/* </Layout> */}
      </div>
    </GlobalProvider>
  );
}

export default MyApp;
