import React, { useRef } from "react";
import { InvoiceProps } from "../../../types";
import { InvoiceData } from "../../../data/invoiceData";
import SenderDetails from "./components/SenderDetails";
import ClientDetails from "./components/ClientDetails";
import ItemsTable from "./components/ItemsTable";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
const style = {
  container: `w-[80%]  m-auto my-20 bg-white shadow-sm p-10 flex flex-col rounded-[20px]`,
};

const invoiceSingle = () => {
  const invoiceSingle = InvoiceData[0];
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <button onClick={handlePrint}>Print this out!</button>{" "}
      <div className={style.container} ref={componentRef}>
        <SenderDetails invoiceSingle={invoiceSingle} />

        <ClientDetails invoiceSingle={invoiceSingle} />

        <ItemsTable invoiceItems={invoiceSingle.items} />
      </div>
    </div>
  );
};

export default invoiceSingle;
