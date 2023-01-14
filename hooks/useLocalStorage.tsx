import { useEffect, useState } from "react";
import {
  getInvoices,
  saveInvoices,
  deleteInvoices,
} from "../helper/invoicedata";

export default function useLocalStorage() {
  const [value, setValue] = useState(getInvoices());

  useEffect(() => {
    saveInvoices(value);
  }, [value]);
  const deleteInvoices = (invoiceID: string) => {
    const filterinvoices = value.filter((element: any, index: number) => {
      console.log(element.invoiceId, invoiceID);

      return element.invoiceId !== invoiceID;
    });
    setValue(filterinvoices);
    // getInvoices();
  };

  return [value, setValue];
}
