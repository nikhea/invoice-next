import { FC } from "react";
import { InvoiceProps } from "../../../types";
import { BsDot } from "react-icons/bs";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
const style = {
  Bgcontainer: `shadow-md bg-white bg-white w-[80%] m-auto rounded my-10 `,
  invoiceContainer: `grid grid-cols-7 justify-between lg:flex justify-between flex-col md:flex-row items-center [&>*]:py-3  md:py-8 px-5 capitalize text-[1rem] font-light`,
  id: `col-span-2 order-1 text-[#888eb0] flex items-center  text-[.75rem] leading-[.9375rem] tracking-[-.25px]`,
  idNumber: `text-black uppercase font-[700]`,
  date: `order-3 md:order-2 col-start-1 col-end-8 text-[#7e88c3] text-[.7875rem] leading-[1.125rem] tracking-[-.23px]`,
  name: `order-2 md:order-3 col-start-6 col-end-8 text-end text-[#7e88c3] text-[.7875rem] leading-[.9375rem] tracking-[-.25px]`,
  price: `order-4 col-start-1 col-end-4 text-black uppercase font-[500] text-[1rem] leading-[2rem] tracking-[-.8px]`,
  status: `order-5 col-start-6 col-end-8 font-[700] text-[.95rem] leading-[.9375rem] tracking-[-.25px] h-[2.5rem] min-w-[6.5rem] rounded-[6px] flex items-center justify-center p-0 m-0 `,
  dot: `text-[52px] -ml-5`,
  arrow: `order-last text-[20px] text-[#7c5dfa] hidden md:flex`,
};
// invoiceContainer: `flex justify-between flex-col md:flex-row md:items-center py-8 px-5 capitalize text-[1rem] font-light`,
const InvoiceListItem: FC<InvoiceProps> = ({ id, status, clientName }) => {
  console.log(id);
  const statusStyle = {
    backgroundColor:
      status === "paid"
        ? "#33d69f2f"
        : status === "pending"
        ? "#ff9f"
        : status === "draft"
        ? "#373b532f"
        : null,
  };
  const iconStyle = {
    color:
      status === "paid"
        ? "#33d69f"
        : status === "pending"
        ? "#ff8f00"
        : status === "draft"
        ? "#373b53"
        : null,
  };
  return (
    <Link href={`invoice/${id}`}  >
    <div className={style.Bgcontainer}>
      <div className={style.invoiceContainer}>
        <p className={style.id}>
          # <span className={style.idNumber}>rt3038</span>
        </p>
        <p className={style.date}>due 19 aug 2021</p>
        <h3 className={style.name}>{clientName}</h3>
        {/* <div className="flex justify-between items-center"> */}
        <p className={style.price}> $1,800.90</p>
        {/* @ts-ignore */}
        <p className={style.status} style={statusStyle}>
          {/* @ts-ignore */}
          <BsDot className={style.dot} style={iconStyle} />
          paid
        </p>
        {/* </div> */}
        <p className="order-last">
          <MdOutlineKeyboardArrowRight className={style.arrow} />
        </p>
      </div>
    </div>
    </Link>
  );
};

export default InvoiceListItem;
