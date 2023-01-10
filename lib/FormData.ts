export interface FormData {
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
    // id:string;
    name: string;
    quantity: number | string | any;
    price: number | string | any;
    total: number | string | any;
  }[];
  total: number | string | any;
}
