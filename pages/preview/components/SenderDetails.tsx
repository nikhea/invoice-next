import { FC } from "react";
import { InvoiceProps } from "../../../../types";
import { BsDot } from "react-icons/bs";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
interface senderProps {
  invoiceSingle: any;
}

const style = {
  container: `flex  justify-between text-[#797979]`,
  name: `capitalize  text-[25px] font-[500] text-[#333b4d]`,
  email: ` text-[18px] leading-[2.325rem] tracking-[1.23px]`,
  street: `  leading-[1.125rem] tracking-[-.23px]`,
  items: `mb-20 text-[18px] capitalize  [&>*]:leading-[1.7rem]`,
  city: ``,
  postalCode: ``,
  country: ``,
  invoiceNumber: `text-[18px] leading-[2.325rem] tracking-[1.23px] mt-1`,
  invoiceTopic: ``,
  status: ` uppercase font-[700] text-[.95rem] leading-[.9375rem] tracking-[-.25px] h-[2.5rem] m-w-[6.5rem] rounded-[6px] flex items-center justify-center -pl-5 m-0 my-2`,
  dot: `text-[52px] -ml-5`,
  arrow: `order-last text-[20px] text-[#7c5dfa] hidden lg:flex`,
};
const SenderDetails: FC<senderProps> = ({ invoiceSingle }) => {
  let status = invoiceSingle.status;
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
    <div className={style.container}>
      <div>
        <h1 className={style.name}>{invoiceSingle.senderName}</h1>
        <p className={style.email}>{invoiceSingle.senderEmail}</p>
        <div className={style.items}>
          <p className={style.street}>{invoiceSingle.senderAddress.street}</p>
          <p className={style.city}>{invoiceSingle.senderAddress.city}</p>
          <p className={style.postalCode}>
            {invoiceSingle.senderAddress.postCode}
          </p>
          <p className={style.country}>{invoiceSingle.senderAddress.country}</p>
        </div>
      </div>
      <div className={style.items}>
        <h1 className="text-[22px] capitalize font-[500]  text-[#333b4d]">
          invoice #
        </h1>
        <p className={style.invoiceNumber}>{invoiceSingle.invoiceNumber}</p>
        <p>{invoiceSingle.invoiceTopic}</p>
        {/* @ts-ignore */}
        <p className={style.status} style={statusStyle}>
          {/* @ts-ignore */}
          <BsDot className={style.dot} style={iconStyle} />
          {status}
        </p>
      </div>
    </div>
  );
};

export default SenderDetails;
