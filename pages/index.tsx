import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import currencyToSymbolMap from 'currency-symbol-map/map'
import dbConnect from "../lib/database/dbConnect";
import Invoice from "../models/invoiceSchema";
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main></main>
    </div>
  );
};

export default Home;
export async function getServerSideProps() {
  console.log(currencyToSymbolMap)
  let object = currencyToSymbolMap
  for (const currencyCode in object) {
    if (object.hasOwnProperty(currencyCode)) {
      const currencySymbol = object[currencyCode];
      console.log(`${currencyCode}: ${currencySymbol}`);
    }
  }
  await dbConnect();
  /* find all the data in our database */
  const result = await Invoice.find({});
  const invoice = result.map((doc) => {
    const invoice = doc.toObject();
    invoice._id = invoice._id.toString();
    return invoice;
  });

  return { props: { invoice } };
}
