import { FC, useState, useEffect } from "react";
import "rc-dropdown/assets/index.css";
import { InvoiceProps } from "../../types";
import InvoiceListItem from "../../components/invoices/components/InvoiceListItem";
import InvoiceListHeader from "../../components/invoices/components/invoiceListHeader";
import { getInvoices } from "../../helper/invoicedata";
import useLocalStorage from "../../hooks/useLocalStorage";

const style = {
  container: `w-[90%] md:w-[80%] m-auto  mt-32`,
};
const Invoice: FC<InvoiceProps> = () => {
  const [invoiceList] = useLocalStorage();
  const [invoiceData, setInvoiceDataState] = useState([]);

  useEffect(() => {
    setInvoiceDataState(invoiceList);
  }, [invoiceList]);
  // console.log(invoiceData, "incoice data");

  const filterStatus = (status: string) => {
    console.log(status);
    if ("all" === status) {
      setInvoiceDataState(invoiceList);
    } else if (!status) {
      setInvoiceDataState(invoiceList);
    } else {
      const result = invoiceList.filter((curData: { status: string }) => {
        return curData.status === status;
      });
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
