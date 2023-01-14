import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../components/editComponets/components/Header";
import FormInputs from "../../components/editComponets/components/workingForm";
import useLocalStorage from "../../hooks/useLocalStorage";
import { getSingleInvoices } from "../../helper/invoicedata";
const style = {
  container: `w-[90%] md:w-[80%]  m-auto bg-white shadow-sm p-10 flex flex-col rounded-[20px] my-16`,
  spacingTop: `mt-32`,
};
const CreateInvoice = () => {
  const [invoiceSingle, setInvoiceSingle] = useState();
  const router = useRouter();
  const { id: invoiceID } = router.query;
  const [invoiceList] = useLocalStorage();

  // let invoice = invoiceList
  useEffect(() => {
    let InvoiceData = getSingleInvoices(invoiceID, invoiceList);
    setInvoiceSingle(InvoiceData);
  }, []);
  if (!invoiceSingle) return;
  console.log(invoiceSingle);

  return (
    <div className={style.spacingTop}>
      Edit
      <Header />
      <FormInputs />
    </div>
  );
};

export default CreateInvoice;
