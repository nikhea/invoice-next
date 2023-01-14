import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
const initialState = {
  invoices: [],
};

export const typesAction = {
  DELETE_INVOICE: "deleteInvoices",
};
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function deleteInvoices(id: any) {
    dispatch({
      type: typesAction.DELETE_INVOICE,
      payload: id,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        invoiceData: state.invoices,
        deleteInvoices,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
