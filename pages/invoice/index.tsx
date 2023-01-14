import { FC, useState, useEffect } from "react";
import "rc-dropdown/assets/index.css";
import { InvoiceProps } from "../../types";
import InvoiceListItem from "../../components/invoices/components/InvoiceListItem";
import InvoiceListHeader from "../../components/invoices/components/invoiceListHeader";
import { getInvoices } from "../../helper/invoicedata";

const style = {
  container: `w-[90%] md:w-[80%] m-auto  mt-32`,
};
const Invoice: FC<InvoiceProps> = () => {
  const [invoiceData, setInvoiceDataState] = useState([]);

  useEffect(() => {
    let InvoiceData = getInvoices();
    setInvoiceDataState(InvoiceData);
  }, []);

  const filterStatus = (status: string) => {
    const result = invoiceData.filter((curData: { status: string }) => {
      return curData.status === status;
    });
    if (!status) {
      setInvoiceDataState(invoiceData);
    } else {
      setInvoiceDataState(result);
    }
  };
  const invoiceDataDisplay = invoiceData.map((invoice: any, index: number) => (
    <div key={index}>
      <InvoiceListItem
        id={invoice.id}
        clientName={invoice.clientName}
        status={invoice.status}
        invoiceId={invoice.invoiceId}
        paymentDue={invoice.paymentDue}
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
