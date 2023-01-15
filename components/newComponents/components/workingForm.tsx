//@ts-nocheck
import { FC, useEffect } from "react";
import FormStyle from "./form.module.scss";
import { useForm, useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormPersist from "react-hook-form-persist";
import { FormData } from "../../../lib/FormData";
import { invoiceSchema } from "../../../lib/invoiceFormSchema";
import { MdDeleteForever } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai";
import {
  formatItemTotal,
  calculateTotalAmount,
} from "../../../lib/formateNumbers";
import { generateRandomNumber } from "../../../lib/generateInvoiceNumber";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const options = ["draft", "pending", "paid"];
const mainForm = () => {
  const [invoiceList, setInvoiceList] = useLocalStorage();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    getValues,
    setValue,
    control,
  } = useForm<FormData>({
    resolver: yupResolver(invoiceSchema),
  });
  useEffect(() => {
    let generateInvoiceNumber = generateRandomNumber();
    setValue("paymentTerms", 33455);
    setValue("invoiceId", generateInvoiceNumber);
  }, []);
  const { items } = watch();

  let priceInput: number | string | any, quantityInput: number | string | any;
  if (typeof items !== "undefined") {
    for (let item of items) {
      let { price, quantity } = item;
      if (price !== undefined || quantity !== undefined) {
        priceInput = parseInt(price);
        quantityInput = parseInt(quantity);
      }
    }
  }
  useEffect(() => {
    let p: number | string | any = calculateTotalAmount(items);

    setValue("total", parseInt(p as any));
  }, [priceInput, quantityInput]);

  if (typeof window !== "undefined") {
    useFormPersist("storageInvoiceData", {
      watch,
      setValue,
      storage: window.localStorage,
    });
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const handleItemChange = (index: number) => {
    // Get the price and quantity values

    const price = getValues(`items[${index}].price`);

    const quantity = getValues(`items[${index}].quantity`);

    // Calculate the total
    const total = formatItemTotal(price, quantity);

    // Set the total value
    setValue(`items[${index}].total`, total);
  };
  // Watch the quantity and price fields
  useEffect(() => {
    const watchFields = () => {
      fields.forEach((item, index) => {
        watch(`items[${index}].quantity`, () => handleItemChange(index));
        watch(`items[${index}].price`, () => handleItemChange(index));
      });
    };

    watchFields();
  }, [fields, priceInput, quantityInput]); // Only re-run the effect if the fields array changes
  function onSubmit(data: FormData) {
    if (data) {
      setInvoiceList([...invoiceList, data]);
      toast.success("🦄 invoice created", {
        marginTop: 6000,
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    reset();
    let generateInvoiceNumber = generateRandomNumber();
    setValue("paymentTerms", 33455);
    setValue("invoiceId", generateInvoiceNumber);
  }
  function onItemAdd() {
    append({ id: uuidv4() });
  }

  function onItemDelete(index: number) {
    remove(index);
    let p: number | string | any = calculateTotalAmount(items);
    setValue("total", parseInt(p as any));
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={FormStyle.formContainer}
      >
        <span>
          {" "}
          <label>
            <h1>Invoice Number</h1>

            <input {...register("invoiceId")} disabled />
            {errors.invoiceId && <span>{errors.invoiceId.message}</span>}
          </label>
          <br />
          <label>
            <h1> Status </h1>
            <select className={FormStyle.select} {...register("status")}>
              {options.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>

            {errors.status && <span>{errors.status.message}</span>}
          </label>
          <br />
        </span>

        <br />
        <span>
          <label>
            <h1> Created At</h1>
            <input type="date" {...register("createdAt")} />
            {/* <Controller
              control={control}
              name="createdAt"
              render={({ field }) => (
                <DatePicker
                  minDate={new Date()}
                  placeholderText="MM/DD/YYYY"
                  dateFormat="MM/dd/yyyy"
                  selected={new Date(field.value)}
                  onChange={(date) => setValue("createdAt", date)}
            
                /> */}
            {/* )} */}
            {/* /> */}
            {errors.createdAt && <span>{errors.createdAt.message}</span>}
          </label>
          <br />
          <label>
            <h1>Payment Due</h1>
            <input
              type="date"
              {...register("paymentDue")}
              placeholder="DD/MM/YYYY"
            />
            {/* <Controller
              control={control}
              name="paymentDue"
              render={({ field }) => (
                <DatePicker
                  locale="es"
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select date"
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                />
              )}
            /> */}
          </label>
        </span>
        <br />
        <fieldset>
          <legend>Sender Details</legend>
          <span>
            <label>
              <h1 className={FormStyle.clientDetails}> sender Name</h1>
              <input {...register("senderName")} />
              {errors.senderName && <span>{errors.senderName.message}</span>}
            </label>
            <br />
            <label>
              <h1 className={FormStyle.clientDetails}>sender Email </h1>
              <input type="email" {...register("senderEmail")} />
              {errors.senderEmail && <span>{errors.senderEmail.message}</span>}
            </label>
          </span>
          <span>
            {" "}
            <label>
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
            </label>
          </span>

          <br />
          <span>
            {" "}
            <label>
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
            </label>
          </span>
        </fieldset>

        <br />

        <br />
        <fieldset>
          <legend>Client Details</legend>
          <span>
            <label>
              <h1 className={FormStyle.clientDetails}> Client Name</h1>
              <input {...register("clientName")} />
              {errors.clientName && <span>{errors.clientName.message}</span>}
            </label>
            <br />
            <label>
              <h1 className={FormStyle.clientDetails}>Client Email </h1>
              <input type="email" {...register("clientEmail")} />
              {errors.clientEmail && <span>{errors.clientEmail.message}</span>}
            </label>
          </span>
          <span>
            <label>
              <h1> Street</h1>
              <input {...register("clientAddress.street")} />
              {errors.clientAddress && errors.clientAddress.street && (
                <span>{errors.clientAddress.street.message}</span>
              )}
            </label>
            <br />
            <label>
              <h1> City</h1>
              <input {...register("clientAddress.city")} />
              {errors.clientAddress && errors.clientAddress.city && (
                <span>{errors.clientAddress.city.message}</span>
              )}
            </label>
          </span>
          <br />
          <span>
            {" "}
            <label>
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
            </label>
          </span>
          <label>
            <h1 className="mt-5 mb-2">Description</h1>

            <textarea {...register("description")} />
            {errors.description && <span>{errors.description.message}</span>}
          </label>
        </fieldset>
        <br />
        {fields.map((item, index) => (
          <div key={item.id} className={FormStyle.addContainer}>
            <label>
              Name
              {/* @ts-ignore */}
              <input type="text" {...register(`items[${index}].name`)} />
            </label>
            <br />
            <label>
              Quantity
              <input type="number" {...register(`items[${index}].quantity`)} />
            </label>
            <br />
            <label>
              Price
              <input type="number" {...register(`items[${index}].price`)} />
            </label>
            <br />
            <label>
              Total
              {/* { parseInt(items[${index}].quantity  * items[${index}].price)} */}
              <input
                type="number"
                {...register(`items[${index}].total`)}
                disabled
                className={FormStyle.disabled}
              />
            </label>
            <br />
            <button type="button" onClick={() => onItemDelete(index)}>
              <MdDeleteForever size={30} />
            </button>
          </div>
        ))}
        <br />
        <span>
          <button
            className={FormStyle.createIcon}
            type="button"
            onClick={onItemAdd}
          >
            <AiFillPlusCircle size={20} style={{ marginRight: "12px" }} />{" "}
            <span>Add an item</span>
          </button>
          <br />
          <label>
            <h1>total</h1>
            <input
              type="number"
              {...register(`total`)}
              placeholder="Total Amount"
              disabled
              defaultValue={0}
              className={FormStyle.disabled}
            />
            {errors.total && <span>{errors.total.message}</span>}
          </label>
          <br />
        </span>

        <input className="cursor-pointer" type="submit" />
      </form>
      <ToastContainer />
    </div>
  );
};

export default mainForm;
