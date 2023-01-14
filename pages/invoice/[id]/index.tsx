import { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { InvoiceData } from "../../../data/invoiceData";
import SenderDetails from "../../../components/singleInvoice/components/SenderDetails";
import ClientDetails from "../../../components/singleInvoice/components/ClientDetails";
import ItemsTable from "../../../components/singleInvoice/components/ItemsTable";
import ItemsHeader from "../../../components/singleInvoice/components/ItemsHeader";

import { useReactToPrint } from "react-to-print";
import { invoiceSchema } from "../../../lib/invoiceFormSchema";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { getSingleInvoices } from "../../../helper/invoicedata";
const style = {
  container: `w-[80%]  m-auto my-16 bg-white shadow-sm p-10 flex flex-col rounded-[20px]`,
  spacingTop: `mt-32`,
};

const invoiceSingle = () => {
  const router = useRouter();
  const { id: invoiceID } = router.query;
  const [invoiceList] = useLocalStorage();

  // let invoice = invoiceList
  useEffect(() => {
    let p = getSingleInvoices(invoiceID, invoiceList);
    console.log(p, "single");
  }, []);
  const invoiceSingle = InvoiceData[0];
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className={style.spacingTop}>
      <ItemsHeader handlePrint={handlePrint} invoiceID={invoiceID} />

      <div className={style.container} ref={componentRef}>
        <SenderDetails invoiceSingle={invoiceSingle} />

        <ClientDetails invoiceSingle={invoiceSingle} />

        <ItemsTable invoiceItems={invoiceSingle.items} />
      </div>
    </div>
  );
};

export default invoiceSingle;
