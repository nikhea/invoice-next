import { FC } from "react";
import Link from "next/link";
import { InvoiceProps } from "../../types";
import InvoiceListItem from "./components/InvoiceListItem";
import { InvoiceData } from "../../data/invoiceData";
const style = {
  container: `w-[80%] m-auto my-20`,
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
      {invoiceData}
    </div>
  );
};

export default Invoice;
