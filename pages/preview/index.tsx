import { useRef, useState, useEffect } from "react";
import { InvoiceProps } from "../../types";
import { InvoiceData } from "../../data/invoiceData";
import SenderDetails from "./components/SenderDetails";
import ClientDetails from "./components/ClientDetails";
import ItemsTable from "./components/ItemsTable";
import ItemsHeader from "./components/ItemsHeader";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
const style = {
  container: `w-[80%]  m-auto my-20 bg-white shadow-sm p-10 flex flex-col rounded-[20px]`,
};

const invoiceSingle = () => {
  // let invoiceSingle = InvoiceData[0];
  const [invoiceSingle, setInvoiceSingle] = useState<any>();
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      let invoiceData = JSON.parse(localStorage.getItem("storageInvoiceData"));
      setInvoiceSingle(invoiceData);
    }
  }, []);

  if (!invoiceSingle) return;

  console.log(invoiceSingle.status);

  return (
    <div>
      {invoiceSingle === null ? (
        <div>no data</div>
      ) : (
        <>
          <ItemsHeader handlePrint={handlePrint} />

          <div className={style.container} ref={componentRef}>
            <SenderDetails invoiceSingle={invoiceSingle} />

            <ClientDetails invoiceSingle={invoiceSingle} />

            <ItemsTable invoiceItems={invoiceSingle?.items} />
          </div>
        </>
      )}
    </div>
  );
};

export default invoiceSingle;
