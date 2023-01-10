import { FC, useState } from "react";

import "rc-dropdown/assets/index.css";
import { InvoiceProps } from "../../types";
import InvoiceListItem from "../../components/invoices/components/InvoiceListItem";
import { InvoiceData } from "../../data/invoiceData";
import InvoiceListHeader from "../../components/invoices/components/invoiceListHeader";


const style = {
  container: `w-[90%] md:w-[80%] m-auto  mt-32`,
};
const Invoice: FC<InvoiceProps> = () => {
  let invoiceData = InvoiceData;
  const [invoiceDataState, setInvoiceDataState] = useState(invoiceData);
  const filterStatus = (status: string) => {
    const result = invoiceData.filter((curData: { status: string }) => {
      return curData.status === status;
    });
    if (!status) {
      setInvoiceDataState(invoiceData);
    } else {
      setInvoiceDataState(result);
    }
    // console.log(status);
  };
  const invoiceDataDisplay = invoiceDataState.map((invoice) => (
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
      {invoiceDataDisplay}
    </div>
  );
};

export default Invoice;
export async function getServerSideProps() {
  let invoiceData = InvoiceData;
  return { props: { invoiceData } };
}
