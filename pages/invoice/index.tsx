import { FC, useState } from "react";

import "rc-dropdown/assets/index.css";
import { InvoiceProps } from "../../types";
import InvoiceListItem from "./components/InvoiceListItem";
import { InvoiceData } from "../../data/invoiceData";
import InvoiceListHeader from "./components/invoiceListHeader";
import Link from "next/link";

const style = {
  container: `w-[90%] md:w-[80%] m-auto my-5`,
};
const Invoice: FC<InvoiceProps> = (invoice) => {
  const [invoiceDataState, setInvoiceDataState] = useState(InvoiceData);
  const filterStatus = (status: string) => {
    const result = InvoiceData.filter((curData) => {
      return curData.status === status;
    });
    if (!status) {
      setInvoiceDataState(InvoiceData);
    } else {
      setInvoiceDataState(result);
    }
    // console.log(status);
  };
  const invoiceData = invoiceDataState.map((invoice) => (
    <div key={invoice.id}>
      <InvoiceListItem
        id={invoice.id}
        clientName={invoice.clientName}
        status={invoice.status}
      />
    </div>
  ));
  return (
    <div className={style.container}>
      <InvoiceListHeader
        invoiceData={invoiceData}
        filterStatus={filterStatus}
        setInvoiceDataState={setInvoiceDataState}
      />
      {invoiceData}
    </div>
  );
};

export default Invoice;
