import Link from "next/link";
import React from "react";
const style = {
  bgContainer: `text-[12px] md:text-[1rem]  overflow-hidden  uppercase fixed top-0 left-0 right-0 z-[999999999999] text-white bg-[#2B2B2B] `,
  container: `w-[80%] m-auto  flex items-center justify-between py-5 gap-10`,
  link: `mx-1 md:mx-3 `,
};
const NavBar = () => {
  return (
    <header>
      <nav className={style.bgContainer}>
        <span className={style.container}>
          <span>
            <Link href="/" className={style.link}>
              Home
            </Link>
            <Link href="/invoice" className={style.link}>
              invoice
            </Link>
          </span>
          {/* <span className="hidden md:block">
            <Link href="/" className={style.link}>
              sign up
            </Link>
            <Link href="/invoice" className={style.link}>
              log in
            </Link>
          </span> */}
          <span className=" md:hidden">
            <Link href="/new" className={style.link}>
              create invoice
            </Link>
          </span>
        </span>
      </nav>
    </header>
  );
};

export default NavBar;
