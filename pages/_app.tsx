import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "../components/NavBar";
function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <div className=" relative">
      <NavBar />
      {/* <Layout> */}
      <Component {...pageProps} />
      {/* </Layout> */}
    </div>
  );
}

export default MyApp;
