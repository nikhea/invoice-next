import "../styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import NavBar from "../components/NavBar";
function MyApp({ Component, pageProps }: AppProps) {
  const Layout = Component.Layout || EmptyLayout;
  return (
    <div className=" relative">
      <NavBar />
      {/* <Layout> */}
      <Component {...pageProps} />
      {/* </Layout> */}
    </div>
  );
}

const EmptyLayout = ({ children }: any) => <>{children}</>;
export default MyApp;
