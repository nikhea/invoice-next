//@ts-nocheck
import { FC, useEffect, useMemo, useRef, useState } from "react";
import FormStyle from "./form.module.scss";
import { useForm, useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormPersist from "react-hook-form-persist";
import { invoiceSchema } from "../../../lib/invoiceFormSchema";
import { MdDeleteForever } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai";
import { generateRandomNumber } from "../../../lib/generateInvoiceNumber";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  invoiceFormData,
  useInvoiceState,
} from "../../../store/useInvoiceStore";
import {
  calculateTotalAmount,
  formatItemTotal,
} from "../../../lib/formateNumbers";
import { useItemsStore } from "../../../store/useItemsState";

const options = ["draft", "pending", "paid"];
const mainForm = () => {
  const { setInvoiceList } = useInvoiceState();
  const [itemState, setItemState] = useState([]);
  useEffect(() => {
    setValue("paymentTerms", 33455);
    setValue("invoiceId", generateRandomNumber());
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    getValues,
    setValue,
    control,
  } = useForm<invoiceFormData>({
    resolver: yupResolver(invoiceSchema),
  });

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
  function onItemAdd() {
    append({ id: uuidv4() });
    // const newItem = { quantity: "", price: "" };
    // setItemState([...itemState, newItem]);
  }

  function onItemDelete(index: number) {
    remove(index);
  }
  const items = watch("items") || [];

  useEffect(() => {
    // const calculateTotalAmount = () => {
    //   let total = 0;
    //   for (const item of items) {
    //     const quantity = Number(item.quantity);
    //     const price = Number(item.price);
    //     if (quantity && price) {
    //       total += quantity * price;
    //     }
    //   }
    //   return total;
    // };

    const total = calculateTotalAmount(items);
    setValue("allTotal", total);
  }, [itemState]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItemState(updatedItems);
    const price = getValues(`items[${index}].price`);
    const quantity = getValues(`items[${index}].quantity`);
    const total = formatItemTotal(price, quantity);
    if (price && quantity) {
      setValue(`items[${index}].total`, total, { shouldValidate: true });
    }
  };

  useEffect(() => {
    if (items) {
      setItemState(items);
    }
  }, [items]);

  function onSubmit(data: invoiceFormData) {
    console.log(data);
    if (data) {
      setInvoiceList(data);
      toast.success("🦄 invoice created", {
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

    setValue("items", []);
    reset();
    setValue("paymentTerms", 33455);
    setValue("invoiceId", generateRandomNumber());
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={FormStyle.formContainer}
      >
        <span>
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
              Description
              <input
                type="text"
                {...register(`items[${index}].name`)}
                defaultValue={item.name}
              />
            </label>
            <br />
            <label>
              Quantity
              <input
                type="number"
                name={`items[${index}].quantity`}
                onChange={(e) =>
                  handleItemChange(index, "quantity", e.target.value)
                }
                // {...register(`items[${index}].quantity`)}
                defaultValue={item.quantity}
              />
            </label>
            <br />
            <label>
              Price
              <input
                type="number"
                name={`items[${index}].price`}
                // {...register(`items[${index}].price`)}
                onChange={(e) =>
                  handleItemChange(index, "price", e.target.value)
                }
                defaultValue={item.price}
              />
            </label>
            <br />
            <label>
              Total
              <input
                type="number"
                {...register(`items[${index}].total`)}
                disabled
                className={FormStyle.disabled}
                defaultValue={0}
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
              {...register(`allTotal`)}
              placeholder="Total Amount"
              disabled
              // defaultValue={0}
              className={FormStyle.disabled}
            />
            {errors.allTotal && <span>{errors?.allTotal?.message}</span>}
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
// {fields.map((item, index) => (
//   <div key={item.id} className={FormStyle.addContainer}>
//     <label>
//       Name
//       <input type="text" {...register(`items[${index}].name`)} />
//     </label>
//     <br />
//     <label>
//       Quantity
//       <input type="number" {...register(`items[${index}].quantity`)} />
//     </label>
//     <br />
//     <label>
//       Price
//       <input type="number" {...register(`items[${index}].price`)} />
//     </label>
//     <br />
//     <label>
//       Total
//       { parseInt(items[${index}].quantity  * items[${index}].price)}
//       <input
//         type="number"
//         {...register(`items[${index}].total`)}
//         disabled
//         className={FormStyle.disabled}
//       />
//     </label>
//     <br />
//     <button type="button" onClick={() => onItemDelete(index)}>
//       <MdDeleteForever size={30} />
//     </button>
//   </div>
// ))}

// const { items } = watch();

// let priceInput: number, quantityInput: number;
// if (typeof items !== "undefined") {
//   for (let item of items) {
//     let { price, quantity } = item;
//     if (price !== undefined || quantity !== undefined) {
//       priceInput = parseInt(price);
//       quantityInput = parseInt(quantity);
//     }
//   }
// }
// useEffect(() => {
//   let total: number = calculateTotalAmount(items);

//   setValue("total", total);
// }, [priceInput, quantityInput]);

// const handleItemChange = (index: number) => {
//   const price = getValues(`items[${index}].price`);
//   const quantity = getValues(`items[${index}].quantity`);
//   const total = formatItemTotal(price, quantity);
//   setValue(`items[${index}].total`, total);
// };
// useEffect(() => {
//   const watchFields = () => {
//     fields.forEach((item, index) => {
//       watch(`items[${index}].quantity`, () => handleItemChange(index));
//       watch(`items[${index}].price`, () => handleItemChange(index));
//     });
//   };

//   watchFields();
// }, [fields, priceInput, quantityInput, setValue, watch]);
// useEffect(() => {
//   const calculateTotalAmount = () => {
//     let total = 0;
//     for (const item of items) {
//       const quantity = Number(item.quantity);
//       const price = Number(item.price);
//       total += quantity * price;
//     }
//     return total;
//   };

//   const total = calculateTotalAmount();
//   setValue("allTotal", total);
// }, [items.map((item) => `${item.quantity}-${item.price}`).join(",")]);
// const handleItemChange = (index: number) => {
//   const price = getValues(`items[${index}].price`);
//   const quantity = getValues(`items[${index}].quantity`);
//   const total = formatItemTotal(price, quantity);
//   setValue(`items[${index}].total`, total, { shouldValidate: true });
// };
// useEffect(() => {
//   const watchFields = () => {
//     fields.forEach((item, index) => {
//       watch(`items[${index}].quantity`, () => handleItemChange(index));
//       watch(`items[${index}].price`, () => handleItemChange(index));
//     });
//   };
//   watchFields();
// }, [setValue, watch, ]);
