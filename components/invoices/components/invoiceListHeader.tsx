import { FC, useState, useEffect } from "react";
import Link from "next/link";
import Dropdown from "rc-dropdown";
import Menu, { Item as MenuItem, Divider } from "rc-menu";
import { AiFillPlusCircle } from "react-icons/ai";
import { useMediaQuery } from "react-responsive";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
const style = {
  innerContainer: `md:w-[80%] m-auto flex justify-between items-center`,
  title: `font-[700] text-[1.3rem] md:text-[2rem] capitalize leading-[.9375rem] tracking-[-.25px] mb-4`,
  subTitle: `text-[888EB0] text-[.9rem] leading-[.9375rem] tracking-[-.25px]`,
  create: `hidden  text-white bg-[#7c5dfa] rounded-full capitalize py-2 pr-5 md:flex justify-betwee items-center [&>*]:mx-2 `,
  createIcon: `text-[2rem]`,
  arrow: ` text-[20px] text-[#7c5dfa] md:flex cursor-pointer md:ml-1 md:mr-5`,
  filterTitle: `text-[.7rem] md:text-[.8rem] item-end `,
};
interface invoiceHeaderProps {
  invoiceData: any;
  filterStatus: any;
  setInvoiceDataState: any;
}
const invoiceListHeader: FC<invoiceHeaderProps> = ({
  invoiceData,
  filterStatus,
  setInvoiceDataState,
}) => {
  const [drop, setDrop] = useState(false);
 

  function onSelect({ key }: any) {
    // console.log(`${key} selected`);
    if (key === "0") {
      // filterStatus("paid");
      // setInvoiceDataState(invoiceData);
    } else if (key === "1") {
      filterStatus("paid");
    } else if (key === "2") {
      filterStatus("pending");
    } else if (key === "3") {
      filterStatus("draft");
    } else if (!key) {
      console.log(`selected`);
      setInvoiceDataState(invoiceData);
    } else {
      setInvoiceDataState(invoiceData);
    }
  }

  function onVisibleChange(visible: any) {
    // console.log(visible);
    setDrop((prevDrop) => !prevDrop);
  }

  const menu = (
    <Menu
      onSelect={onSelect}
      className="min-w-[200px] mx-auto  flex flex-col capitalize"
    >
      <MenuItem key="0" className="flex items-center w-full justify-cente ">
        <p className="mx-3 text-[1rem] mt-4">
          <input type="checkbox" /> all
        </p>
      </MenuItem>
      <MenuItem key="1" className="flex items-center w-full justify-cente ">
        <p className="mx-3 text-[1rem] mt-4">
          <input type="checkbox" /> paid
        </p>
      </MenuItem>
      {/* <Divider /> */}
      <MenuItem key="2" className="flex items-center w-full justify-cente">
        <p className="mx-3 text-[1rem] mt-4">
          {" "}
          <input type="checkbox" /> pending
        </p>
      </MenuItem>
      <MenuItem key="3" className="flex items-center w-full justify-cente">
        <p className="mx-3 text-[1rem] mt-4">
          {" "}
          <input type="checkbox" /> draft
        </p>
      </MenuItem>
    </Menu>
  );
  return (
    <div className={style.innerContainer}>
      <div>
        <h1 className={style.title}> Invoices</h1>
        <p className={style.subTitle}>
          There are {invoiceData.length} total invoices
        </p>
      </div>
      <div className="flex items-center justify-between ">
        <p className={style.filterTitle}>filter by status</p>
        <Dropdown
          trigger={["click"]}
          overlay={menu}
          animation="slide-up"
          onVisibleChange={onVisibleChange}
          // onSelect={onSelect}
        >
          {drop ? (
            <MdOutlineKeyboardArrowUp className={style.arrow} />
          ) : (
            <MdOutlineKeyboardArrowDown className={style.arrow} />
          )}
        </Dropdown>
        <Link href="/new">
          <button className={style.create}>
            <AiFillPlusCircle className={style.createIcon} /> new invoices
          </button>
        </Link>
      </div>
    </div>
  );
};

export default invoiceListHeader;
