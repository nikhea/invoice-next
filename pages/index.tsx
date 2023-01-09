import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import BgImage from "../public/images/bg.jpg";
import dbConnect from "../lib/database/dbConnect";
import Invoice from "../models/invoiceSchema";

const style = {
  container: `w-[90%] md:w-[80%] m-auto my-5 flex items-center justify-between`,
  textContainer: ``,
  title: ``,
  subtitle: ``,
  button: ``,
  imgContainer: ` w-[50%] rounded-[25px]`,
  img: `w-full rounded-[25px] object-cover`,
};
const content = {
  title: `Effortlessly Send Invoices and Get Paid Quickly with Our Online Platform`,
  subtitle: `Simplify Your Billing Process with Professional and Easy-to-Use Invoicing Software`,
  callToAction: `Sign Up and Start Invoicing Today!`,
  invoice: `view Invocies`,
  image: `https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlJTIwaW4lMjBtZWV0aW5ncyUyMHdpdGglMjBsYXB0b3BzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60`,
};
const Home = () => {
  const user = false;
  return (
    <div className="h-screen overflow-hidden flex items-center justify-between">
      <Head>
        <title>Invoice App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.container}>
        <div className={style.textContainer}>
          <h1 className={style.title}>{content.title}</h1>
          <h2 className={style.subtitle}>{content.subtitle}</h2>
          {user ? (
            <Link href="/invoice">{content.invoice}</Link>
          ) : (
            <Link href="/">{content.callToAction}</Link>
          )}
        </div>
        <div className={style.imgContainer}>
          <Image
            width={2400}
            height={1800}
            alt={content.title}
            src={BgImage}
            className={style.img}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
// export async function getServerSideProps() {
// console.log(currencyToSymbolMap)
// let object = currencyToSymbolMap
// for (const currencyCode in object) {
//   if (object.hasOwnProperty(currencyCode)) {
//     const currencySymbol = object[currencyCode];
//     console.log(`${currencyCode}: ${currencySymbol}`);
//   }
// }
// await dbConnect();
/* find all the data in our database */
// const result = await Invoice.find({});
// const invoice = result.map((doc) => {
//   const invoice = doc.toObject();
//   invoice._id = invoice._id.toString();
//   return invoice;
// });

// return { props: { invoice } };
// }
