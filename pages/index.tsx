import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";


const style = {
  bgImage: `overflow-hidden w-full h-screen flex items-center justify-between  bg-cover bg-center bg-no-repeat relative bg-fixed object-content z-50 bg-[url('https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlJTIwaW4lMjBtZWV0aW5ncyUyMHdpdGglMjBsYXB0b3BzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60')]`,
  overlay: `h-full w-full top-0 left-0 absolute bg-black opacity-60 bg-fixed -z-50`,
  mainContainer: `h-screen overflow-hidden flex items-center justify-between text-white`,
  container: `w-[90%] md:w-[80%] m-auto my-5 flex items-center justify-between`,
  textContainer: `p-5  lg:w-[75%] text-center md:text-left`,
  title: `text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] font-[700]   leading-[1.3] text-white`,
  subtitle: `  my-4 text-[1rem] md:text-[1.2rem] lg:text-[1.5rem] font-[400]   leading-[1.8] mb-20 text-white`,
  button: `border uppercase text-white border-2 border-solid border-[#2B2B2B] bg-[#2B2B2B] font-[600] rounded-[10rem] px-10 py-3 my-10`,
  imgContainer: ` w-[50%] rounded-[25px] hidden md:block`,
  img: `w-full rounded-[25px] object-cover`,
};
const content = {
  title: `Effortlessly Send Invoices and Get Paid Quickly with Our Online Platform`,
  subtitle: `Streamline Your Payments and Get Paid Faster with Our Online Invoicing Solution`,
  callToAction: `Sign Up and Start Invoicing Today!`,
  invoice: `view Invocies`,
  image: `https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlJTIwaW4lMjBtZWV0aW5ncyUyMHdpdGglMjBsYXB0b3BzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60`,
};
const Home = () => {
  const user = true;
  return (
    <div className={style.bgImage}>
      <Head>
        <title>Invoice App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.container}>
        <div className={style.textContainer}>
          <h1 className={style.title}>{content.title}</h1>
          <h2 className={style.subtitle}>{content.subtitle}</h2>
          {user ? (
            <Link href="/invoice" className={style.button}>
              {content.invoice}
            </Link>
          ) : (
            <Link href="/" className={style.button}>
              {content.callToAction}
            </Link>
          )}
        </div>
        <div className={style.imgContainer}>
          {/* <Image
            width={2400}
            height={1800}
            alt={content.title}
            src={BgImage}
            className={style.img}
          /> */}
        </div>
      </main>
      <div className={style.overlay}></div>
    </div>
  );
};

export default Home;

