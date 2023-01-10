import React from "react";
import FormInputs from "./components/workingForm";
import Header from "./components/Header";
const CreateInvoice = () => {
  const style = {
    container: `w-[90%] md:w-[80%]  m-auto bg-white shadow-sm p-10 flex flex-col rounded-[20px] my-16`,
    spacingTop: `mt-32`,
  };

  return (
    <div className={style.spacingTop}>
      <Header />
      <FormInputs />
    </div>
  );
};

export default CreateInvoice;
