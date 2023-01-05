import { FC } from "react";
import Link from "next/link";
import { InvoiceProps } from "../../types";
import InvoiceListItem from "./components/InvoiceListItem";
import { InvoiceData } from "../../data/invoiceData";
const style = {
  container: `w-[80%] m-auto my-20`,
  innerContainer: `w-[80%] m-auto my-20 flex justidy`,
};
const Invoice: FC<InvoiceProps> = (invoice) => {
  const invoiceData = InvoiceData.map((invoice) => (
    // <Link href=""  key={invoice.id}>
    <div key={invoice.id}>
      <InvoiceListItem
        id={invoice.id}
        createdAt={""}
        paymentDue={""}
        description={""}
        paymentTerms={0}
        clientName={invoice.clientName}
        clientEmail={""}
        status={invoice.status}
        senderAddress={{
          street: "",
          city: "",
          postCode: "",
          country: "",
        }}
        clientAddress={{
          street: "",
          city: "",
          postCode: "",
          country: "",
        }}
        items={[]}
        total={0}
      />
    </div>
    // </Link>
  ));
  return (
    <div className={style.container}>
      <div className={style.innerContainer}>
        <div>
          <h1> Invoices</h1>
          <p>There are 7 total invoices</p>
        </div>
        <div>
          <h1> Invoices</h1>
          <p>There are 7 total invoices</p>
        </div>

      </div>
      {invoiceData}
    </div>
  );
};

export default Invoice;
