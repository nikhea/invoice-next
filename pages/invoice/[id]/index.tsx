import React, { useRef } from "react";
import { InvoiceData } from "../../../data/invoiceData";
import SenderDetails from "../../../components/singleInvoice/components/SenderDetails";
import ClientDetails from "../../../components/singleInvoice/components/ClientDetails";
import ItemsTable from "../../../components/singleInvoice/components/ItemsTable";
import ItemsHeader from "../../../components/singleInvoice/components/ItemsHeader";

import { useReactToPrint } from "react-to-print";
const style = {
  container: `w-[80%]  m-auto my-16 bg-white shadow-sm p-10 flex flex-col rounded-[20px]`,
  spacingTop: `mt-32`,
};

const invoiceSingle = () => {
  const invoiceSingle = InvoiceData[0];
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className={style.spacingTop}>
      <ItemsHeader handlePrint={handlePrint} />

      <div className={style.container} ref={componentRef}>
        <SenderDetails invoiceSingle={invoiceSingle} />

        <ClientDetails invoiceSingle={invoiceSingle} />

        <ItemsTable invoiceItems={invoiceSingle.items} />
      </div>
    </div>
  );
};

export default invoiceSingle;
