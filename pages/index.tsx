import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import dbConnect from "../lib/database/dbConnect";
import Invoice from "../models/invoiceSchema";
const Home = ({ invoice }: any) => {
  console.log(invoice, "invoice");
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
