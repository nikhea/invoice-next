import * as yup from "yup";
const options = ["draft", "pending", "paid"];
export const invoiceSchema = yup.object().shape({
  invoiceId: yup.string().required("ID is required"),
  createdAt: yup
    .date()
    .default(() => new Date())
    .required("Created at date is required"),
  paymentDue: yup.date().required("Payment due date is required"),
  description: yup.string().required("Description is required"),
  // paymentTerms: yup.number().required("Payment terms are required"),
  senderName: yup.string().required("sender name is required"),
  senderEmail: yup
    .string()
    .email("Invalid email")
    .required("sender email is required"),
  clientName: yup.string().required("Client name is required"),
  clientEmail: yup
    .string()
    .email("Invalid email")
    .required("Client email is required"),
  status: yup
    .string()
    .oneOf(options)
    .required("Status is required")
    .default(options[0]),
  senderAddress: yup
    .object()
    .shape({
      street: yup.string().required("Street is required"),
      city: yup.string().required("City is required"),
      postCode: yup.string().required("Post code is required"),
      country: yup.string().required("Country is required"),
    })
    .required("Sender address is required"),
  clientAddress: yup
    .object()
    .shape({
      street: yup.string().required("Street is required"),
      city: yup.string().required("City is required"),
      postCode: yup.string().required("Post code is required"),
      country: yup.string().required("Country is required"),
    })
    .required("Client address is required"),
  items: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required(),
        name: yup.string().required("Item name is required"),
        quantity: yup.number().required("Item quantity is required"),
        price: yup.number().required("Item price is required"),
        total: yup.number().required("Item total is required"),
      })
    )
    .required("At least one item is required"),
  allTotal: yup.number().required("Total is required"),
});
// .required("Item total is required")
