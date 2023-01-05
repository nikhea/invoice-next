export interface InvoiceProps {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
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
  items: Item[];
  total: number;
}

export type Item = {
  name: string;
  quantity: number;
  price: number;
  total: number;
};

export type ItemStatus = "draft" | "pending" | "paid";
