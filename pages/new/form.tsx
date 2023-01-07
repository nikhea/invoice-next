import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "react-datepicker/dist/react-datepicker.css";
import FormStyle from "./form.module.scss";
import { FC } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormPersist from "react-hook-form-persist";
import DatePicker from "react-datepicker";
import { FormData } from "./FormData";
import { invoiceSchema } from "./invoiceFormSchema";
import {MdDeleteForever} from "react-icons/md"
import { AiFillPlusCircle } from "react-icons/ai";
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
  console.log(watch());

  if (typeof window !== "undefined") {
    useFormPersist("storageInvoice", {
      watch,
      setValue,
      storage: window.localStorage,
    });
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={FormStyle.formContainer}>
      {/* <label>
        <h1>ID</h1>
        
        <input {...register("id")} />
        {errors.id && <span>{errors.id.message}</span>}
      </label> */}
      <br />
      <span>
        <label>
          <h1> Created At</h1>
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
        <label>
          <h1>Payment Due</h1>
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
        </label>
      </span>
      <br />
      <label>
        <h1>Description</h1>

        {/* <input {...register("description")} /> */}
        <textarea {...register("description")}/>
        {errors.description && <span>{errors.description.message}</span>}
      </label>
      <br />
      {/* <label>
        <h1>Payment Terms</h1>
        <input type="number" {...register("paymentTerms")} />
        {errors.paymentTerms && <span>{errors.paymentTerms.message}</span>}
      </label>
      <br /> */}
      <fieldset>
        <legend>Sender Address</legend>
        <span>      <label>
          <h1> Street</h1>
          <input {...register("senderAddress.street")} />
          {errors.senderAddress && errors.senderAddress.street && (
            <span>{errors.senderAddress.street.message}</span>
          )}
        </label>
        <br />
        <label>
          <h1> City</h1>
          <input {...register("senderAddress.city")} />
          {errors.senderAddress && errors.senderAddress.city && (
            <span>{errors.senderAddress.city.message}</span>
          )}
        </label></span>
  
        <br />
        <span>   <label>
          <h1>Post Code</h1>
          <input {...register("senderAddress.postCode")} />
          {errors.senderAddress && errors.senderAddress.postCode && (
            <span>{errors.senderAddress.postCode.message}</span>
          )}
        </label>
        <br />
        <label>
          <h1>Country</h1>
          <input {...register("senderAddress.country")} />
          {errors.senderAddress && errors.senderAddress.country && (
            <span>{errors.senderAddress.country.message}</span>
          )}
        </label></span>
     
      </fieldset>
      <span>     <label>
        <h1> Client Name</h1>
        <input {...register("clientName")} />
        {errors.clientName && <span>{errors.clientName.message}</span>}
      </label>
      <br />
      <label>
        <h1>Client Email </h1>
        <input type="email" {...register("clientEmail")} />
        {errors.clientEmail && <span>{errors.clientEmail.message}</span>}
      </label></span>
 
      <br />
      {/* <label>
        <h1> Status </h1>
        <input {...register("status")} />
        {errors.status && <span>{errors.status.message}</span>}
      </label>
      <br /> */}

      <br />
      <fieldset>
        <legend>Client Address</legend>
        <span>     <label>
          <h1> Street</h1>
          <input {...register("clientAddress.street")} />
          {/* {errors.clientAddress && erroexport default InvoiceFormrs.clientAddress.street && (
            <span>{errors.clientAddress.street.message}</span>
          )} */}
        </label>
        <br />
        <label>
          <h1> City</h1>
          <input {...register("clientAddress.city")} />
          {errors.clientAddress && errors.clientAddress.city && (
            <span>{errors.clientAddress.city.message}</span>
          )}
        </label></span>
   
        <br />
        <span>   <label>
          <h1>Post Code</h1>
          <input {...register("clientAddress.postCode")} />
          {errors.clientAddress && errors.clientAddress.postCode && (
            <span>{errors.clientAddress.postCode.message}</span>
          )}
        </label>
        <br />
        <label>
          <h1>Country</h1>
          <input {...register("clientAddress.country")} />
          {errors.clientAddress && errors.clientAddress.country && (
            <span>{errors.clientAddress.country.message}</span>
          )}
        </label></span>
     
      </fieldset>
      <br />
      {fields.map((item, index) => (
        <div key={item.id}  className={FormStyle.addContainer}>
          <label>
            Name
            {/* @ts-ignore */}
            <input type="text" {...register(`items[${index}].name`)} />
            {/* {errors.items &&
              errors.items[index] &&
              errors.items[index].name && (
                <span>{errors.items[index].name.message}</span>
              )} */}
            {/* name={`items[${index}].name`}  */}
          </label>
          <br />
          <label>
            Quantity
            {/* @ts-ignore */}
            <input type="number" {...register(`items[${index}].quantity`)} />
            {/* @ts-ignore */}
            {errors.items &&
              errors.items[index] &&
              errors.items[index].quantity && (
                <span>{errors.items[index].quantity.message}</span>
              )}
          </label>
          <br />
          <label>
            Price
            {/* @ts-ignore */}
            <input type="number" {...register(`items[${index}].price`)} />
            {/* @ts-ignore */}
            {errors.items &&
              errors.items[index] &&
              errors.items[index].price && (
                <span>{errors.items[index].price.message}</span>
              )}
          </label>
          <br />
          <label>
            Total
            {/* @ts-ignore */}
            <input type="number" {...register(`items[${index}].total`)} />
            {/* @ts-ignore */}
            {errors.items &&
              errors.items[index] &&
              errors.items[index].total && (
                <span>{errors.items[index].total.message}</span>
              )}
          </label>
          <br />
          <button type="button" onClick={() => remove(index)}>
           <MdDeleteForever  size={30} />
          </button>
        </div>
      ))}
      <br />
      {/* @ts-ignore */}
      <button className={FormStyle.createIcon}  type="button" onClick={() => append({ id: uuidv4() })}>
      <AiFillPlusCircle   size={20} style={{marginRight: '12px'}} />    <span>Add an item</span>
      </button>
      <br />
      <label>
        <h1>total</h1>
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
