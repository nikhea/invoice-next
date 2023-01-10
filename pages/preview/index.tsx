import { useRef, useState, useEffect } from "react";
import { InvoiceProps } from "../../types";
import { InvoiceData } from "../../data/invoiceData";
import SenderDetails from "../../components/preview/components/SenderDetails";
import ClientDetails from "../../components/preview/components/ClientDetails";
import ItemsTable from "../../components/preview/components/ItemsTable";
import ItemsHeader from "../../components/preview/components/ItemsHeader";
import { useReactToPrint } from "react-to-print";
const style = {
  container: `w-[90%] md:w-[80%]  m-auto bg-white shadow-sm p-10 flex flex-col rounded-[20px] my-16`,
  spacingTop: `mt-32`,
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
      let invoiceData: any = JSON.parse(
        localStorage.getItem("storageInvoiceData") as any
      );
      setInvoiceSingle(invoiceData);
    }
  }, []);

  if (!invoiceSingle) return;



  return (
    <div className={style.spacingTop}>
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
