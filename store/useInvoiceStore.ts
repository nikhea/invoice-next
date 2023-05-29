import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { formatToCurrency } from "../lib/formateNumbers";

export interface invoiceFormData {
  invoiceId: string;
  createdAt: Date;
  paymentDue: Date;
  description: string;
  paymentTerms: number;
  senderName: string;
  senderEmail: string;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  allTotal: number;
}

type InvoiceState = {
  invoices: invoiceFormData[];
  // invoiceSingle: invoiceFormData,
  setInvoiceList: (invoice: invoiceFormData) => void;
  removeFromInvoice: (invoiceId: string) => void;
  editInvoice: (invoiceId: string, updatedInvoice: invoiceFormData) => void;
  getInvoice: (invoiceId: any) => any;
  // getInvoice: (invoiceId: string) => invoiceFormData | undefined; // New function

  //   calculateItemTotal: (invoiceId: string) => number;
  //   calculateAllTotal: () => any;
};

export const useInvoiceState = create<InvoiceState>()(
  devtools(
    persist(
      (set, get) => ({
        invoices: [],
        setInvoiceList: (invoice: invoiceFormData) => {
          set((prevState) => ({
            invoices: [...prevState.invoices, invoice],
          }));
        },
        getInvoice: (invoiceId: string) => {
          const invoices = get().invoices;
          return invoices.find(
            (invoice: invoiceFormData) => invoice.invoiceId === invoiceId
          );
        },
        removeFromInvoice: (invoiceId: string) => {
          set((prevState) => ({
            invoices: prevState.invoices.filter(
              (invoice: invoiceFormData) => invoice.invoiceId !== invoiceId
            ),
          }));
        },
        editInvoice: (invoiceId: string, updatedInvoice: invoiceFormData) => {
          set((prevState) => ({
            invoices: prevState.invoices.map((invoice) =>
              invoice.invoiceId === invoiceId ? updatedInvoice : invoice
            ),
          }));
        },
        // calculateAllTotal: () =>
        // set((state) => ({
        //     const allTotal = state.invoices.reduce(
        //         (total: number, invoice: number) => total + invoice.allTotal,
        //         0
        //       )
        //       return allTotal;
        // })),
      }),
      {
        name: "InvoiceState-storage",
      }
    )
  )
);
