import { InvoiceProps } from "../types";

export const getInvoices = () => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("invoices");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  }
};
export const saveInvoices = (data: InvoiceProps) => {
  if (data) {
    localStorage.setItem("invoices", JSON.stringify(data) as any);
  }
};
export const getSingleInvoices = (invoiceID: any, invoiceList: any) => {
  const findInvoices = invoiceList.find((element: any, index: number) => {
    return element.invoiceId === invoiceID;
  });
  return findInvoices;
};
export const updateInvoices = (data: InvoiceProps) => {
  getInvoices();
};

export const deleteInvoices = (
  invoiceID: string,
  invoiceList: any,
  setInvoiceList: any
) => {
  const filterinvoices = invoiceList.filter((element: any, index: number) => {
    return element.invoiceId !== invoiceID;
  });
  setInvoiceList(filterinvoices);
  getInvoices();
};
