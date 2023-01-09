import "../styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
function MyApp({ Component, pageProps }: AppProps) {
  const Layout = Component.Layout || EmptyLayout;
  return (
    <>
      {/* <nav>
        <Link href="/">Home</Link>
        <Link href="/invoice">invoice</Link>
      </nav> */}
      {/* <Layout> */}
      <Component {...pageProps} />
      {/* </Layout> */}
    </>
  );
}

const EmptyLayout = ({ children }: any) => <>{children}</>;
export default MyApp;
