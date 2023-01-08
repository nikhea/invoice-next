import { FC } from "react";
// import { BsDot } from "react-icons/bs";
// import Link from "next/link";
// import { MdOutlineKeyboardArrowRight } from "react-icons/md";
interface clientProps {
  invoiceSingle: any;
}

const style = {
  container: `flex  justify-between text-[#797979]`,
  name: `capitalize  text-[20px] font-[500] text-[#333b4d]`,
  email: ` text-[18px] leading-[2.325rem] tracking-[1.23px]`,
  street: `  leading-[1.125rem] tracking-[-.23px]`,
  items: `mb-20 text-[18px] capitalize [&>*]:leading-[1.7rem]`,
  itemInvoice: `mt-[95px] text-[18px] capitalize  tracking-[.75px] `,
  city: ``,
  postalCode: ``,
  country: ``,
  invoiceNumber: `text-[18px] leading-[2.325rem] tracking-[1.23px] mt-1`,
  invoiceTopic: ``,
  status: ` uppercase font-[700] text-[.95rem] leading-[.9375rem] tracking-[-.25px] h-[2.5rem] m-w-[6.5rem] rounded-[6px] flex items-center justify-center -pl-5 m-0 my-2`,
  dot: `text-[52px] -ml-5`,
  arrow: `order-last text-[20px] text-[#7c5dfa] hidden lg:flex`,
};
const clientDetails: FC<clientProps> = ({ invoiceSingle }) => {
  return (
    <div className={style.container}>
      <div>
        <h3 className="text-black text-3xl uppercase mb-3">Bill To :</h3>
        <h1 className={style.name}>{invoiceSingle.clientName}</h1>
        <p className={style.email}>{invoiceSingle.clientEmail}</p>
        <div className={style.items}>
          <p className={style.street}>{invoiceSingle.clientAddress.street}</p>
          <p className={style.city}>{invoiceSingle.clientAddress.city}</p>
          <p className={style.postalCode}>
            {invoiceSingle.clientAddress.postCode}
          </p>
          <p className={style.country}>{invoiceSingle.clientAddress.country}</p>
        </div>
      </div>
      <div className={style.itemInvoice}>
        <p className="text-[15px]">
          invoice date :{" "}
          <span className="text-[#333b4d] bloc text-[18px]">
            {invoiceSingle.createdAt}
          </span>
        </p>
        <p className="text-[15px]">
          due date :{" "}
          <span className="text-[#333b4d] bloc text-[18px]">
            {invoiceSingle.paymentDue}
          </span>
        </p>
      </div>
    </div>
  );
};

export default clientDetails;
