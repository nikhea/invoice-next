import { useEffect, FC } from "react";
import {
  useForm,
  useFieldArray,
  Controller,
  //   UseFormMethods,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormPersist from "react-hook-form-persist";
// import DatePicker from "rc-calendar";
// import 'rc-calendar/assets/index.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "react-datepicker/dist/react-datepicker.css";
interface FormData {
  id: string;
  createdAt: Date;
  paymentDue: Date;
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
  items: {
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  total: number;
}

const invoiceSchema = yup.object().shape({
  id: yup.string().required("ID is required"),
  createdAt: yup
    .date()
    .default(() => new Date())
    .required("Created at date is required"),
  paymentDue: yup.date().required("Payment due date is required"),
  description: yup.string().required("Description is required"),
  paymentTerms: yup.number().required("Payment terms are required"),
  clientName: yup.string().required("Client name is required"),
  clientEmail: yup
    .string()
    .email("Invalid email")
    .required("Client email is required"),
  status: yup.string().required("Status is required"),
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
        name: yup.string().required("Item name is required"),
        quantity: yup.number().required("Item quantity is required"),
        price: yup.number().required("Item price is required"),
        total: yup.number().required("Item total is required"),
      })
    )
    .required("At least one item is required"),
  total: yup.number().required("Total is required"),
});

const InvoiceForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm<FormData>({
    resolver: yupResolver(invoiceSchema),
  });
  //   useEffect(() => {
  //     // window is accessible here.
  //     useFormPersist("storageInvoice", {
  //       watch,
  //       setValue,
  //       storage: window.localStorage,
  //     });
  //   }, [watch, setValue]);
  console.log(watch());

  if (typeof window !== "undefined") {
    // You now have access to `window`
    useFormPersist("storageInvoice", {
      watch,
      setValue,
      storage: window.localStorage,
    });
  }

  //   validationSchema: invoiceSchema,
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        ID:
        <input {...register("id")} />
        {errors.id && <span>{errors.id.message}</span>}
      </label>
      <br />
      <label>
        Created At:
        {/* <Controller
          as={<DatePicker />}
          control={control}
          name="createdAt"
          defaultValue={new Date()}
          rules={{ required: "Created at date is required" }}
        /> */}
        <Controller
          control={control}
          name="createdAt"
          render={({ field }) => (
            <DatePicker
              placeholderText="Select date"
              onChange={(date) => field.onChange(date)}
              selected={field.value}
            />
          )}
        />
        {errors.createdAt && <span>{errors.createdAt.message}</span>}
      </label>
      <br />
      {/* <label>
        Payment Due:
        <Controller
          as={<DatePicker />}
          control={control}
          name="paymentDue"
          rules={{ required: "Payment due date is required" }}
        />
        {errors.paymentDue && <span>{errors.paymentDue.message}</span>}
      </label> */}
      <Controller
        control={control}
        name="paymentDue"
        render={({ field }) => (
          <DatePicker
            placeholderText="Select date"
            onChange={(date) => field.onChange(date)}
            selected={field.value}
          />
        )}
      />
      <br />
      <label>
        Description:
        <input {...register("description")} />
        {errors.description && <span>{errors.description.message}</span>}
      </label>
      <br />
      <label>
        Payment Terms:
        <input type="number" {...register("paymentTerms")} />
        {errors.paymentTerms && <span>{errors.paymentTerms.message}</span>}
      </label>
      <br />
      <label>
        Client Name:
        <input {...register("clientName")} />
        {errors.clientName && <span>{errors.clientName.message}</span>}
      </label>
      <br />
      <label>
        Client Email:
        <input type="email" {...register("clientEmail")} />
        {errors.clientEmail && <span>{errors.clientEmail.message}</span>}
      </label>
      <br />
      <label>
        Status:
        <input {...register("status")} />
        {errors.status && <span>{errors.status.message}</span>}
      </label>
      <br />
      <fieldset>
        <legend>Sender Address</legend>
        <label>
          Street:export default InvoiceForm
          <input {...register("senderAddress.street")} />
          {errors.senderAddress && errors.senderAddress.street && (
            <span>{errors.senderAddress.street.message}</span>
          )}
        </label>
        <br />
        <label>
          City:
          <input {...register("senderAddress.city")} />
          {errors.senderAddress && errors.senderAddress.city && (
            <span>{errors.senderAddress.city.message}</span>
          )}
        </label>
        <br />
        <label>
          Post Code:
          <input {...register("senderAddress.postCode")} />
          {errors.senderAddress && errors.senderAddress.postCode && (
            <span>{errors.senderAddress.postCode.message}</span>
          )}
        </label>
        <br />
        <label>
          Country:
          <input {...register("senderAddress.country")} />
          {errors.senderAddress && errors.senderAddress.country && (
            <span>{errors.senderAddress.country.message}</span>
          )}
        </label>
      </fieldset>
      <br />
      <fieldset>
        <legend>Client Address</legend>
        <label>
          Street:
          <input {...register("clientAddress.street")} />
          {/* {errors.clientAddress && erroexport default InvoiceFormrs.clientAddress.street && (
            <span>{errors.clientAddress.street.message}</span>
          )} */}
        </label>
        <br />
        <label>
          City:
          <input {...register("clientAddress.city")} />
          {errors.clientAddress && errors.clientAddress.city && (
            <span>{errors.clientAddress.city.message}</span>
          )}
        </label>
        <br />
        <label>
          Post Code:
          <input {...register("clientAddress.postCode")} />
          {errors.clientAddress && errors.clientAddress.postCode && (
            <span>{errors.clientAddress.postCode.message}</span>
          )}
        </label>
        <br />
        <label>
          Country:
          <input {...register("clientAddress.country")} />
          {errors.clientAddress && errors.clientAddress.country && (
            <span>{errors.clientAddress.country.message}</span>
          )}
        </label>
      </fieldset>
      <br />
      {fields.map((item, index) => (
        <div key={item.id}>
          <label>
            Name:
            <input {...register(`items[${index}].name`)} type="text" />
            {/* {errors.items &&
              errors.items[index] &&
              errors.items[index].name && (
                <span>{errors.items[index].name.message}</span>
              )} */}
            {/* name={`items[${index}].name`}  */}
          </label>
          <br />
          <label>
            Quantity:
            <input
              // name={`items[${index}].quantity`}
              type="number"
              {...register(`items[${index}].quantity`)}
            />
            {/* {errors.items &&
              errors.items[index] &&
              errors.items[index].quantity && (
                <span>{errors.items[index].quantity.message}</span>
              )} */}
          </label>
          <br />
          <label>
            Price:
            <input
              // name={`items[${index}].price`}
              type="number"
              {...register(`items[${index}].price`)}
            />
            {/* {errors.items &&
              errors.items[index] &&
              errors.items[index].price && (
                <span>{errors.items[index].price.message}</span>
              )} */}
          </label>
          <br />
          <label>
            Total:
            <input
              //  name={`items[${index}].total`}
              {...register(`items[${index}].total`)}
              type="number"
            />
            {/* {errors.items &&
              errors.items[index] &&
              errors.items[index].total && (
                <span>{errors.items[index].total.message}</span>
              )} */}
          </label>
          <br />
          <button type="button" onClick={() => remove(index)}>
            Remove item
          </button>
        </div>
      ))}
      <br />
      <button type="button" onClick={() => append({ id: Date.now() })}>
        Add item
      </button>
      <br />
      <label>
        Total:
        <input type="number" {...register(`total`)} />
        {errors.total && <span>{errors.total.message}</span>}
      </label>
      <br />
      <input type="submit" />
    </form>
  );
};
export default InvoiceForm;

// onClick={() => append({ id: Date.now() })}
